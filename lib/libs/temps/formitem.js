"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const antd_1 = require("antd");
const jpp = require("json-pointer");
const utils_1 = require("../../utils");
class FormItemTemp extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex }), key = utils_1.utils.compileKeys({ uiSchema, arrayIndex });
        this.onValidatorEvent = ((ekey, err) => {
            this.setState({
                date: Date.now()
            });
        }).bind(this);
        formEvent.on(["validator"].concat(keys), this.onValidatorEvent);
    }
    componentWillUnmount() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex }), key = utils_1.utils.compileKeys({ uiSchema, arrayIndex });
        formEvent.off(["validator"].concat(keys).join('.'), this.onValidatorEvent);
    }
    render() {
        const { uiSchema, children, arrayIndex, globalOptions = {}, validateResult } = this.props;
        const options = uiSchema["ui:options"] || {};
        const key = utils_1.utils.compileKeys({ uiSchema, arrayIndex });
        const { error = null, dirty = false, invalid = true } = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {};
        const { hasFeedback = false } = options.formItem || {};
        let props = {};
        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }
        return (React.createElement(antd_1.Form.Item, __assign({}, globalOptions.formItem, { required: uiSchema.required, label: uiSchema.title, extra: uiSchema.description, help: error ? error.message : "", hasFeedback: dirty && hasFeedback }, props, globalOptions.formItem, options.formItem), children));
    }
}
exports.FormItemTemp = FormItemTemp;
//# sourceMappingURL=formitem.js.map