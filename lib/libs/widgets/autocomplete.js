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
var AutoCompleteWidget = (function (_super) {
    __extends(AutoCompleteWidget, _super);
    function AutoCompleteWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    AutoCompleteWidget.prototype.setDefaultProps = function () {
        var _a = this.props, defaultValue = _a.defaultValue, uiSchema = _a.uiSchema;
        var _b = uiSchema, _c = _b.schema, schema = _c === void 0 ? {} : _c, _d = _b.titleMap, titleMap = _d === void 0 ? [] : _d;
        var _e = (this.state || {}).text, text = _e === void 0 ? undefined : _e;
        var props = {};
        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        if (text != undefined) {
            props["value"] = text;
        }
        return Object.assign({}, _super.prototype.setDefaultProps.call(this), props);
    };
    AutoCompleteWidget.prototype.handleChange = function (value) {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var _b = this.state.text, text = _b === void 0 ? undefined : _b;
        if (text != value && value != this.getFieldValue()) {
            this.timeId && clearTimeout(this.timeId);
            this.timeId = setTimeout(function () {
                uiSchema["ui:trigger"] && uiSchema["ui:trigger"](value).then(function (dataSource) {
                    _this.setState({
                        dataSource: dataSource,
                        text: value
                    });
                });
            }, 300);
        }
    };
    AutoCompleteWidget.prototype.onSelect = function (value) {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    };
    AutoCompleteWidget.prototype.render = function () {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).autocomplete, autocomplete = _b === void 0 ? {} : _b;
        var _c = (this.state || {}).dataSource, dataSource = _c === void 0 ? [] : _c;
        return (React.createElement(antd_1.AutoComplete, __assign({ disabled: uiSchema.readonly, placeholder: uiSchema.title, onSelect: this.onSelect.bind(this), onChange: this.handleChange.bind(this), dataSource: dataSource }, autocomplete),
            React.createElement(antd_1.Input, { suffix: React.createElement(antd_1.Icon, { type: "search", className: "certain-category-icon" }) })));
    };
    return AutoCompleteWidget;
}(base_1.BaseWidget));
exports.AutoCompleteWidget = AutoCompleteWidget;
//# sourceMappingURL=autocomplete.js.map