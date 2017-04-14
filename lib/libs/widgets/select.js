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
const antd_1 = require("antd");
const base_1 = require("./base");
const utils_1 = require("../../utils");
class SelectWidget extends base_1.BaseWidget {
    constructor(props, context) {
        super(props, context);
    }
    setDefaultProps() {
        const { defaultValue, uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema;
        let props = {};
        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        return Object.assign(props, super.setDefaultProps());
    }
    render() {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const options = uiSchema["ui:options"] || {}, { select = {} } = options.widget;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        const { titleMap = [], schema = {} } = uiSchema;
        return (React.createElement(antd_1.Select, __assign({ onChange: (value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema), disabled: uiSchema.readonly, placeholder: uiSchema.title }, this.setDefaultProps(), select), titleMap.map((val, i) => {
            return React.createElement(antd_1.Select.Option, { key: i, value: val.value }, val.label);
        })));
    }
}
exports.SelectWidget = SelectWidget;
//# sourceMappingURL=select.js.map