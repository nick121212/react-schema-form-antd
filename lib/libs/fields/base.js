"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../../utils");
var base_1 = require("../base");
var BaseField = (function (_super) {
    __extends(BaseField, _super);
    function BaseField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.init();
        return _this;
    }
    BaseField.prototype.init = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        this.onChangeEvent = (function () {
            var _a = _this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent;
            formEvent.emit(["validator"].concat(keys), keys, _this.getFieldValue(), uiSchema);
        }).bind(this);
        formEvent.on("validatorAll", this.onChangeEvent);
    };
    BaseField.prototype.componentWillUnmount = function () {
        var formEvent = this.props.formEvent;
        formEvent.off("validatorAll", this.onChangeEvent);
    };
    return BaseField;
}(base_1.SchemaFormBase));
exports.BaseField = BaseField;
//# sourceMappingURL=base.js.map