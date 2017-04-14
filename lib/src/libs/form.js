"use strict";
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
const React = require("react");
const eventemitter2_1 = require("eventemitter2");
const utils_1 = require("../utils");
const merge_1 = require("./core/merge");
class SchemaForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.validateResult = {};
        this.valid = true;
        this.formEvent = new eventemitter2_1.EventEmitter2({ verboseMemoryLeak: false, wildcard: true, maxListeners: 100 });
        this.init();
    }
    validator() {
        this.valid = true;
        this.formEvent.emit("validatorAll");
        return this.valid;
    }
    getData() {
        return this.props.formData;
    }
    init() {
        const { schema, uiSchema, onChange } = this.props;
        this.onChangeAll = (keys, data, uiSchema) => {
            utils_1.utils.saveData({ data, formData: this.props.formData, keys });
            this.formEvent.emit(["changed"].concat(keys), keys, data);
            this.onValidate(keys, data, uiSchema);
            onChange && onChange(keys, data);
        };
        this.formEvent.on(["change", "**"], this.onChangeAll);
        this.onValidate = (keys, data, uiSchema) => {
            let validateResult = utils_1.utils.validateSingle({ keys, data, uiSchema, validateResult: this.validateResult });
            this.valid = this.valid && validateResult.valid;
            if (!validateResult.valid) {
                console.log(validateResult);
            }
            this.formEvent.emit(["setValidator"].concat(keys), keys, validateResult);
        };
        this.formEvent.on(["validator", "**"], this.onValidate);
    }
    componentWillUnmount() {
        this.formEvent.off(["change", "**"].join(''), this.onChangeAll);
        this.formEvent.off(["validator", "**"].join(''), this.onValidate);
    }
    render() {
        const _a = this.props, { schema, uiSchema, children } = _a, extra = __rest(_a, ["schema", "uiSchema", "children"]);
        const { form, options } = merge_1.mergeSchema(schema, uiSchema, null);
        return (React.createElement("span", null,
            utils_1.utils.getTemplateRender(__assign({ schemaForm: this, schema, uiSchemaCombine: form, validateResult: this.validateResult, formEvent: this.formEvent, schemaFormOptions: options }, extra)),
            children));
    }
    static create(Componment) {
        return class SchemaFormHoc extends React.Component {
            proc(method) {
                if (!this.schemaForm) {
                    throw new Error("没有找到SchemaForm");
                }
                return this.schemaForm[method].call(this.schemaForm);
            }
            render() {
                const props = Object.assign({}, this.props, { getData: this.proc.bind(this, "getData"), validator: this.proc.bind(this, "validator") });
                return (React.createElement(Componment, __assign({}, props),
                    React.createElement(SchemaForm, { ref: (element) => { this.schemaForm = element; }, schema: props.schema, uiSchema: props.uiSchema, onChange: props.onChange, form: props.form, formData: props.formData, globalOptions: props.globalOptions }, props.children)));
            }
        };
    }
}
exports.SchemaForm = SchemaForm;
//# sourceMappingURL=form.js.map