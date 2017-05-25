"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tv4 = require("tv4");
var formats = require("tv4-formats");
var validator = require("validator");
var tv4Validator = tv4.freshApi();
tv4Validator.addFormat(formats);
tv4Validator.addFormat("mobile", function (data, schema) {
    if (validator.isMobilePhone(data, "zh-CN")) {
        return null;
    }
    return { code: 10003 };
});
tv4Validator.addFormat("json", function (data, schema) {
    if (validator.isJSON(data)) {
        return null;
    }
    return { code: 10004 };
});
tv4Validator.addFormat("url-ip", function (data, schema) {
    if (validator.isURL(data)) {
        return null;
    }
    return { code: 10005 };
});
tv4Validator.addFormat("ip", function (data, schema) {
    if (validator.isIP(data)) {
        return null;
    }
    return { code: 10006 };
});
function validate(form, value) {
    if (!form) {
        return { valid: true, error: null, missing: null };
    }
    ;
    var schema = form.schema;
    if (!schema) {
        return { valid: true, error: null, missing: null };
    }
    ;
    if (value === '') {
        value = undefined;
    }
    ;
    if (form.schema.type === 'number' && value === undefined) {
        value = undefined;
    }
    ;
    if (form.schema.type === 'array' && !value) {
        value = [];
    }
    ;
    var wrap = { type: 'object', 'properties': {}, required: undefined };
    var propName = form.key[form.key.length - 1];
    wrap.properties[propName] = schema;
    if (form.required) {
        wrap.required = [propName];
    }
    ;
    var valueWrap = {};
    if (value != undefined && value != null) {
        valueWrap[propName] = value;
    }
    return tv4Validator.validateResult(valueWrap, wrap);
}
exports.validate = validate;
;
//# sourceMappingURL=validate.js.map