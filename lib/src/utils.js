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
const React = require("react");
const base_factory_1 = require("./libs/base.factory");
const jpp = require("json-pointer");
const validate_1 = require("./libs/validate");
const condition_1 = require("./libs/hocs/condition");
const temp_1 = require("./libs/hocs/temp");
class Utils {
    getField(uiSchema) {
        let FieldTemp = exports.fieldFactory.get(uiSchema["ui:field"] || uiSchema.type || (uiSchema.schema ? uiSchema.schema.type : ""));
        if (!FieldTemp) {
            console.log(uiSchema, "找不到Field");
        }
        return FieldTemp ? condition_1.ConditionHoc(temp_1.TempHoc(FieldTemp)) : FieldTemp;
    }
    getTemplate(uiSchema) {
        let TempComponent = [];
        let template = uiSchema["ui:temp"] || "default";
        if (typeof template === "string") {
            TempComponent.push(exports.tempFactory.get(template));
        }
        else {
            template.reverse().forEach((tml) => {
                let tmp = exports.tempFactory.get(tml || "default");
                if (!tmp) {
                    console.error(`不存在${tmp}的temp！`);
                }
                else {
                    TempComponent.push(exports.tempFactory.get(tml || "default"));
                }
            });
        }
        return TempComponent;
    }
    getWidget(uiSchema) {
        return exports.widgetFactory.get(uiSchema["ui:widget"] || "default") || exports.widgetFactory.get("default");
    }
    getTemplateRender(_a) {
        var { schema, uiSchemaCombine, wrapper = [] } = _a, extra = __rest(_a, ["schema", "uiSchemaCombine", "wrapper"]);
        let children = [];
        uiSchemaCombine && uiSchemaCombine.forEach((uiSchema, idx) => {
            let TempComponents = exports.utils.getTemplate(uiSchema), TempComponent;
            let FieldComponent = exports.utils.getField(uiSchema);
            if (!FieldComponent) {
                FieldComponent = this.getTemplateRender(__assign({ schema, uiSchemaCombine: uiSchema.items }, extra));
            }
            else {
                FieldComponent = (React.createElement(FieldComponent, __assign({ key: Date.now() + idx + Math.random(), schema: schema, uiSchema: uiSchema }, extra)));
            }
            FieldComponent && children.push(FieldComponent);
        });
        return children;
    }
    mergeKeys({ uiSchema, arrayIndex }) {
        let keys = uiSchema.key || [];
        let arrayIndexes = arrayIndex ? arrayIndex.concat([]) : [];
        keys = keys.concat([]);
        keys = keys.map((key) => {
            if (key) {
                return key;
            }
            return arrayIndexes.shift().toString();
        });
        return keys;
    }
    compileKeys({ uiSchema, arrayIndex }) {
        let keys = this.mergeKeys({ uiSchema, arrayIndex });
        return jpp.compile(keys);
    }
    saveData({ data, formData, keys }) {
        let obj = jpp(formData);
        if (data !== null) {
            obj.set(jpp.compile(keys), data == null ? undefined : data);
        }
    }
    validateSingle({ data, uiSchema, keys, validateResult }) {
        let key = jpp.compile(keys);
        let uiSchemaClone = Object.assign({}, uiSchema, { key: jpp.parse(key) });
        let validSingle = validate_1.validate(uiSchemaClone, data);
        let oldValidSingle = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {};
        let rtn = Object.assign({}, oldValidSingle, {
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
    }
}
exports.Utils = Utils;
exports.utils = new Utils();
exports.fieldFactory = new base_factory_1.BaseFactory();
exports.widgetFactory = new base_factory_1.BaseFactory();
exports.tempFactory = new base_factory_1.BaseFactory();
//# sourceMappingURL=utils.js.map