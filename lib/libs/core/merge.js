"use strict";
const jpp = require("json-pointer");
const default_1 = require("./default");
const defaults = default_1.createDefaults();
exports.merge = (schema, uiSchema, ignore, options) => {
    uiSchema = uiSchema || ['*'];
    options = options || {};
    let stdForm = default_1.defaultForm(schema, defaults, options);
    let { lookup } = stdForm;
    let idx = uiSchema.indexOf('*');
    if (idx !== -1) {
        uiSchema = uiSchema.slice(0, idx)
            .concat(stdForm.form)
            .concat(uiSchema.slice(idx + 1));
    }
    return uiSchema.map((obj) => {
        if (typeof obj === 'string') {
            obj = { key: obj };
        }
        if (obj.key) {
            if (typeof obj.key === 'string') {
                obj.key = jpp.parse("/" + obj.key);
            }
        }
        if (obj.key) {
            var strid = jpp.compile(obj.key);
            if (lookup[strid]) {
                var schemaDefaults = lookup[strid];
                for (let key in schemaDefaults) {
                    if (schemaDefaults.hasOwnProperty(key)) {
                        if (obj[key] === undefined) {
                            obj[key] = schemaDefaults[key];
                        }
                    }
                }
            }
        }
        if (obj.items) {
            obj.items = exports.merge(schema, obj.items, ignore, options);
        }
        return obj;
    });
};
//# sourceMappingURL=merge.js.map