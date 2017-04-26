import * as React from 'react';
import { render } from 'react-dom';
import { SchemaForm } from '../src/index';

import 'antd/dist/antd.css';

const formData = {

};

let a = {
    schema: {
        "type": "object",
        "required": ["job_name", "project_id", "tag", "code_way"],
        "properties": {
            "project_id": { type: "number" },
            "detail": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": ["url", "md5"],
                    "properties": {
                        "site_name": {
                            "type": "string"
                        },
                        "url": {
                            "type": "string"
                        },

                        "md5": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    uiSchema: ["project_id", {
        "key": "detail",
        "ui:temp": ["row", "col", "default"],
        "items": [{
            "key": "detail/",
            "ui:temp": [],
            "ui:options": {
                "array": {
                    "add": false,
                    "remove": false
                }
            },
            "items": [{
                "key": "detail//site_name",
                "ui:condition": {
                    "key": "/project_id",
                    "opt": "gt",
                    "value": 0
                },
            }, {
                "key": "detail//url"
            }, {
                "key": "detail//md5"
            }]
        }]
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
        },
        "col": {
            "xs": { "span": 24, "offset": 0 },
            "sm": { "span": 14, "offset": 6 },
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

export const AntSchemaForm = SchemaForm.create<IAntdSchemaFromProps>(AntSchemaFormComponent);

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