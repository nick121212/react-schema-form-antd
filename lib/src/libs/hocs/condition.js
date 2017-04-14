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
const jpp = require("json-pointer");
const base_1 = require("./base");
const utils_1 = require("../../utils");
exports.ConditionHoc = (Component, options = {}) => {
    return class Hoc extends base_1.HocBase {
        constructor(props, content) {
            super(props, content);
        }
        getCurrentConditionKeys() {
            const { uiSchema, formData, formEvent } = this.props;
            const condition = uiSchema["ui:condition"] || {};
            return condition;
        }
        componentDidMount() {
            const { formEvent, uiSchema, arrayIndex } = this.props;
            const { key = "", equal = "" } = this.getCurrentConditionKeys();
            if (key) {
                formEvent.on(["changed"].concat(jpp.parse(key)), this.initCondition.bind(this));
                this.initCondition(utils_1.utils.mergeKeys({ uiSchema, arrayIndex }), this.getFieldValue());
            }
        }
        componentWillUnmount() {
            const { formEvent } = this.props;
            const { key = "", equal = "" } = this.getCurrentConditionKeys();
            formEvent.off(["changed"].concat(jpp.parse(key)).join(""), this.initCondition.bind(this));
        }
        initCondition(keys, data) {
            const { key = "", equal = "" } = this.getCurrentConditionKeys();
            if (data !== equal) {
                return this.setState({
                    condition: false
                });
            }
            this.setState({
                condition: true
            });
        }
        render() {
            const { condition = true } = this.state || {};
            if (!condition) {
                return React.createElement("span", { style: { display: "none" } });
            }
            return (React.createElement(Component, __assign({}, this.props)));
        }
    };
};
//# sourceMappingURL=condition.js.map