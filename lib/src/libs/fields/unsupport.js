"use strict";
const React = require("react");
class UnSupportField extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { uiSchema } = this.props;
        return (React.createElement("div", { className: "unsupported-field" },
            "Unsupported field schema ",
            JSON.stringify(uiSchema, null, 2),
            "."));
    }
}
exports.UnSupportField = UnSupportField;
//# sourceMappingURL=unsupport.js.map