import * as React from 'react';
import { render } from 'react-dom';
import { SchemaForm, utils } from '../src/index';

import 'antd/dist/antd.css';

const formData = {
    detail: [{}],
    project_id: 1,
    data: {
        projects: {
            1: { id: 1, name: "id1" },
            2: { id: 1, name: "id2" }
        }
    }
};

let cols = [[
    "host_name", "sn"
], [
    "ip_info", "minion_ip"
], [
    "physical_cpu_core", "physical_cpu_mhz"
], [
    "physical_cpu_thread", "logical_cpu_core"
], [
    "disk_info", "system_ver"
], [
    "eth_cnt", "mac_info"
], [
    "stat_line", "stat_distribution"
], [
    "mem", "mem_slot", "mem_slot_used"
], [
    "os_release", "os_arch", "os_type"
]];

function getColInfo() {
    let data = [];

    data = cols.map((c) => {
        return {
            "ui:temp": ["row"],
            "ui:field": "none",
            "items": c.map((d) => {
                return {
                    "ui:temp": ["col"],
                    "ui:field": "none",
                    "items": [d],
                    "ui:options": {
                        "col": {
                            "span": 24 / c.length
                        }
                    }
                };
            })
        }
    });

    return data;
}

let a = {
    schema: {
        "type": "object",
        "required": ["host_name", "sn", "ip_info"],
        "properties": {
            "host_name": { "type": "string", "title": "主机名" },
            "sn": { "type": "string", "title": "SN" },
            "ip_info": { "type": "string", "title": "IP", "format": "ip" },
            "physical_cpu_core": { "type": "number", "title": "物理CPU个数" },
            "physical_cpu_mhz": { "type": "string", "title": "CPU频率" },
            "physical_cpu_thread": { "type": "number", "title": "CPU线程数" },
            "logical_cpu_core": { "type": "number", "title": "逻辑CPU个数" },
            "mem": { "type": "number", "title": "内存大小" },
            "mem_slot": { "type": "number", "title": "内存插槽数" },
            "mem_slot_used": { "type": "number", "title": "已使用内存插槽数" },
            "disk_info": { "type": "string", "title": "硬盘信息" },
            "os_release": { "type": "string", "title": "系统版本" },
            "os_arch": { "type": "string", "title": "系统架构" },
            "mac_info": { "type": "string", "title": "MAC地址" },
            "eth_cnt": { "type": "number", "title": "网卡数量" },
            "stat_line": { "type": "number", "title": "是否在线" },
            "stat_distribution": { "type": "number", "title": "分配状态" },
            "minion_ip": { "type": "string", "title": "客户端IP", "format": "ip" },
            "system_ver": { "type": "string", "title": "操作系统版本" },
            "os_type": { "type": "string", "title": "操作系统类型" }
        }
    },
    uiSchema: getColInfo(),
    globalOptions: {
        "ui:temp": ["formitem"],
        "formItem": {
            "labelCol": {
                "xs": { "span": 24 },
                "sm": { "span": 6 },
            },
            "wrapperCol": {
                "xs": { "span": 24 },
                "sm": { "span": 14 },
            },
        },
        "row": {
            "type": "flex"
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

        this.setState({
            t: new Date()
        });
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