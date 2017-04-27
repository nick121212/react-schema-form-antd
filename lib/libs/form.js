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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var eventemitter2_1 = require("eventemitter2");
var utils_1 = require("../utils");
var merge_1 = require("./core/merge");
var SchemaForm = (function (_super) {
    __extends(SchemaForm, _super);
    function SchemaForm(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.validateResult = {};
        _this.valid = true;
        _this.formEvent = new eventemitter2_1.EventEmitter2({ verboseMemoryLeak: false, wildcard: true, maxListeners: 100 });
        _this.init();
        return _this;
    }
    SchemaForm.prototype.validator = function () {
        this.valid = true;
        this.formEvent.emit("validatorAll");
        return this.valid;
    };
    SchemaForm.prototype.setData = function (keys, val) {
        var _this = this;
        this.formEvent["emitAsync"](["setData"].concat(keys), val).then(function (results) {
            if (!results || !results.length) {
                utils_1.utils.saveData({ data: val, formData: _this.props.formData, keys: keys });
            }
        });
    };
    SchemaForm.prototype.getData = function () {
        return this.props.formData;
    };
    SchemaForm.prototype.init = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, onChange = _a.onChange;
        this.onChangeAll = function (keys, data, uiSchema) {
            var validateResult = _this.onValidate(keys, data, uiSchema);
            utils_1.utils.saveData({ data: data, formData: _this.props.formData, keys: keys });
            _this.formEvent.emit(["changed"].concat(keys), keys, data);
            onChange && onChange(keys, data);
        };
        this.onValidate = function (keys, data, uiSchema) {
            var validateResult = utils_1.utils.validateSingle({ keys: keys, data: data, uiSchema: uiSchema, validateResult: _this.validateResult });
            _this.valid = _this.valid && validateResult.valid;
            if (!validateResult.valid) {
                console.log(keys.join('.'), data, validateResult);
            }
            _this.formEvent.emit(["setValidator"].concat(keys), keys, validateResult);
            return validateResult;
        };
        this.formEvent.on(["change", "**"], this.onChangeAll);
        this.formEvent.on(["validator", "**"], this.onValidate);
    };
    SchemaForm.prototype.componentWillUnmount = function () {
        this.formEvent.off(["change", "**"].join(''), this.onChangeAll);
        this.formEvent.off(["validator", "**"].join(''), this.onValidate);
    };
    SchemaForm.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, children = _a.children, extra = __rest(_a, ["schema", "uiSchema", "children"]);
        var _b = merge_1.mergeSchema(schema, uiSchema, null), form = _b.form, options = _b.options;
        return (React.createElement("span", null,
            utils_1.utils.getTemplateRender(__assign({ schemaForm: this, schema: schema, uiSchemaCombine: form, validateResult: this.validateResult, formEvent: this.formEvent, schemaFormOptions: options }, extra)),
            children));
    };
    SchemaForm.create = function (Componment) {
        var count = 0;
        return (function (_super) {
            __extends(SchemaFormHoc, _super);
            function SchemaFormHoc() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SchemaFormHoc.prototype.componentWillMount = function () {
                this.key = "schemaForm-" + count++;
                console.log(this.key);
            };
            SchemaFormHoc.prototype.proc = function (method) {
                if (!this.schemaForm) {
                    throw new Error("没有找到SchemaForm");
                }
                return this.schemaForm[method].call(this.schemaForm);
            };
            SchemaFormHoc.prototype.render = function () {
                var _this = this;
                var props = Object.assign({}, this.props, { getData: this.proc.bind(this, "getData"), validator: this.proc.bind(this, "validator"), setData: this.proc.bind(this, "setData") });
                return (React.createElement(Componment, __assign({}, props),
                    React.createElement(SchemaForm, { ref: function (ele) { _this.schemaForm = ele; }, schema: this.props.schema, uiSchema: this.props.uiSchema, onChange: this.props.onChange, form: this.props.form, formData: this.props.formData || {}, globalOptions: this.props.globalOptions }, this.props.children)));
            };
            return SchemaFormHoc;
        }(React.Component));
    };
    return SchemaForm;
}(React.Component));
exports.SchemaForm = SchemaForm;
//# sourceMappingURL=form.js.map