"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const react_dom_1 = require("react-dom");
const index_1 = require("../src/index");
const formData = { username: "nick", password: "111111", shipping_address: [], test: false };
const schema = {
    "$schema": "http://json-schema.org/react-schema-form-antd/schema#",
    "definitions": {
        "address": {
            "type": "object",
            "properties": {
                "street_address": { "type": "string" },
                "city": { "type": "string" },
                "state": { "type": "string" }
            },
            "required": ["street_address", "city", "state"]
        }
    },
    "title": "用户登录",
    "type": "object",
    "required": ["username", "password"],
    "properties": {
        "address1": { "$ref": "#/definitions/address" },
        "username": {
            "type": "string",
            "title": "用户名",
            "minLength": 5,
            "description": "请使用公司邮箱进行登录"
        },
        "password": {
            "type": "string",
            "title": "密码"
        },
        "names": {
            "type": "array",
            "title": "名称",
            "items": {
                "type": "string",
                "title": "名称"
            }
        },
        "roles": {
            "type": "array",
            "title": "权限",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "权限名称"
                    },
                    "isUsed": {
                        "type": "boolean",
                        "title": "是否启用"
                    },
                    "test": {
                        "type": "array",
                        "title": "测试",
                        "items": {
                            "type": "object",
                            "properties": {
                                "test1": {
                                    "type": "string"
                                },
                                "test2": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
const uiSchema = [{
        "ui:temp": "card",
        "title": "测试",
        "ui:options": {
            "card": { "bordered": false }
        },
        "items": [{
                "key": "shipping_address",
                "items": [{
                        "key": "shipping_address/city",
                        "ui:temp": ["formitem"],
                        "ui:widget": "input"
                    }, {
                        "key": "shipping_address/street_address"
                    }, {
                        "key": "shipping_address/state"
                    }, {
                        "key": "shipping_address/address",
                        "ui:options": {
                            "card": { "bordered": false }
                        },
                    }]
            }]
    }];
const schema1 = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
        "address": {
            "type": "object",
            "title": "地址",
            "x-schema-form": {
                "ui:options": {
                    "card": { "bordered": false }
                },
            },
            "properties": {
                "street_address": {
                    "type": "string",
                    "x-schema-form": {
                        "ui:temp": ["formitem"]
                    }
                },
                "city": {
                    "type": "string",
                    "x-schema-form": {
                        "ui:condition": "",
                        "ui:temp": ["formitem"]
                    }
                },
                "state": {
                    "type": "string",
                    "x-schema-form": {
                        "ui:temp": ["formitem"]
                    }
                },
                "subAaddress": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/address"
                    }
                }
            },
            "required": ["street_address", "city", "state"]
        }
    },
    "type": "object",
    "required": [],
    "properties": {
        "shipping_address": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/address"
            }
        },
        "names": {
            "type": "array",
            "title": "名称",
            "required": ["names"],
            "items": {
                "type": "string",
                "title": "名称"
            }
        },
    }
};
const ddd = [{
        "ui:temp": "card",
        "title": "测试",
        "ui:options": {
            "card": { "bordered": false }
        },
        "items": [{
                "key": "shipping_address",
                "items": [{
                        "key": "shipping_address/",
                        "items": [{
                                "key": "shipping_address//city"
                            }, {
                                "key": "shipping_address//street_address"
                            }, {
                                "key": "shipping_address//state"
                            }]
                    }]
            }, {
                "key": "names",
                "items": [{
                        "key": "names/",
                        "ui:temp": ["default"],
                    }]
            }]
    }];
const onChange = (keys, data) => {
    console.group();
    console.info(keys.join("."), data);
    console.log(formData);
    console.groupEnd();
};
const antd_1 = require("antd");
class AntSchemaFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { schema, uiSchema, globalOptions = {}, onSubmit, formOptions = {}, children, loading } = this.props;
        return (React.createElement(antd_1.Form, __assign({ onSubmit: this.handleSubmit.bind(this) }, formOptions), children));
    }
    handleSubmit(e) {
        const { onSubmit, schemaForm } = this.props;
        e.preventDefault();
        if (this.props.validator()) {
            onSubmit && onSubmit(this.props.getData());
        }
    }
}
exports.AntSchemaForm = index_1.SchemaForm.create(AntSchemaFormComponent);
function onSubmit(data) {
    console.log("submit:", data);
}
react_dom_1.render(React.createElement("div", null,
    React.createElement(exports.AntSchemaForm, { onSubmit: onSubmit, schema: schema1, uiSchema: ddd, formData: formData, onChange: onChange },
        React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "\u786E\u5B9A"))), document.getElementById('root'));
//# sourceMappingURL=index.js.map