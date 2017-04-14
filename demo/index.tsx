import * as React from 'react';
import { render } from 'react-dom';
import { SchemaForm } from '../src/index';
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

const onChange = (keys: Array<string>, data: any) => {
    console.group();
    console.info(keys.join("."), data);
    console.log(formData);
    console.groupEnd();
}
import { Form, Button } from 'antd';

interface IProps {
    loading?: boolean;
    validator?: () => void;
    getData?: () => any;
}


export interface IAntdSchemaFromProps {
    formData?: any;
    schema: tv4.JsonSchema;
    uiSchema: any;
    globalOptions?: any;

    schemaForm?: SchemaForm;

    form?: any;
    onSubmit?: (fomData: any) => void;
    formOptions?: any;
}

/**
 * 基于antd的schemaForm
 */
class AntSchemaFormComponent extends React.Component<IProps & IAntdSchemaFromProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    /**
     * 描绘界面
     */
    render() {
        const { schema, uiSchema, globalOptions = {}, onSubmit, formOptions = {}, children, loading } = this.props;

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} {...formOptions}>
                {children}
            </Form>
        );
    }

    /**
     * 提交表单
     * @param formData 数据
     * @param e        Event
     */
    handleSubmit(e: Event) {
        const { onSubmit, schemaForm } = this.props;

        e.preventDefault();
        if (this.props.validator()) {
            onSubmit && onSubmit(this.props.getData());
        }
    }
}

export const AntSchemaForm = SchemaForm.create(AntSchemaFormComponent);

function onSubmit(data) {
    console.log("submit:", data);
}

render(
    <div>
        <AntSchemaForm onSubmit={onSubmit} schema={schema1} uiSchema={ddd} formData={formData} onChange={onChange} >
            <Button type="primary" htmlType="submit">确定</Button>
        </AntSchemaForm>
    </div>,
    document.getElementById('root')
);