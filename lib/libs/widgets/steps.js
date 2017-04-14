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
class StepsWidget extends base_1.BaseWidget {
    constructor(props, context) {
        super(props, context);
    }
    handleDelete(idx) {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();
        data.splice(idx, 1);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }
    handleUp(idx) {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();
        this.up(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }
    handleDown(idx) {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();
        this.down(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }
    render() {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const options = uiSchema["ui:options"] || {}, { steps = {} } = options.widget;
        let titleMap = this.getFieldValue();
        if (titleMap && titleMap.length) {
            return (React.createElement(antd_1.Steps, __assign({}, steps), titleMap && titleMap.map((val, i) => {
                return React.createElement(antd_1.Steps.Step, { key: val.key + "-" + i, title: React.createElement("div", null,
                        React.createElement("span", null, val.title),
                        React.createElement(antd_1.Button.Group, null,
                            React.createElement(antd_1.Button, { onClick: this.handleDelete.bind(this, i), icon: "minus" }),
                            React.createElement(antd_1.Button, { disabled: !this.canUp(titleMap, i), onClick: this.handleUp.bind(this, i), icon: "arrow-up" }),
                            React.createElement(antd_1.Button, { disabled: !this.canDown(titleMap, i), onClick: this.handleDown.bind(this, i), icon: "arrow-down" }))) });
            })));
        }
        return React.createElement("span", null, "\u6682\u65E0\u6570\u636E");
    }
}
exports.StepsWidget = StepsWidget;
//# sourceMappingURL=steps.js.map