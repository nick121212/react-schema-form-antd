"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumToTitleMap = function (enm) {
    var titleMap = [];
    enm.forEach(function (name) {
        titleMap.push({ name: name, value: name, label: name });
    });
    return titleMap;
};
exports.stdFormObj = function (name, schema, options) {
    options = options || {};
    var f = options.global && options.global.formDefaults ?
        Object.assign({}, options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
        f.title = schema.title;
    }
    else {
        f.title = schema.title || name;
    }
    if (schema.description) {
        f.description = schema.description;
    }
    if (options.required === true) {
        f.required = true;
    }
    if (schema.maxLength) {
        f.maxlength = schema.maxLength;
    }
    if (schema.minLength) {
        f.minlength = schema.minLength;
    }
    if (schema.readonly) {
        f.readonly = true;
    }
    if (schema.minimum) {
        f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
    }
    if (schema.maximum) {
        f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
    }
    if (schema.validationMessage) {
        f.validationMessage = schema.validationMessage;
    }
    f.schema = schema;
    return f;
};
//# sourceMappingURL=utils.js.map