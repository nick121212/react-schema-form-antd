"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var base_1 = require("./base");
var FormItemTemp = (function (_super) {
    __extends(FormItemTemp, _super);
    function FormItemTemp(props, context) {
        var _this = _super.call(this, props, context) || this;
        _super.prototype.init.call(_this);
        return _this;
    }
    FormItemTemp.prototype.render = function () {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, arrayIndex = _a.arrayIndex, _b = _a.globalOptions, globalOptions = _b === void 0 ? {} : _b, validateResult = _a.validateResult, arrayItems = _a.arrayItems;
        var options = uiSchema["ui:options"] || {};
        var _c = (options.formItem || {}).hasFeedback, hasFeedback = _c === void 0 ? false : _c;
        var _d = this.getErrorInfo(), dirty = _d.dirty, invalid = _d.invalid, error = _d.error;
        var props = {};
        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }
        return (React.createElement(antd_1.Form.Item, __assign({}, globalOptions.formItem, { required: uiSchema.required, label: uiSchema.title, extra: uiSchema.description, help: error ? error.message : "", hasFeedback: dirty && hasFeedback }, props, globalOptions.formItem, options.formItem),
            children,
            arrayItems));
    };
    return FormItemTemp;
}(base_1.BaseTemp));
exports.FormItemTemp = FormItemTemp;
//# sourceMappingURL=formitem.js.map