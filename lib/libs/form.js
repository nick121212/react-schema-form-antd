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
class SchemaForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.validateResult = {};
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
            let validateResult = utils_1.utils.validateSingle({ keys, data, uiSchema, validateResult: this.validateResult });
            utils_1.utils.saveData({ data, formData: this.props.formData, keys });
            this.valid = this.valid && validateResult.valid;
            this.formEvent.emit(["validator"].concat(keys), keys, validateResult);
            this.formEvent.emit(["changed"].concat(keys), data);
        };
        this.formEvent.on(["change", "**"], this.onChangeAll);
    }
    componentWillUnmount() {
        this.formEvent.off(["change", "**"].join(''), this.onChangeAll);
    }
    render() {
        const _a = this.props, { schema, uiSchema, children } = _a, extra = __rest(_a, ["schema", "uiSchema", "children"]);
        const uiSchemaCombine = utils_1.utils.getUiOptions(schema, uiSchema);
        return (React.createElement("span", null,
            utils_1.utils.getTemplateRender(__assign({ schemaForm: this, schema, uiSchemaCombine, validateResult: this.validateResult, formEvent: this.formEvent }, extra)),
            children));
    }
    static create(Componment) {
        let count = 0;
        return class SchemaFormHoc extends React.Component {
            proc(key, method) {
                let schemaForm = this.refs[key];
                if (!schemaForm) {
                    throw new Error("没有找到SchemaForm");
                }
                return schemaForm[method].call(schemaForm);
            }
            componentWillMount() {
                this.key = "schemaForm-" + count++;
            }
            render() {
                const props = Object.assign({}, this.props, { getData: this.proc.bind(this, this.key, "getData"), validator: this.proc.bind(this, this.key, "validator") });
                return (React.createElement(Componment, __assign({}, props),
                    React.createElement(SchemaForm, { ref: this.key, schema: props.schema, uiSchema: props.uiSchema, form: props.form, formData: props.formData, globalOptions: props.globalOptions }, props.children)));
            }
        };
    }
}
exports.SchemaForm = SchemaForm;
//# sourceMappingURL=form.js.map