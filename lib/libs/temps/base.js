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
var utils_1 = require("../../utils");
var base_1 = require("../base");
var jpp = require("json-pointer");
var BaseTemp = (function (_super) {
    __extends(BaseTemp, _super);
    function BaseTemp(props, context) {
        return _super.call(this, props, context) || this;
    }
    BaseTemp.prototype.init = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        this.onValidatorEvent = (function (ekey, err) {
            _this.forceUpdate();
        }).bind(this);
        formEvent.on(["setValidator"].concat(keys), this.onValidatorEvent);
    };
    BaseTemp.prototype.componentWillUnmount = function () {
        var _a = this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        formEvent.off(["setValidator"].concat(keys).join('.'), this.onValidatorEvent);
    };
    BaseTemp.prototype.getErrorInfo = function () {
        var _a = this.props, uiSchema = _a.uiSchema, children = _a.children, arrayIndex = _a.arrayIndex, _b = _a.globalOptions, globalOptions = _b === void 0 ? {} : _b, validateResult = _a.validateResult;
        var options = uiSchema["ui:options"] || {};
        var key = this.getKey();
        var _c = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {}, _d = _c.error, error = _d === void 0 ? null : _d, _e = _c.dirty, dirty = _e === void 0 ? false : _e, _f = _c.invalid, invalid = _f === void 0 ? true : _f;
        var _g = (options.formItem || {}).hasFeedback, hasFeedback = _g === void 0 ? false : _g;
        var props = {};
        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }
        return { dirty: dirty, invalid: invalid, error: error };
    };
    return BaseTemp;
}(base_1.SchemaFormBase));
exports.BaseTemp = BaseTemp;
//# sourceMappingURL=base.js.map