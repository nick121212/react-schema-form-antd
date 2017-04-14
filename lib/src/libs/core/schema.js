"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const jpp = require("json-pointer");
const deepCopy = (obj, obj1) => {
    let schema = {};
    let { properties = {}, required = [] } = obj, extra = __rest(obj, ["properties", "required"]);
    let { properties: properties1 = {}, required: required1 = [] } = obj1, extra1 = __rest(obj1, ["properties", "required"]);
    schema.properties = Object.assign({}, properties, properties1);
    schema.required = required.concat(required1);
    schema = Object.assign({}, schema, extra, extra1);
    return schema;
};
exports.mergeRef = (schema, options) => {
    if (schema.$ref) {
        if (jpp(options).has(schema.$ref.replace(/^#/i, ""))) {
            schema = Object.assign({}, schema, jpp(options).get(schema.$ref.replace(/^#/i, "")));
        }
        else {
            throw new Error(`${schema.$ref}不存在！`);
        }
    }
    return exports.mergeAllOf(schema, options);
};
exports.mergeAllOf = (schema, options) => {
    if (schema["allOf"]) {
        schema["allOf"].forEach(element => {
            schema = deepCopy(schema, exports.mergeRef(element, options));
        });
    }
    if (schema.$ref) {
        options.global.schemas[schema.$ref] = schema;
    }
    delete schema.$ref;
    return schema;
};
exports.defaultFormDefinition = (schemaTypes, name, schema, options, combine = true) => {
    let currentSchema = exports.mergeRef(schema, options);
    let rules = schemaTypes[(currentSchema.type)];
    if (rules) {
        let def;
        const innerDefaultFormDefinition = (childName, childSchema, childOptions) => {
            return exports.defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
        };
        for (let i = 0; i < rules.length; i++) {
            def = rules[i](name, currentSchema, options, innerDefaultFormDefinition);
            if (def) {
                if (def.schema["x-schema-form"]) {
                    Object.assign(def, def.schema["x-schema-form"]);
                }
                return def;
            }
        }
    }
};
exports.compileSchema = (schema, defaultSchemaTypes, options, parentKey = []) => {
    const defineForm = {}, form = [];
    if (schema.definitions) {
        options.definitions = Object.assign({}, options.definitions, schema.definitions);
    }
    if (schema.definitions) {
        Object.keys(schema.definitions).forEach((key) => {
            const required = schema.required && schema.required.indexOf(key) !== -1;
            const keys = jpp.parse("/#/definitions").concat(key);
            const def = exports.defaultFormDefinition(defaultSchemaTypes, key, schema.definitions[key], Object.assign({}, options, {
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
        Object.keys(schema.properties).forEach((key) => {
            const currentSchema = Object.assign(schema.properties[key], { $ref: schema.$ref || "" });
            const required = schema.required && schema.required.indexOf(key) !== -1;
            const def = exports.defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], Object.assign({}, options, {
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
};
//# sourceMappingURL=schema.js.map