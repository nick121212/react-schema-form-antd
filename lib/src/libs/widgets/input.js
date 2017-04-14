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
class InputWidget extends base_1.BaseWidget {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const _a = this.props, { uiSchema, globalOptions, arrayIndex, defaultValue } = _a, extra = __rest(_a, ["uiSchema", "globalOptions", "arrayIndex", "defaultValue"]);
        const options = uiSchema["ui:options"] || {}, { input = {} } = options.widget || {};
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        return (React.createElement(antd_1.Input, __assign({ onChange: (e) => this.triggerEvent(["change"].concat(keys), keys, e.target["value"], uiSchema), disabled: uiSchema.readonly, defaultValue: defaultValue, placeholder: uiSchema.title }, this.setDefaultProps(), input)));
    }
}
exports.InputWidget = InputWidget;
//# sourceMappingURL=input.js.map