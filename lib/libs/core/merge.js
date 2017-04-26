"use strict";
var jpp = require("json-pointer");
var schema_1 = require("./schema");
var index_1 = require("./default.type/index");
var defaults = index_1.createDefaults();
exports.mergeSchema = function (schema, uiSchema, options, parentKey) {
    if (parentKey === void 0) { parentKey = []; }
    options = options || {
        ignore: {},
        lookup: {},
        global: {
            schemas: {},
            combines: {}
        }
    };
    uiSchema = uiSchema || ['*'];
    var _a = schema_1.compileSchema(schema, defaults, options, parentKey), form = _a.form, defineForm = _a.defineForm;
    var idx = uiSchema.indexOf('*');
    if (idx !== -1) {
        uiSchema = uiSchema.slice(0, idx)
            .concat(form)
            .concat(uiSchema.slice(idx + 1));
    }
    console.log(options.lookup);
    var uiSchemaCombine = uiSchema.map(function (obj) {
        var ownKey = [];
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
            var strid = jpp.compile(obj.key);
            var lookup = Object.assign({}, options.lookup[strid]);
            if (lookup) {
                for (var key in lookup) {
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
    return { form: uiSchemaCombine, options: options };
};
//# sourceMappingURL=merge.js.map