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
var keyBy = require("lodash.keyby");
var utils_1 = require("../../utils");
var base_1 = require("./base");
exports.TriggerHoc = function (Component) {
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            return _super.call(this, props, content) || this;
        }
        Hoc.prototype.handleTrigger = function (value) {
            var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent, formData = _a.formData, schemaForm = _a.schemaForm;
            var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
            var _b = (this.state || {}).text, text = _b === void 0 ? undefined : _b;
            var _c = uiSchema["ui:trigger"], _d = _c.prop, prop = _d === void 0 ? "" : _d, _e = _c.trigger, trigger = _e === void 0 ? null : _e, _f = _c.always, always = _f === void 0 ? false : _f;
            var _g = uiSchema["ui:data"] || {}, _h = _g.path, path = _h === void 0 ? "" : _h, _j = _g.idField, idField = _j === void 0 ? "" : _j, _k = _g.labelField, labelField = _k === void 0 ? "" : _k;
            if (always || (value != text && trigger)) {
                this.timeId && clearTimeout(this.timeId);
                this.timeId = setTimeout(function () {
                    formEvent.emit(["triggerEvent"].concat(keys), {
                        loading: true,
                        clearValue: true,
                        value: undefined,
                        text: value
                    });
                    trigger(value, schemaForm).then(function (dataSource) {
                        utils_1.utils.setUiData(uiSchema, formData, keyBy(dataSource, idField));
                        formEvent.emit(["triggerEvent"].concat(keys), {
                            dataSource: utils_1.utils.getOptions(dataSource, idField, labelField),
                            loading: false
                        });
                    });
                }, 300);
                return true;
            }
            return false;
        };
        Hoc.prototype.render = function () {
            var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
            var _b = uiSchema["ui:trigger"] || {}, _c = _b.prop, prop = _c === void 0 ? "" : _c, _d = _b.trigger, trigger = _d === void 0 ? null : _d, props = {};
            if (prop && trigger) {
                props[prop] = this.handleTrigger.bind(this);
            }
            return React.createElement(Component, __assign({}, this.props, { triggerProps: props }));
        };
        return Hoc;
    }(base_1.HocBase));
};
//# sourceMappingURL=trigger.js.map