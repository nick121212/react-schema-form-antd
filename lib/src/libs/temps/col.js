"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const antd_1 = require("antd");
class ColTemp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { schema, uiSchema, globalOptions = {}, children } = this.props;
        const options = uiSchema["ui:options"] || {};
        return (React.createElement(antd_1.Col, __assign({}, globalOptions.col, options.col), children));
    }
}
exports.ColTemp = ColTemp;
//# sourceMappingURL=col.js.map