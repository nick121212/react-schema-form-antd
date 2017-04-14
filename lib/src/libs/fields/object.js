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
const utils_1 = require("../../utils");
const base_1 = require("./base");
const antd_1 = require("antd");
const merge_1 = require("../core/merge");
class ObjectField extends base_1.BaseField {
    constructor(props, context) {
        super(props, context);
    }
    init() {
        const { uiSchema, formEvent, arrayIndex, schemaFormOptions } = this.props;
        const uiSchemaCombine = merge_1.mergeSchema(uiSchema["schema"], uiSchema["uiSchema"], schemaFormOptions, uiSchema.key);
        uiSchema.items = uiSchemaCombine.form;
        super.init();
    }
    render() {
        const _a = this.props, { schema, uiSchema, arrayItems } = _a, extra = __rest(_a, ["schema", "uiSchema", "arrayItems"]);
        const options = uiSchema["ui:options"] || {};
        return (React.createElement(antd_1.Card, __assign({}, options.card, { title: React.createElement(antd_1.Row, { type: "flex", justify: "space-between" },
                React.createElement(antd_1.Col, null, uiSchema.title),
                React.createElement(antd_1.Col, null, arrayItems)) }), utils_1.utils.getTemplateRender(__assign({ schema, uiSchemaCombine: uiSchema.items }, extra))));
    }
}
exports.ObjectField = ObjectField;
//# sourceMappingURL=object.js.map