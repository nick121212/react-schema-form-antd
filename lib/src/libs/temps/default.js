"use strict";
const React = require("react");
const base_1 = require("./base");
class DefaultTemp extends base_1.BaseTemp {
    constructor(props, context) {
        super(props, context);
        this.init();
    }
    render() {
        const { schema, uiSchema, globalOptions = {}, children } = this.props;
        const options = uiSchema["ui:options"] || {};
        const { error, invalid, dirty } = this.getErrorInfo();
        return (React.createElement("span", null,
            children,
            invalid && dirty && error.message + this.getKey()));
    }
}
exports.DefaultTemp = DefaultTemp;
//# sourceMappingURL=default.js.map