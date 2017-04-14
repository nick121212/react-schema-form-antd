"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const antd_1 = require("antd");
const base_1 = require("./base");
class FormItemTemp extends base_1.BaseTemp {
    constructor(props, context) {
        super(props, context);
        super.init();
    }
    render() {
        const { uiSchema, children, arrayIndex, globalOptions = {}, validateResult, arrayItems } = this.props;
        const options = uiSchema["ui:options"] || {};
        const { hasFeedback = false } = options.formItem || {};
        const { dirty, invalid, error } = this.getErrorInfo();
        let props = {};
        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }
        return (React.createElement(antd_1.Form.Item, __assign({}, globalOptions.formItem, { required: uiSchema.required, label: uiSchema.title, extra: uiSchema.description, help: error ? error.message : "", hasFeedback: dirty && hasFeedback }, props, globalOptions.formItem, options.formItem),
            children,
            arrayItems));
    }
}
exports.FormItemTemp = FormItemTemp;
//# sourceMappingURL=formitem.js.map