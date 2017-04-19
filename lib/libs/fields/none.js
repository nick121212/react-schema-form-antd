"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var base_1 = require("./base");
var NoneField = (function (_super) {
    __extends(NoneField, _super);
    function NoneField(props, context) {
        return _super.call(this, props, context) || this;
    }
    NoneField.prototype.render = function () {
        return (React.createElement("span", null, this.props.children));
    };
    return NoneField;
}(base_1.BaseField));
exports.NoneField = NoneField;
//# sourceMappingURL=none.js.map