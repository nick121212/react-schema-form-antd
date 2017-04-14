"use strict";
const React = require("react");
const jpp = require("json-pointer");
const utils_1 = require("../utils");
class SchemaFormBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    getFieldValue() {
        const { schemaForm } = this.props, key = this.getKey(), formData = schemaForm.getData(), obj = jpp(formData);
        if (obj.has(key)) {
            return obj.get(key);
        }
        return null;
    }
    swapItems(arr, indexOld, indexNew) {
        arr[indexOld] = arr.splice(indexNew, 1, arr[indexOld])[0];
        return arr;
    }
    swapObjectItems(obj, indexOld, indexNew) {
        let swap = obj[indexOld] || {};
        obj[indexOld] = obj[indexNew] || {};
        obj[indexNew] = swap;
    }
    canUp(arr, index) {
        return index > 0;
    }
    canDown(arr, index) {
        return arr.length > index + 1;
    }
    up(arr, index) {
        if (this.canUp(arr, index)) {
            this.swapItems(arr, index, index - 1);
        }
    }
    down(arr, index) {
        if (this.canDown(arr, index)) {
            this.swapItems(arr, index, index + 1);
        }
    }
    getKey() {
        const { uiSchema, arrayIndex } = this.props;
        return utils_1.utils.compileKeys({ uiSchema, arrayIndex });
    }
}
exports.SchemaFormBase = SchemaFormBase;
//# sourceMappingURL=base.js.map