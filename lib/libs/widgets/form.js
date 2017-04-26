"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var base_1 = require("./base");
var merge_1 = require("../core/merge");
var FormWidget = (function (_super) {
    __extends(FormWidget, _super);
    function FormWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    FormWidget.prototype.handleChange = function (value) {
    };
    FormWidget.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, children = _a.children, validateResult = _a.validateResult, formEvent = _a.formEvent, schemaFormOptions = _a.schemaFormOptions, extra = __rest(_a, ["schema", "uiSchema", "children", "validateResult", "formEvent", "schemaFormOptions"]);
        var val = this.getFieldValue();
        if (!val.schema) {
            return React.createElement("span", null, children);
        }
        var _b = merge_1.mergeSchema(val.schema, val.uiSchema || {}, schemaFormOptions), form = _b.form, options = _b.options;
        return (React.createElement("span", null, children));
    };
    return FormWidget;
}(base_1.BaseWidget));
exports.FormWidget = FormWidget;
//# sourceMappingURL=form.js.map