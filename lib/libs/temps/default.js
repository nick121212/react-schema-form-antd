"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var base_1 = require("./base");
var DefaultTemp = (function (_super) {
    __extends(DefaultTemp, _super);
    function DefaultTemp(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.init();
        return _this;
    }
    DefaultTemp.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, _b = _a.globalOptions, globalOptions = _b === void 0 ? {} : _b, children = _a.children;
        var options = uiSchema["ui:options"] || {};
        var _c = this.getErrorInfo(), error = _c.error, invalid = _c.invalid, dirty = _c.dirty;
        return (React.createElement("div", null,
            React.createElement("div", null,
                children,
                React.createElement("i", { style: { clear: "both", display: "block" } })),
            React.createElement("div", null, invalid && dirty && error.message + this.getKey())));
    };
    return DefaultTemp;
}(base_1.BaseTemp));
exports.DefaultTemp = DefaultTemp;
//# sourceMappingURL=default.js.map