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
var TreeWidget = (function (_super) {
    __extends(TreeWidget, _super);
    function TreeWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    TreeWidget.prototype.setDefaultProps = function () {
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
    TreeWidget.prototype.onLoadData = function (treeNode) {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        console.log(treeNode);
        return uiSchema["ui:trigger"] && uiSchema["ui:trigger"](treeNode.eventKey).then(function (dataSource) {
            _this.setState({
                dataSource: dataSource
            });
        });
    };
    TreeWidget.prototype.loop = function (data) {
        var _this = this;
        data.map(function (item) {
            if (item.nodes) {
                return React.createElement(antd_1.Tree.TreeNode, { title: item.name, key: item.key }, _this.loop(item.nodes));
            }
            return React.createElement(antd_1.Tree.TreeNode, { title: item.name, key: item.key, isLeaf: item.isLeaf });
        });
    };
    TreeWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, globalOptions = _a.globalOptions, arrayIndex = _a.arrayIndex, schemaForm = _a.schemaForm, onChange = _a.onChange, defaultValue = _a.defaultValue, formEvent = _a.formEvent, form = _a.form, extra = __rest(_a, ["uiSchema", "children", "globalOptions", "arrayIndex", "schemaForm", "onChange", "defaultValue", "formEvent", "form"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).tree, tree = _b === void 0 ? {} : _b;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var _c = (this.state || {}).dataSource, dataSource = _c === void 0 ? [] : _c;
        return (React.createElement(antd_1.Tree, __assign({ loadData: this.onLoadData, onSelect: function (value) { return _this.triggerEvent(["change"].concat(keys), keys, value, uiSchema); } }, this.setDefaultProps(), tree)));
    };
    return TreeWidget;
}(base_1.BaseWidget));
exports.TreeWidget = TreeWidget;
//# sourceMappingURL=tree.js.map