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
            formEvent.emit(["validator"].concat(keys), keys, this.getFieldValue(), uiSchema);
        }).bind(this);
        formEvent.on("validatorAll", this.onChangeEvent);
    }
    componentWillMount() {
        console.log("base mount");
    }
    componentWillUnmount() {
        const { formEvent } = this.props;
        formEvent.off("validatorAll", this.onChangeEvent);
        console.log("unmount fields");
    }
}
exports.BaseField = BaseField;
//# sourceMappingURL=base.js.map