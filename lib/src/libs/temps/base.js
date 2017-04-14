"use strict";
const utils_1 = require("../../utils");
const base_1 = require("../base");
const jpp = require("json-pointer");
class BaseTemp extends base_1.SchemaFormBase {
    constructor(props, context) {
        super(props, context);
    }
    init() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        this.onValidatorEvent = ((ekey, err) => {
            this.forceUpdate();
        }).bind(this);
        formEvent.on(["setValidator"].concat(keys), this.onValidatorEvent);
    }
    getErrorInfo() {
        const { uiSchema, children, arrayIndex, globalOptions = {}, validateResult } = this.props;
        const options = uiSchema["ui:options"] || {};
        const key = this.getKey();
        const { error = null, dirty = false, invalid = true } = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {};
        const { hasFeedback = false } = options.formItem || {};
        let props = {};
        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }
        return { dirty, invalid, error };
    }
    componentWillUnmount() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        formEvent.off(["setValidator"].concat(keys).join('.'), this.onValidatorEvent);
    }
}
exports.BaseTemp = BaseTemp;
//# sourceMappingURL=base.js.map