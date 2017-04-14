"use strict";
const utils_1 = require("../../utils");
const base_1 = require("../base");
class BaseField extends base_1.SchemaFormBase {
    constructor(props, context) {
        super(props, context);
        this.init();
    }
    init() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        this.onChangeEvent = (() => {
            const { uiSchema, formEvent } = this.props;
            formEvent.emit(["change"].concat(keys), keys, this.getFieldValue(), uiSchema);
        }).bind(this);
        formEvent.on("validatorAll", this.onChangeEvent);
    }
    componentWillUnmount() {
        const { formEvent } = this.props;
        formEvent.removeListener("validatorAll", this.onChangeEvent);
    }
}
exports.BaseField = BaseField;
//# sourceMappingURL=base.js.map