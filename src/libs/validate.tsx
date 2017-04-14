
import * as tv4 from "tv4";
import * as formats from 'tv4-formats';
import * as validator from 'validator';

const tv4Validator = tv4.freshApi();

/**
 * 加入常规的验证方法
 */
tv4Validator.addFormat(formats);

/**
 * 验证手机
 */
tv4Validator.addFormat("mobile", (data, schema): any => {
    if (validator.isMobilePhone(data, "zh-CN")) {
        return null;
    }

    return { code: 10003 };
});

/**
 * 验证json
 */
tv4Validator.addFormat("json", (data, schema): any => {
    if (validator.isJSON(data)) {
        return null;
    }

    return { code: 10004 };
});

/**
 * 验证ip和url
 */
tv4Validator.addFormat("url-ip", (data, schema): any => {
    if (validator.isURL(data)) {
        return null;
    }
    return { code: 10005 };
});

/**
 * 验证ip
 */
tv4Validator.addFormat("ip", (data, schema): any => {
    if (validator.isIP(data)) {
        return null;
    }
    return { code: 10006 };
});

// tv4Validator.setErrorReporter(function (error, data, schema) {
//     return "Error code: " + error.code;
// });

/**
 * 验证数据.
 * value必须是一个有效的数据
 *
 * @param {Object} form 合并后的数据，schema和uiSchema
 * @param {Any} value 需要验证的数据
 * @return {Object} 返回tv4的单个验证数据.
 */
export function validate(form, value): tv4.SingleResult {
    if (!form) {
        return { valid: true, error: null, missing: null };
    };

    let schema = form.schema;
    if (!schema) {
        return { valid: true, error: null, missing: null };
    };

    // string类型，类似input，textarea会返回一个空字符串
    // 如果是空，tv4验证的时候会返回成功
    // 这时候会违反'required'的验证规则,所以需要做处理
    if (value === '') {
        value = undefined;
    };

    // number类型会返回一个null的数据，这里需要做处理
    if (form.schema.type === 'number' && value === undefined) {
        value = undefined;
    };

    // array类型会返回一个null的数据，这里需要做处理
    if (form.schema.type === 'array' && !value) {
        value = [];
    };

    // JSON Schema的第四版本的${REQUIRED}字段不是配置在他同级的json里面
    // 所以我们需要自定义验证JSON
    let wrap = { type: 'object', 'properties': {}, required: undefined };
    let propName = form.key[form.key.length - 1];

    wrap.properties[propName] = schema;
    if (form.required) {
        wrap.required = [propName];
    };

    let valueWrap = {};
    if (!!value) {
        valueWrap[propName] = value;
    };

    return tv4Validator.validateResult(valueWrap, wrap);
};