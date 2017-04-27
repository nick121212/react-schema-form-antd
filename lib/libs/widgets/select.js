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
var SelectWidget = (function (_super) {
    __extends(SelectWidget, _super);
    function SelectWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    SelectWidget.prototype.setDefaultProps = function () {
        var uiSchema = this.props.uiSchema;
        var _a = uiSchema, _b = _a.titleMap, titleMap = _b === void 0 ? [] : _b, _c = _a.schema, schema = _c === void 0 ? {} : _c;
        var _d = this.state || {}, _e = _d.value, value = _e === void 0 ? undefined : _e, _f = _d.text, text = _f === void 0 ? undefined : _f;
        var defaultValue = this.getFieldValue();
        var changeProp = uiSchema["ui:change"] || "onChange";
        var props = {};
        if (schema.type === "array") {
            props["mode"] = "multiple";
            if (defaultValue) {
                props["defaultValue"] = defaultValue.map(function (d) {
                    return d.toString();
                });
            }
            if (value) {
                props["value"] = value.map(function (d) {
                    return d.toString();
                });
                ;
            }
        }
        else {
            if (defaultValue) {
                props["defaultValue"] = defaultValue.toString();
            }
            if (value) {
                props["value"] = value.toString();
            }
        }
        props[changeProp] = this.handleChange.bind(this);
        if (props.hasOwnProperty("value")) {
            delete props["defaultValue"];
        }
        props["children"] = [{
                key: 1,
                text: "id1"
            }];
        return props;
    };
    SelectWidget.prototype.handleChange = function (value, item) {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, handleTrigger = _a.handleTrigger, extra = __rest(_a, ["uiSchema", "arrayIndex", "handleTrigger"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        if (uiSchema.schema.type === "number") {
            value = ~~value;
        }
        if (value === this.getFieldValue()) {
            return;
        }
        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    };
    SelectWidget.prototype.render = function () {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, formData = _a.formData, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, formEvent = _a.formEvent, form = _a.form, triggerProps = _a.triggerProps, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "formData", "arrayIndex", "schemaForm", "onChange", "formEvent", "form", "triggerProps"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).select, select = _b === void 0 ? {} : _b;
        var _c = uiSchema, _d = _c.titleMap, titleMap = _d === void 0 ? [] : _d, _e = _c.schema, schema = _e === void 0 ? {} : _e;
        var _f = this.state || {}, _g = _f.dataSource, dataSource = _g === void 0 ? [] : _g, _h = _f.text, text = _h === void 0 ? "" : _h, _j = _f.loading, loading = _j === void 0 ? false : _j;
        var uiData = utils_1.utils.getUiData(uiSchema, formData);
        if (uiData.length) {
            titleMap = uiData;
        }
        if (dataSource.length) {
            titleMap = dataSource;
        }
        return (React.createElement(antd_1.Select, __assign({ disabled: uiSchema.readonly, placeholder: uiSchema.title, notFoundContent: loading ? React.createElement(antd_1.Spin, { size: "small" }) : null }, triggerProps, select, this.setDefaultProps()), titleMap.map(function (val, i) {
            return React.createElement(antd_1.Select.Option, { value: val.value, key: val.value }, val.label);
        })));
    };
    return SelectWidget;
}(base_1.BaseWidget));
exports.SelectWidget = SelectWidget;
//# sourceMappingURL=select.js.map