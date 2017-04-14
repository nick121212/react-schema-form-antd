import * as jpp from 'json-pointer';

import { createDefaults } from './default.type/index';
import { IOptions, stdFormObj, MyJsonSchema } from './default.type/utils';

const deepCopy = (obj, obj1) => {
    let schema: any = {};
    let { properties = {}, required = [], ...extra } = obj;
    let { properties: properties1 = {}, required: required1 = [], ...extra1 } = obj1;

    schema.properties = Object.assign({}, properties, properties1);
    schema.required = required.concat(required1);

    schema = Object.assign({}, schema, extra, extra1);

    return schema;
}

export const mergeRef = (schema: MyJsonSchema, options: IOptions) => {
    if (schema.$ref) {

        // if (options.global.schemas[schema.$ref]) {
        //     return options.global.schemas[schema.$ref];
        // }

        if (jpp(options).has(schema.$ref.replace(/^#/i, ""))) {
            schema = Object.assign({}, schema, jpp(options).get(schema.$ref.replace(/^#/i, "")));
        } else {
            throw new Error(`${schema.$ref}不存在！`);
        }
    }

    return mergeAllOf(schema, options);
}

export const mergeAllOf = (schema: MyJsonSchema, options: IOptions) => {
    if (schema["allOf"]) {
        schema["allOf"].forEach(element => {
            schema = deepCopy(schema, mergeRef(element, options));
        });
    }

    if (schema.$ref) {
        options.global.schemas[schema.$ref] = schema;
    }
    delete schema.$ref;

    return schema;
}

/**
 * Creates a default form definition from a schema.
 * @param schemaTypes 
 * @param name 
 * @param schema 
 * @param options 
 */
export const defaultFormDefinition = (schemaTypes: any, name: string, schema: MyJsonSchema, options: IOptions, combine: boolean = true) => {
    let currentSchema = mergeRef(schema, options);
    let rules = schemaTypes[(currentSchema.type)];

    if (rules) {
        let def;
        // We give each rule a possibility to recurse it's children.
        const innerDefaultFormDefinition = (childName, childSchema, childOptions) => {
            return defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
        }

        for (let i = 0; i < rules.length; i++) {
            def = rules[i](name, currentSchema, options, innerDefaultFormDefinition);

            // first handler in list that actually returns something is our handler!
            if (def) {
                // Do we have form defaults in the schema under the x-schema-form-attribute?
                if (def.schema["x-schema-form"]) {
                    Object.assign(def, def.schema["x-schema-form"]);
                }

                return def;
            }
        }
    }
}

export const compileSchema = (schema: MyJsonSchema, defaultSchemaTypes: any, options: IOptions, parentKey: Array<string> = []) => {
    const defineForm = {}, form = [];

    if (schema.definitions) {
        options.definitions = Object.assign({}, options.definitions, schema.definitions);
    }

    if (schema.definitions) {
        // 遍历预定义的字段
        Object.keys(schema.definitions).forEach((key) => {
            const required = schema.required && schema.required.indexOf(key) !== -1;
            const keys = jpp.parse("/#/definitions").concat(key);
            const def = defaultFormDefinition(defaultSchemaTypes, key, schema.definitions[key], Object.assign({}, options, {
                path: parentKey.concat(keys),
                required: required
            }));

            if (def) {
                defineForm[jpp.compile(keys)] = def;
                options.global.combines[jpp.compile(keys)] = def;
            }
        });
    }

    if (schema.properties) {
        // 遍历预定义的字段
        Object.keys(schema.properties).forEach((key) => {
            const currentSchema = Object.assign(schema.properties[key], { $ref: schema.$ref || "" });
            const required = schema.required && schema.required.indexOf(key) !== -1;
            const def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], Object.assign({}, options, {
                path: parentKey.concat([key]),
                required: required
            }));

            if (def) {
                defineForm[jpp.compile([key])] = def;
                form.push(def);
            }
        });
    }

    return { defineForm, form };
}