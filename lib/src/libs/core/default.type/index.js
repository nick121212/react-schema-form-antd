"use strict";
const select_1 = require("./select");
const text_1 = require("./text");
const fieldset_1 = require("./fieldset");
const number_1 = require("./number");
const checkbox_1 = require("./checkbox");
const checkboxes_1 = require("./checkboxes");
const array_1 = require("./array");
const mutiselect_1 = require("./mutiselect");
exports.createDefaults = () => {
    return {
        string: [select_1.select, text_1.text],
        object: [fieldset_1.fieldset],
        number: [number_1.number],
        integer: [number_1.integer],
        boolean: [checkbox_1.checkbox],
        array: [checkboxes_1.checkboxes, array_1.array, mutiselect_1.mutiSelect]
    };
};
//# sourceMappingURL=index.js.map