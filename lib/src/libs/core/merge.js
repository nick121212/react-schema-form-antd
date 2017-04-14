"use strict";
const jpp = require("json-pointer");
const schema_1 = require("./schema");
const index_1 = require("./default.type/index");
const defaults = index_1.createDefaults();
exports.mergeSchema = (schema, uiSchema, options, parentKey = []) => {
    options = options || {
        ignore: {},
        lookup: {},
        global: {
            schemas: {},
            combines: {}
        }
    };
    uiSchema = uiSchema || ['*'];
    let { form, defineForm } = schema_1.compileSchema(schema, defaults, options, parentKey);
    let idx = uiSchema.indexOf('*');
    if (idx !== -1) {
        uiSchema = uiSchema.slice(0, idx)
            .concat(form)
            .concat(uiSchema.slice(idx + 1));
    }
    console.log(options.lookup);
    let uiSchemaCombine = uiSchema.map((obj) => {
        let ownKey = [];
        if (typeof obj === 'string') {
            obj = { key: obj };
        }
        if (obj.key) {
            if (typeof obj.key === 'string') {
                obj.key = jpp.parse("/" + obj.key);
            }
        }
        if (obj.key) {
            ownKey = [].concat(obj.key);
            ownKey.pop();
            if (ownKey.join() !== parentKey.join()) {
                obj.key = parentKey.concat(obj.key);
            }
        }
        if (obj.items && obj.items.length) {
            obj.uiSchema = obj.items.concat([]);
        }
        else {
            obj.uiSchema = ["*"];
        }
        if (obj.key) {
            let strid = jpp.compile(obj.key);
            let lookup = Object.assign({}, options.lookup[strid]);
            if (lookup) {
                for (let key in lookup) {
                    if (lookup.hasOwnProperty(key)) {
                        if (obj[key] === undefined) {
                            obj[key] = lookup[key];
                            delete lookup[key];
                        }
                    }
                }
            }
        }
        if (obj.items && obj.items.length) {
            if (!obj.schema || (obj.schema.type !== "object")) {
                obj.items = exports.mergeSchema(schema, obj.items, options).form;
            }
        }
        return obj;
    });
    return { form: uiSchemaCombine, options };
};
//# sourceMappingURL=merge.js.map