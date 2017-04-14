"use strict";
const utils_1 = require("../../utils");
const base_1 = require("../base");
class BaseWidget extends base_1.SchemaFormBase {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        this.onChangedEvent = ((value) => {
        }).bind(this);
        formEvent.on(["changed"].concat(keys), this.onChangedEvent);
    }
    componentWillUnmount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils_1.utils.mergeKeys({ uiSchema, arrayIndex });
        formEvent.off(["changed"].concat(keys).join('.'), this.onChangedEvent);
    }
    triggerEvent(name, ...args) {
        const { formEvent } = this.props;
        formEvent.emit(name, ...args);
    }
    setDefaultProps() {
        const { value = null } = this.state || {};
        return {
            value: value
        };
    }
}
exports.BaseWidget = BaseWidget;
//# sourceMappingURL=base.js.map