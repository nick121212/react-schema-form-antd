"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../../utils");
var base_1 = require("../base");
var BaseWidget = (function (_super) {
    __extends(BaseWidget, _super);
    function BaseWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    BaseWidget.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        this.onChangedEvent = function (keys, value) {
            _this.setState({
                value: value
            });
        };
        this.onTriggerEvent = function (_a) {
            var dataSource = _a.dataSource, text = _a.text, loading = _a.loading;
            _this.setState({
                dataSource: dataSource,
                text: text,
                loading: loading
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
    BaseWidget.prototype.triggerEvent = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formEvent = this.props.formEvent;
        formEvent.emit.apply(formEvent, [name].concat(args));
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