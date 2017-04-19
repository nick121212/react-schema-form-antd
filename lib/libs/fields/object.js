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
var utils_1 = require("../../utils");
var base_1 = require("./base");
var antd_1 = require("antd");
var merge_1 = require("../core/merge");
var ObjectField = (function (_super) {
    __extends(ObjectField, _super);
    function ObjectField(props, context) {
        return _super.call(this, props, context) || this;
    }
    ObjectField.prototype.init = function () {
        var _a = this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent, arrayIndex = _a.arrayIndex, schemaFormOptions = _a.schemaFormOptions;
        var uiSchemaCombine = merge_1.mergeSchema(uiSchema["schema"], uiSchema["uiSchema"], schemaFormOptions, uiSchema.key);
        uiSchema.items = uiSchemaCombine.form;
        _super.prototype.init.call(this);
    };
    ObjectField.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, arrayItems = _a.arrayItems, extra = __rest(_a, ["schema", "uiSchema", "arrayItems"]);
        var options = uiSchema["ui:options"] || {};
        return (React.createElement(antd_1.Card, __assign({}, options.card, { title: React.createElement(antd_1.Row, { type: "flex", justify: "space-between" },
                React.createElement(antd_1.Col, null, uiSchema.title),
                React.createElement(antd_1.Col, null, arrayItems)) }), utils_1.utils.getTemplateRender(__assign({ schema: schema, uiSchemaCombine: uiSchema.items }, extra))));
    };
    return ObjectField;
}(base_1.BaseField));
exports.ObjectField = ObjectField;
//# sourceMappingURL=object.js.map