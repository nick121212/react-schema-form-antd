"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var antd_1 = require("antd");
var base_1 = require("./base");
var utils_1 = require("../../utils");
var CheckboxWidget = (function (_super) {
    __extends(CheckboxWidget, _super);
    function CheckboxWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    CheckboxWidget.prototype.setDefaultProps = function () {
        var baseProps = _super.prototype.setDefaultProps.call(this);
        return {
            defaultChecked: this.getFieldValue()
        };
    };
    CheckboxWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, children = _a.children, arrayIndex = _a.arrayIndex, globalOptions = _a.globalOptions, schemaForm = _a.schemaForm, onChange = _a.onChange, formEvent = _a.formEvent, defaultValue = _a.defaultValue, form = _a.form, extra = __rest(_a, ["schema", "uiSchema", "children", "arrayIndex", "globalOptions", "schemaForm", "onChange", "formEvent", "defaultValue", "form"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).checkbox, checkbox = _b === void 0 ? {} : _b;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        return (React.createElement(antd_1.Checkbox, __assign({ onChange: function (e) { return _this.triggerEvent(["change"].concat(keys), keys, e.target["checked"], uiSchema); }, disabled: uiSchema.readonly }, checkbox, this.setDefaultProps())));
    };
    return CheckboxWidget;
}(base_1.BaseWidget));
exports.CheckboxWidget = CheckboxWidget;
//# sourceMappingURL=checkbox.js.map