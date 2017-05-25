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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UnSupportField = (function (_super) {
    __extends(UnSupportField, _super);
    function UnSupportField(props, context) {
        return _super.call(this, props, context) || this;
    }
    UnSupportField.prototype.render = function () {
        var uiSchema = this.props.uiSchema;
        return (React.createElement("div", { className: "unsupported-field" },
            "Unsupported field schema ",
            JSON.stringify(uiSchema, null, 2),
            "."));
    };
    return UnSupportField;
}(React.Component));
exports.UnSupportField = UnSupportField;
//# sourceMappingURL=unsupport.js.map