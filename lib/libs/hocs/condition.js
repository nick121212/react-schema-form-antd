"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var cmp = require("comparejs");
var jpp = require("json-pointer");
var base_1 = require("./base");
var utils_1 = require("../../utils");
exports.ConditionHoc = function (Component) {
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            var _this = _super.call(this, props, content) || this;
            _this.initConditionWrapper = _this.initCondition.bind(_this);
            return _this;
        }
        Hoc.prototype.getCurrentConditionKeys = function () {
            var _a = this.props, uiSchema = _a.uiSchema, formData = _a.formData, formEvent = _a.formEvent;
            var condition = uiSchema["ui:condition"] || {};
            return condition;
        };
        Hoc.prototype.componentWillMount = function () {
            var _a = this.props, formEvent = _a.formEvent, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
            var _b = this.getCurrentConditionKeys().key, key = _b === void 0 ? "" : _b;
            if (key) {
                formEvent.on(["changed"].concat(jpp.parse(key)), this.initConditionWrapper);
                this.initCondition(utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex }), this.getFieldValue());
            }
        };
        Hoc.prototype.componentWillUnmount = function () {
            var formEvent = this.props.formEvent;
            var _a = this.getCurrentConditionKeys().key, key = _a === void 0 ? "" : _a;
            key && formEvent.off(["changed"].concat(jpp.parse(key)).join(""), this.initConditionWrapper);
        };
        Hoc.prototype.initCondition = function (keys, data) {
            console.log(this.getKey());
            var _a = this.getCurrentConditionKeys(), _b = _a.key, key = _b === void 0 ? "" : _b, value = _a.value, _c = _a.opt, opt = _c === void 0 ? "" : _c;
            var _d = (this.state || {}).condition, condition = _d === void 0 ? true : _d;
            if (!opt || !key) {
                return;
            }
            if (!cmp[opt]) {
                return;
            }
            if (cmp[opt](data, value)) {
                return condition && this.setState({
                    condition: false
                });
            }
            this.setState({
                condition: true
            });
        };
        Hoc.prototype.render = function () {
            var _a = (this.state || {}).condition, condition = _a === void 0 ? true : _a;
            if (!condition) {
                return React.createElement("span", { style: { display: "none" } });
            }
            return (React.createElement(Component, __assign({}, this.props)));
        };
        return Hoc;
    }(base_1.HocBase));
};
//# sourceMappingURL=condition.js.map