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
const utils_1 = require("../../utils");
const base_1 = require("./base");
exports.TempHoc = (Component, options = {}) => {
    return class Hoc extends base_1.HocBase {
        constructor(props, content) {
            super(props, content);
        }
        render() {
            const _a = this.props, { uiSchema } = _a, extra = __rest(_a, ["uiSchema"]);
            const TempComponents = utils_1.utils.getTemplate(uiSchema);
            return TempComponents.reduce((prev, CurComponent) => {
                let component = React.createElement(CurComponent, __assign({ key: Date.now() + Math.random(), uiSchema: uiSchema }, extra), prev);
                return component;
            }, React.createElement(Component, __assign({}, this.props)));
        }
    };
};
//# sourceMappingURL=temp.js.map