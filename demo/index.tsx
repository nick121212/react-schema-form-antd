import * as React from 'react';
import { render } from 'react-dom';
import { SchemaForm } from '../src/index';

import 'antd/dist/antd.css';

const formData = {
    publish_policy: ["1"]
};
let a = {
    schema: {
        "type": "object",
        "required": ["name", "rollback_flow"],
        "properties": {
            "trigger_day": {
                "type": "number"
            },
            "trigger_time": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "flows": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            },
            "trigger_mode": {
                "type": "number",
                "enum": [0, 1, 2, 3, 4]

            },
            "rollback_flow": {
                "type": "number"
            }
        }
    },
    uiSchema: ["name", {
        "key": "trigger_mode",
        "ui:widget": "number",
        "titleMap": [
            { label: "立即执行", value: 0 },
            { label: "定时执行", value: 1 },
            { label: "每天执行", value: 2 },
            { label: "每周执行", value: 3 },
            { label: "每月执行", value: 4 }
        ],

    }, {
            "key": "trigger_day",
            "ui:condition": {
                "key": "/trigger_mode",
                "opt": "eqeqeq",
                "value": 3
            },
            "ui:options": {
                "widget": {
                    "inputnumber": {
                        "min": 1,
                        "max": 7
                    }
                }
            }
        }, {
            "key": "trigger_day",
            "ui:condition": {
                "key": "/trigger_mode",
                "opt": "eq",
                "value": 4
            },
            "ui:options": {
                "widget": {
                    "inputnumber": {
                        "min": 1,
                        "max": 28
                    }
                }
            }
        }, {
            "key": "trigger_time",
            "ui:widget": "datepicker",
            "ui:condition": {
                "key": "/trigger_mode",
                "opt": "eq",
                "value": 0
            },
        }, {
            "key": "flows"
        }, {
            "key": "rollback_flow"
        }],
    globalOptions: {
        "ui:temp": "formitem",
        "formItem": {
            "labelCol": {
                "xs": { "span": 24 },
                "sm": { "span": 6 },
            },
            "wrapperCol": {
                "xs": { "span": 24 },
                "sm": { "span": 14 },
            }
        }
    }
};

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
        <AntSchemaForm onSubmit={onSubmit} schema={a.schema} uiSchema={a.uiSchema} globalOptions={a.globalOptions} formData={formData} onChange={onChange} >
            <Button type="primary" htmlType="submit">确定</Button>
        </AntSchemaForm>
    </div>,
    document.getElementById('root'),
    () => {

    }
);