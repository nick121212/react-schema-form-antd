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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var jpp = require("json-pointer");
var utils_1 = require("../utils");
var SchemaFormBase = (function (_super) {
    __extends(SchemaFormBase, _super);
    function SchemaFormBase(props, context) {
        return _super.call(this, props, context) || this;
    }
    SchemaFormBase.prototype.getFieldValue = function () {
        var schemaForm = this.props.schemaForm, key = this.getKey(), formData = schemaForm.getData(), obj = jpp(formData);
        if (obj.has(key)) {
            return obj.get(key);
        }
        return undefined;
    };
    SchemaFormBase.prototype.getFieldValueForKeys = function (keys) {
        var schemaForm = this.props.schemaForm, formData = schemaForm.getData(), obj = jpp(formData), key = jpp.compile(keys);
        if (obj.has(key)) {
            return obj.get(key);
        }
        return undefined;
    };
    SchemaFormBase.prototype.swapItems = function (arr, indexOld, indexNew) {
        arr[indexOld] = arr.splice(indexNew, 1, arr[indexOld])[0];
        return arr;
    };
    SchemaFormBase.prototype.swapObjectItems = function (obj, indexOld, indexNew) {
        var swap = obj[indexOld] || {};
        obj[indexOld] = obj[indexNew] || {};
        obj[indexNew] = swap;
    };
    SchemaFormBase.prototype.canUp = function (arr, index) {
        return index > 0;
    };
    SchemaFormBase.prototype.canDown = function (arr, index) {
        return arr.length > index + 1;
    };
    SchemaFormBase.prototype.up = function (arr, index) {
        if (this.canUp(arr, index)) {
            this.swapItems(arr, index, index - 1);
        }
    };
    SchemaFormBase.prototype.down = function (arr, index) {
        if (this.canDown(arr, index)) {
            this.swapItems(arr, index, index + 1);
        }
    };
    SchemaFormBase.prototype.getKey = function () {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        return utils_1.utils.compileKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
    };
    SchemaFormBase.prototype.triggerEvent = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formEvent = this.props.formEvent;
        formEvent.emit.apply(formEvent, [name].concat(args));
    };
    SchemaFormBase.prototype.setData = function (val) {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        this.triggerEvent(["change"].concat(keys), keys, val, uiSchema);
        return true;
    };
    return SchemaFormBase;
}(React.Component));
exports.SchemaFormBase = SchemaFormBase;
new SchemaFormBase(null, null);
//# sourceMappingURL=base.js.map