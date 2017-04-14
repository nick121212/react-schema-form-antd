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
    }
    handleChange(opt, idx, keys, items) {
        const { formEvent, uiSchema, arrayIndex, validateResult } = this.props;
        switch (opt) {
            case "add":
                break;
            case "delete":
                jpp(validateResult).has(jpp.compile(keys.concat([idx.toString()]))) && jpp(validateResult).remove(jpp.compile(keys.concat([idx.toString()])));
                for (let i = idx; i <= items.length; i++) {
                    this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), i + 1, i);
                }
                break;
            case "down":
                this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, ++idx);
                break;
            case "up":
                this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, --idx);
                break;
        }
        formEvent.emit(["change"].concat(keys), keys, items, uiSchema);
        this.forceUpdate();
    }
    handleAdd(e) {
        const { formEvent, uiSchema, arrayIndex, schemaFormOptions } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let items = this.getFieldValue() || [];
        let { type = "", $ref = "" } = jpp(uiSchema).has("/schema/items") ? jpp(uiSchema).get("/schema/items") : {};
        if (!type && $ref) {
            type = (schemaFormOptions.global.schemas[$ref] || {}).type;
        }
        items = items.concat([type === "object" ? {} : null]);
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
            let arrayItems = (React.createElement(antd_1.Button.Group, null,
                remove && React.createElement(antd_1.Button, { size: "small", onClick: this.handleDelete.bind(this, idx), icon: "minus" }),
                React.createElement(antd_1.Button, { size: "small", disabled: !this.canUp(items, idx), onClick: this.handleUp.bind(this, idx), icon: "arrow-up" }),
                React.createElement(antd_1.Button, { size: "small", disabled: !this.canDown(items, idx), onClick: this.handleDown.bind(this, idx), icon: "arrow-down" })));
            children.push(utils_1.utils.getTemplateRender(__assign({ validateResult, formEvent, schema, uiSchemaCombine: uiSchema.items, arrayIndex: idxs, arrayItems }, extra)));
        });
        return children;
    }
    componentDidUpdate(prevProps, prevState) {
        const { formEvent } = this.props;
        formEvent.emit("refreshArray");
    }
    init() {
        const { uiSchema, formEvent, arrayIndex, schemaFormOptions } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        let timeid;
        this.changeCurrentArray = (childKeys, data) => {
            if (timeid) {
                clearTimeout(timeid);
            }
            timeid = setTimeout(() => {
                let parentKeys = childKeys.concat([]);
                if (!Number.isInteger(parentKeys.pop()) && parentKeys.join() === keys.join()) {
                    formEvent.emit(["change"].concat(parentKeys), parentKeys, this.getFieldValue(), uiSchema);
                }
                formEvent.emit(["change"].concat(keys), keys, this.getFieldValue(), uiSchema);
            }, 10);
        };
        formEvent.on(["changed"].concat(keys).concat(["*"]), this.changeCurrentArray.bind(this));
        formEvent.on(["changed"].concat(keys).concat(["*", "*"]), this.changeCurrentArray.bind(this));
        super.init();
    }
    componentWillUnmount() {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        formEvent.off(["changed"].concat(keys).concat(["*", "*"]).join(""), this.changeCurrentArray.bind(this));
    }
    render() {
        const _a = this.props, { schema, uiSchema, schemaFormOptions } = _a, extra = __rest(_a, ["schema", "uiSchema", "schemaFormOptions"]);
        const options = uiSchema["ui:options"] || {};
        const { add = true, remove = true } = options.array || {};
        return (React.createElement(antd_1.Card, { title: React.createElement(antd_1.Row, { type: "flex", justify: "space-between" },
                React.createElement(antd_1.Col, null, uiSchema.title),
                React.createElement(antd_1.Col, null, add && React.createElement(antd_1.Button, { onClick: this.handleAdd.bind(this), shape: "circle", icon: "plus" }))) }, this.renderItems()));
    }
}
exports.ArrayField = ArrayField;
//# sourceMappingURL=array.js.map