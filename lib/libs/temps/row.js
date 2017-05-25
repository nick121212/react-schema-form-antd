"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var RowTemp = (function (_super) {
    __extends(RowTemp, _super);
    function RowTemp(props, context) {
        return _super.call(this, props, context) || this;
    }
    RowTemp.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, children = _a.children, _b = _a.globalOptions, globalOptions = _b === void 0 ? { row: {} } : _b;
        var options = uiSchema["ui:options"] || { row: {} };
        return (React.createElement(antd_1.Row, __assign({}, globalOptions.row, options.row), children));
    };
    return RowTemp;
}(React.Component));
exports.RowTemp = RowTemp;
//# sourceMappingURL=row.js.map