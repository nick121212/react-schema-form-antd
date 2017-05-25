"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var select_1 = require("./select");
var text_1 = require("./text");
var fieldset_1 = require("./fieldset");
var number_1 = require("./number");
var checkbox_1 = require("./checkbox");
var checkboxes_1 = require("./checkboxes");
var array_1 = require("./array");
var mutiselect_1 = require("./mutiselect");
exports.createDefaults = function () {
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