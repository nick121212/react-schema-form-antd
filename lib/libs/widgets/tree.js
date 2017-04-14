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
const antd_1 = require("antd");
const base_1 = require("./base");
const utils_1 = require("../../utils");
class TreeWidget extends base_1.BaseWidget {
    constructor(props, context) {
        super(props, context);
    }
    setDefaultProps() {
        const { defaultValue, uiSchema } = this.props;
        const { schema = {}, titleMap = [] } = uiSchema;
        const { text = undefined } = this.state || {};
        let props = {};
        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        if (text != undefined) {
            props["value"] = text;
        }
        return Object.assign({}, super.setDefaultProps(), props);
    }
    onLoadData(treeNode) {
        const { uiSchema, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        console.log(treeNode);
        return uiSchema["ui:trigger"] && uiSchema["ui:trigger"](treeNode.eventKey).then((dataSource) => {
            this.setState({
                dataSource: dataSource
            });
        });
    }
    loop(data) {
        data.map((item) => {
            if (item.nodes) {
                return React.createElement(antd_1.Tree.TreeNode, { title: item.name, key: item.key }, this.loop(item.nodes));
            }
            return React.createElement(antd_1.Tree.TreeNode, { title: item.name, key: item.key, isLeaf: item.isLeaf });
        });
    }
    render() {
        const _a = this.props, { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form } = _a, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        const options = uiSchema["ui:options"] || {}, { tree = {} } = options.widget;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        const { dataSource = [] } = this.state || {};
        return (React.createElement(antd_1.Tree, __assign({ loadData: this.onLoadData, onSelect: (value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema) }, this.setDefaultProps(), tree)));
    }
}
exports.TreeWidget = TreeWidget;
//# sourceMappingURL=tree.js.map