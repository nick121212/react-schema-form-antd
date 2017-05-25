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
var React = require("react");
var antd_1 = require("antd");
var base_1 = require("./base");
var utils_1 = require("../../utils");
var CheckboxesWidget = (function (_super) {
    __extends(CheckboxesWidget, _super);
    function CheckboxesWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    CheckboxesWidget.prototype.setDefaultProps = function () {
        var _a = this.props, defaultValue = _a.defaultValue, uiSchema = _a.uiSchema;
        var _b = uiSchema, _c = _b.titleMap, titleMap = _c === void 0 ? [] : _c, _d = _b.schema, schema = _d === void 0 ? {} : _d, readonly = _b.readonly;
        var props = {};
        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        props["options"] = titleMap;
        props["disabled"] = readonly;
        return Object.assign(props, _super.prototype.setDefaultProps.call(this));
    };
    CheckboxesWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, extra = __rest(_a, ["uiSchema", "arrayIndex"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).checkboxes, checkboxes = _b === void 0 ? {} : _b;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        return (React.createElement(antd_1.Checkbox.Group, __assign({ onChange: function (values) { return _this.triggerEvent(["change"].concat(keys), keys, values, uiSchema); } }, this.setDefaultProps(), checkboxes)));
    };
    return CheckboxesWidget;
}(base_1.BaseWidget));
exports.CheckboxesWidget = CheckboxesWidget;
//# sourceMappingURL=checkboxes.js.map