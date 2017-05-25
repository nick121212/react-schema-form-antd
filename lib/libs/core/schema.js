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
Object.defineProperty(exports, "__esModule", { value: true });
var jpp = require("json-pointer");
var deepCopy = function (obj, obj1) {
    var schema = {};
    var _a = obj.properties, properties = _a === void 0 ? {} : _a, _b = obj.required, required = _b === void 0 ? [] : _b, extra = __rest(obj, ["properties", "required"]);
    var _c = obj1.properties, properties1 = _c === void 0 ? {} : _c, _d = obj1.required, required1 = _d === void 0 ? [] : _d, extra1 = __rest(obj1, ["properties", "required"]);
    schema.properties = Object.assign({}, properties, properties1);
    schema.required = required.concat(required1);
    schema = Object.assign({}, schema, extra, extra1);
    return schema;
};
exports.mergeRef = function (schema, options) {
    if (schema.$ref) {
        if (jpp(options).has(schema.$ref.replace(/^#/i, ""))) {
            schema = Object.assign({}, schema, jpp(options).get(schema.$ref.replace(/^#/i, "")));
        }
        else {
            throw new Error(schema.$ref + "\u4E0D\u5B58\u5728\uFF01");
        }
    }
    return exports.mergeAllOf(schema, options);
};
exports.mergeAllOf = function (schema, options) {
    if (schema["allOf"]) {
        schema["allOf"].forEach(function (element) {
            schema = deepCopy(schema, exports.mergeRef(element, options));
        });
    }
    if (schema.$ref) {
        options.global.schemas[schema.$ref] = schema;
    }
    delete schema.$ref;
    return schema;
};
exports.defaultFormDefinition = function (schemaTypes, name, schema, options, combine) {
    if (combine === void 0) { combine = true; }
    var currentSchema = exports.mergeRef(schema, options);
    var rules = schemaTypes[(currentSchema.type)];
    if (rules) {
        var def = void 0;
        var innerDefaultFormDefinition = function (childName, childSchema, childOptions) {
            return exports.defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
        };
        for (var i = 0; i < rules.length; i++) {
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
exports.compileSchema = function (schema, defaultSchemaTypes, options, parentKey) {
    if (parentKey === void 0) { parentKey = []; }
    var defineForm = {}, form = [];
    if (schema.definitions) {
        options.definitions = Object.assign({}, options.definitions, schema.definitions);
    }
    if (schema.definitions) {
        Object.keys(schema.definitions).forEach(function (key) {
            var required = schema.required && schema.required.indexOf(key) !== -1;
            var keys = jpp.parse("/#/definitions").concat(key);
            var def = exports.defaultFormDefinition(defaultSchemaTypes, key, schema.definitions[key], Object.assign({}, options, {
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
        Object.keys(schema.properties).forEach(function (key) {
            var currentSchema = Object.assign(schema.properties[key], { $ref: schema.$ref || "" });
            var required = schema.required && schema.required.indexOf(key) !== -1;
            var def = exports.defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], Object.assign({}, options, {
                path: parentKey.concat([key]),
                required: required
            }));
            if (def) {
                defineForm[jpp.compile([key])] = def;
                form.push(def);
            }
        });
    }
    return { defineForm: defineForm, form: form };
};
//# sourceMappingURL=schema.js.map