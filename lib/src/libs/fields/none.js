"use strict";
const React = require("react");
const base_1 = require("./base");
class NoneField extends base_1.BaseField {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (React.createElement("span", null, this.props.children));
    }
}
exports.NoneField = NoneField;
//# sourceMappingURL=none.js.map