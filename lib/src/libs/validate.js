"use strict";
const tv4 = require("tv4");
const formats = require("tv4-formats");
const validator = require("validator");
const tv4Validator = tv4.freshApi();
tv4Validator.addFormat(formats);
tv4Validator.addFormat("mobile", (data, schema) => {
    if (validator.isMobilePhone(data, "zh-CN")) {
        return null;
    }
    return { code: 10003 };
});
tv4Validator.addFormat("json", (data, schema) => {
    if (validator.isJSON(data)) {
        return null;
    }
    return { code: 10004 };
});
tv4Validator.addFormat("url-ip", (data, schema) => {
    if (validator.isURL(data)) {
        return null;
    }
    return { code: 10005 };
});
tv4Validator.addFormat("ip", (data, schema) => {
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
    let schema = form.schema;
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
    let wrap = { type: 'object', 'properties': {}, required: undefined };
    let propName = form.key[form.key.length - 1];
    wrap.properties[propName] = schema;
    if (form.required) {
        wrap.required = [propName];
    }
    ;
    let valueWrap = {};
    if (!!value) {
        valueWrap[propName] = value;
    }
    ;
    return tv4Validator.validateResult(valueWrap, wrap);
}
exports.validate = validate;
;
//# sourceMappingURL=validate.js.map