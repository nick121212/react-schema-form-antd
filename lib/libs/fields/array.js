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
const jpp = require("json-pointer");
const antd_1 = require("antd");
const utils_1 = require("../../utils");
const base_1 = require("./base");
class ArrayField extends base_1.BaseField {
    constructor(props, context) {
        super(props, context);
        this.validateResult = {};
    }
    handleChange(opt, idx, keys, items) {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        switch (opt) {
            case "add":
                jpp(this.validateResult).set(jpp.compile(keys.concat([(items.length - 1).toString()])), {});
                break;
            case "delete":
                jpp(this.validateResult).has(jpp.compile(keys.concat([idx]))) && jpp(this.validateResult).remove(jpp.compile(keys.concat([idx])));
                break;
            case "down":
                jpp(this.validateResult).has(jpp.compile(keys)) && this.down(jpp(this.validateResult).get(jpp.compile(keys)), idx);
                break;
            case "up":
                jpp(this.validateResult).has(jpp.compile(keys)) && this.up(jpp(this.validateResult).get(jpp.compile(keys)), idx);
                break;
        }
        formEvent.emit(["change"].concat(keys), keys, items, uiSchema);
        this.forceUpdate();
    }
    handleAdd(e) {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let items = this.getFieldValue() || [];
        let type = jpp(uiSchema).has("/schema/items/type") ? jpp(uiSchema).get("/schema/items/type") : "";
        items = items.concat([type === "object" ? {} : undefined]);
        this.handleChange("add", 0, keys, items);
        e.preventDefault();
    }
    handleDelete(idx, e) {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let items = this.getFieldValue() || [];
        items.splice(idx, 1);
        this.handleChange("delete", idx, keys, items);
        e.preventDefault();
    }
    handleUp(idx) {
        const _a = this.props, { uiSchema, arrayIndex, formEvent } = _a, extra = __rest(_a, ["uiSchema", "arrayIndex", "formEvent"]);
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();
        this.up(data, idx);
        this.handleChange("up", idx, keys, data);
        this.forceUpdate();
    }
    handleDown(idx) {
        const _a = this.props, { uiSchema, arrayIndex, formEvent } = _a, extra = __rest(_a, ["uiSchema", "arrayIndex", "formEvent"]);
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();
        this.down(data, idx);
        this.handleChange("down", idx, keys, data);
        this.forceUpdate();
    }
    renderItems() {
        const _a = this.props, { schema, uiSchema, validateResult, arrayIndex, formEvent } = _a, extra = __rest(_a, ["schema", "uiSchema", "validateResult", "arrayIndex", "formEvent"]);
        const options = uiSchema["ui:options"] || {};
        let { add = true, remove = true } = options.array || {};
        let items = this.getFieldValue() || [], children = [];
        items.forEach((item, idx) => {
            let idxs = arrayIndex ? arrayIndex.concat([idx]) : [idx];
            children.push(React.createElement(antd_1.Row, { key: idx + "arrayTemplate", style: { borderBottom: "1px solid #e8e8e8", margin: 5 } },
                React.createElement(antd_1.Col, { span: 18 }, utils_1.utils.getTemplateRender(__assign({ validateResult: this.validateResult, formEvent, schema, uiSchemaCombine: uiSchema.items, arrayIndex: idxs }, extra))),
                React.createElement(antd_1.Col, { span: 5 },
                    React.createElement(antd_1.Button.Group, null,
                        remove && React.createElement(antd_1.Button, { onClick: this.handleDelete.bind(this, idx), icon: "minus" }),
                        React.createElement(antd_1.Button, { disabled: !this.canUp(items, idx), onClick: this.handleUp.bind(this, idx), icon: "arrow-up" }),
                        React.createElement(antd_1.Button, { disabled: !this.canDown(items, idx), onClick: this.handleDown.bind(this, idx), icon: "arrow-down" })))));
        });
        return children;
    }
    componentDidUpdate(prevProps, prevState) {
        const { formEvent } = this.props;
        formEvent.emit("refreshArray");
    }
    init() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        formEvent.on(["validator"].concat(keys).concat(["*", "**"]), (childKeys, single) => {
            single && jpp(this.validateResult).set(jpp.compile(childKeys), single);
            formEvent.emit(["change"].concat(keys), keys, this.getFieldValue(), uiSchema);
        });
        super.init();
    }
    render() {
        const _a = this.props, { schema, uiSchema } = _a, extra = __rest(_a, ["schema", "uiSchema"]);
        const key = this.getKey();
        const options = uiSchema["ui:options"] || {};
        const { add = true, remove = true } = options.array || {};
        return (React.createElement(antd_1.Card, { title: React.createElement(antd_1.Row, { type: "flex", justify: "space-between" },
                React.createElement(antd_1.Col, null, uiSchema.title),
                React.createElement(antd_1.Col, null, add && React.createElement(antd_1.Button, { onClick: this.handleAdd.bind(this), shape: "circle", icon: "plus" }))) }, this.renderItems()));
    }
}
exports.ArrayField = ArrayField;
//# sourceMappingURL=array.js.map