"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../utils");
var base_1 = require("./base");
exports.TempHoc = function (Component) {
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            return _super.call(this, props, content) || this;
        }
        Hoc.prototype.render = function () {
            var _a = this.props, uiSchema = _a.uiSchema, extra = __rest(_a, ["uiSchema"]);
            var TempComponents = utils_1.utils.getTemplate(uiSchema, extra.globalOptions);
            return TempComponents.reduce(function (prev, CurComponent) {
                var component = React.createElement(CurComponent, __assign({ key: Date.now() + Math.random(), uiSchema: uiSchema }, extra), prev);
                return component;
            }, React.createElement(Component, __assign({}, this.props)));
        };
        return Hoc;
    }(base_1.HocBase));
};
//# sourceMappingURL=temp.js.map