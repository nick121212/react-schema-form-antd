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
class RowTemp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { schema, uiSchema, children, globalOptions } = this.props;
        const options = uiSchema["ui:options"] || {};
        return (React.createElement(antd_1.Row, __assign({}, globalOptions.row, options.row), children));
    }
}
exports.RowTemp = RowTemp;
//# sourceMappingURL=row.js.map