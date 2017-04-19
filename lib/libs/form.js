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
    SchemaForm.prototype.getData = function () {
        return this.props.formData;
    };
    SchemaForm.prototype.init = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, onChange = _a.onChange;
        this.onChangeAll = function (keys, data, uiSchema) {
            utils_1.utils.saveData({ data: data, formData: _this.props.formData, keys: keys });
            _this.formEvent.emit(["changed"].concat(keys), keys, data);
            _this.onValidate(keys, data, uiSchema);
            onChange && onChange(keys, data);
        };
        this.formEvent.on(["change", "**"], this.onChangeAll);
        this.onValidate = function (keys, data, uiSchema) {
            var validateResult = utils_1.utils.validateSingle({ keys: keys, data: data, uiSchema: uiSchema, validateResult: _this.validateResult });
            _this.valid = _this.valid && validateResult.valid;
            if (!validateResult.valid) {
                console.log(validateResult);
            }
            _this.formEvent.emit(["setValidator"].concat(keys), keys, validateResult);
        };
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
            };
            SchemaFormHoc.prototype.proc = function (method) {
                var schemaForm = this.refs[this.key];
                if (!schemaForm) {
                    throw new Error("没有找到SchemaForm");
                }
                return schemaForm[method].call(schemaForm);
            };
            SchemaFormHoc.prototype.render = function () {
                var props = Object.assign({}, this.props, { getData: this.proc.bind(this, "getData"), validator: this.proc.bind(this, "validator") });
                return (React.createElement(Componment, __assign({}, props),
                    React.createElement(SchemaForm, { ref: this.key, schema: props.schema, uiSchema: props.uiSchema, onChange: props.onChange, form: props.form, formData: props.formData || {}, globalOptions: props.globalOptions }, props.children)));
            };
            return SchemaFormHoc;
        }(React.Component));
    };
    return SchemaForm;
}(React.Component));
exports.SchemaForm = SchemaForm;
//# sourceMappingURL=form.js.map