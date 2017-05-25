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
var BaseWidget = (function (_super) {
    __extends(BaseWidget, _super);
    function BaseWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    BaseWidget.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent, schemaForm = _a.schemaForm;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var onChange = uiSchema.onChange;
        this.onChangedEvent = function (keys, value) {
            onChange && onChange(keys, value, schemaForm);
            _this.setState({
                value: value
            });
        };
        this.onTriggerEvent = function (_a) {
            var dataSource = _a.dataSource, text = _a.text, value = _a.value, loading = _a.loading, clearValue = _a.clearValue;
            _this.setState({
                dataSource: dataSource,
                text: text,
                value: value,
                loading: loading,
                clearValue: clearValue
            });
        };
        formEvent.on(["changed"].concat(keys), this.onChangedEvent);
        formEvent.on(["triggerEvent"].concat(keys), this.onTriggerEvent);
    };
    BaseWidget.prototype.componentWillUnmount = function () {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        formEvent.off(["changed"].concat(keys).join('.'), this.onChangedEvent);
        formEvent.off(["triggerEvent"].concat(keys).join('.'), this.onTriggerEvent);
    };
    BaseWidget.prototype.setDefaultProps = function () {
        var _a = (this.state || {}).value, value = _a === void 0 ? null : _a;
        return {
            value: value || this.getFieldValue()
        };
    };
    return BaseWidget;
}(base_1.SchemaFormBase));
exports.BaseWidget = BaseWidget;
//# sourceMappingURL=base.js.map