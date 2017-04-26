import * as jpp from 'json-pointer';

import { IUiSchema } from '../props/uischema';
import { defaultFormDefinition, compileSchema } from './schema';
import { createDefaults } from './default.type/index';
import { IOptions, MyJsonSchema } from './default.type/utils';

const defaults = createDefaults();

export const mergeSchema = (schema: MyJsonSchema, uiSchema: Array<IUiSchema | string>, options: IOptions, parentKey: Array<string> = []) => {
    options = options || {
        ignore: {},
        lookup: {},
        global: {
            schemas: {},
            combines: {}
        }
    };
    uiSchema = uiSchema || ['*'];
    let { form, defineForm } = compileSchema(schema, defaults, options, parentKey);

    let idx = uiSchema.indexOf('*');

    if (idx !== -1) {
        uiSchema = uiSchema.slice(0, idx)
            .concat(form)
            .concat(uiSchema.slice(idx + 1));
    }

    console.log(options.lookup);

    let uiSchemaCombine = uiSchema.map((obj: IUiSchema & tv4.JsonSchema) => {
        let ownKey = [];

        // 如果obj是字符，则key就是obj本身
        if (typeof obj === 'string') {
            obj = { key: obj };
        }

        // 如果存在key，则判断key是不是字符，转换字符成数组
        if (obj.key) {
            if (typeof obj.key === 'string') {
                obj.key = jpp.parse("/" + obj.key);
            }
        }

        // 把key加上parentkey
        if (obj.key) {
            ownKey = [].concat(obj.key as string[]);
            ownKey.pop();
            if (ownKey.join() !== parentKey.join()) {
                obj.key = parentKey.concat(obj.key);
            }
        }

        if (obj.items && obj.items.length) {
            obj.uiSchema = obj.items.concat([]);
        } else {
            obj.uiSchema = ["*"];
        }

        if (obj.key) {
            let strid: string = jpp.compile(obj.key as string[]);
            let lookup = Object.assign({}, options.lookup[strid]);

            if (lookup) {
                // Object.assign(obj, lookup);
                for (let key in lookup) {
                    if (lookup.hasOwnProperty(key)) {
                        if (obj[key] === undefined) {
                            obj[key] = lookup[key];
                            delete lookup[key];
                        }
                    }
                }

                // if (lookup.items && lookup.items.length) {
                //     mergeSchema(schema, lookup.items, options);
                // }

            }
        }

        // 合并子项目
        if (obj.items && obj.items.length) {
            if (!obj.schema || (obj.schema.type !== "object")) {
                obj.items = mergeSchema(schema, obj.items, options).form;
            }
        }

        return obj;
    });

    return { form: uiSchemaCombine, options };
}