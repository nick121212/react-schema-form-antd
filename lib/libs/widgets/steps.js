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
var StepsWidget = (function (_super) {
    __extends(StepsWidget, _super);
    function StepsWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    StepsWidget.prototype.handleDelete = function (idx) {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var data = this.getFieldValue();
        data.splice(idx, 1);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    };
    StepsWidget.prototype.handleUp = function (idx) {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var data = this.getFieldValue();
        this.up(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    };
    StepsWidget.prototype.handleDown = function (idx) {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var data = this.getFieldValue();
        this.down(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    };
    StepsWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).steps, steps = _b === void 0 ? {} : _b;
        var titleMap = this.getFieldValue();
        if (titleMap && titleMap.length) {
            return (React.createElement(antd_1.Steps, __assign({}, steps), titleMap && titleMap.map(function (val, i) {
                return React.createElement(antd_1.Steps.Step, { key: val.key + "-" + i, title: React.createElement("div", null,
                        React.createElement("span", null, val.title),
                        React.createElement(antd_1.Button.Group, null,
                            React.createElement(antd_1.Button, { onClick: _this.handleDelete.bind(_this, i), icon: "minus" }),
                            React.createElement(antd_1.Button, { disabled: !_this.canUp(titleMap, i), onClick: _this.handleUp.bind(_this, i), icon: "arrow-up" }),
                            React.createElement(antd_1.Button, { disabled: !_this.canDown(titleMap, i), onClick: _this.handleDown.bind(_this, i), icon: "arrow-down" }))) });
            })));
        }
        return React.createElement("span", null, "\u6682\u65E0\u6570\u636E");
    };
    return StepsWidget;
}(base_1.BaseWidget));
exports.StepsWidget = StepsWidget;
//# sourceMappingURL=steps.js.map