"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var base_factory_1 = require("./libs/base.factory");
var jpp = require("json-pointer");
var validate_1 = require("./libs/validate");
var condition_1 = require("./libs/hocs/condition");
var temp_1 = require("./libs/hocs/temp");
var trigger_1 = require("./libs/hocs/trigger");
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.getField = function (uiSchema) {
        var FieldTemp = exports.fieldFactory.get(uiSchema["ui:field"] || uiSchema.type || (uiSchema.schema ? uiSchema.schema.type : ""));
        var hoc = uiSchema["ui:hoc"];
        if (!FieldTemp) {
            console.log(uiSchema, "找不到Field");
        }
        if (!hoc) {
            hoc = {
                hoc: function (Component, fn) {
                    return Component;
                },
                params: {}
            };
        }
        return FieldTemp ? hoc.hoc(trigger_1.TriggerHoc(condition_1.ConditionHoc(temp_1.TempHoc(FieldTemp))), hoc.params || {}) : FieldTemp;
    };
    Utils.prototype.getTemplate = function (uiSchema, globalOptions) {
        if (globalOptions === void 0) { globalOptions = {}; }
        var TempComponent = [];
        var template = uiSchema["ui:temp"] || globalOptions["ui:temp"] || "default";
        if (typeof template === "string") {
            TempComponent.push(exports.tempFactory.get(template));
        }
        else {
            template.reverse().forEach(function (tml) {
                var tmp = exports.tempFactory.get(tml || "default");
                if (!tmp) {
                    console.error("\u4E0D\u5B58\u5728" + tmp + "\u7684temp\uFF01");
                }
                else {
                    TempComponent.push(exports.tempFactory.get(tml || "default"));
                }
            });
        }
        return TempComponent;
    };
    Utils.prototype.getWidget = function (uiSchema) {
        return exports.widgetFactory.get(uiSchema["ui:widget"] || "default") || exports.widgetFactory.get("default");
    };
    Utils.prototype.getTemplateRender = function (_a) {
        var schema = _a.schema, uiSchemaCombine = _a.uiSchemaCombine, _b = _a.wrapper, wrapper = _b === void 0 ? [] : _b, extra = __rest(_a, ["schema", "uiSchemaCombine", "wrapper"]);
        var _this = this;
        var children = [];
        uiSchemaCombine && uiSchemaCombine.forEach(function (uiSchema, idx) {
            var TempComponents = exports.utils.getTemplate(uiSchema), TempComponent;
            var FieldComponent = exports.utils.getField(uiSchema);
            if (!FieldComponent) {
                FieldComponent = _this.getTemplateRender(__assign({ schema: schema, uiSchemaCombine: uiSchema.items }, extra));
            }
            else {
                FieldComponent = (React.createElement(FieldComponent, __assign({ key: Date.now() + idx + Math.random(), schema: schema, uiSchema: uiSchema }, extra)));
            }
            FieldComponent && children.push(FieldComponent);
        });
        return children;
    };
    Utils.prototype.mergeKeys = function (_a) {
        var uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = uiSchema.key || [];
        var arrayIndexes = arrayIndex ? arrayIndex.concat([]) : [];
        keys = keys.concat([]);
        keys = keys.map(function (key) {
            if (key) {
                return key;
            }
            return arrayIndexes.shift().toString();
        });
        return keys;
    };
    Utils.prototype.compileKeys = function (_a) {
        var uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = this.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        return jpp.compile(keys);
    };
    Utils.prototype.saveData = function (_a) {
        var data = _a.data, formData = _a.formData, keys = _a.keys;
        var obj = jpp(formData);
        if (data !== null) {
            obj.set(jpp.compile(keys), data == null ? undefined : data);
        }
    };
    Utils.prototype.validateSingle = function (_a) {
        var data = _a.data, uiSchema = _a.uiSchema, keys = _a.keys, validateResult = _a.validateResult;
        var key = jpp.compile(keys);
        var uiSchemaClone = Object.assign({}, uiSchema, { key: jpp.parse(key) });
        var validSingle = validate_1.validate(uiSchemaClone, data);
        var oldValidSingle = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {};
        var rtn = Object.assign({}, oldValidSingle, {
            invalid: !validSingle.valid,
            pristine: false,
            dirty: true
        }, validSingle);
        if (jpp(validateResult).has(key)) {
            jpp(validateResult).set(key, Object.assign({}, jpp(validateResult).get(key), rtn));
        }
        else {
            jpp(validateResult).set(key, rtn);
        }
        return rtn;
    };
    return Utils;
}());
exports.Utils = Utils;
exports.utils = new Utils();
exports.fieldFactory = new base_factory_1.BaseFactory();
exports.widgetFactory = new base_factory_1.BaseFactory();
exports.tempFactory = new base_factory_1.BaseFactory();
//# sourceMappingURL=utils.js.map