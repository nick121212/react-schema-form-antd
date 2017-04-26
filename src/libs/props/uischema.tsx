import { ISchemaForm } from "./common";

export interface IUiSchema {
    // 表现组件名称配置
    "ui:widget"?: string;
    // 模板组件名称或数组配置
    "ui:temp"?: string | Array<string>;
    // 字段名称配置
    "ui:field"?: string;
    // 参数配置
    "ui:options"?: Object;
    // 触发配置
    "ui:trigger"?: Object;
    // 显示条件配置
    "ui:condition"?: Object;
    // 是否只读
    readonly?: boolean;
    // key
    key?: Array<string> | string;
    // 子元素
    items?: Array<IUiSchema | string>;
    // 标题
    title?: string;
    // schema
    schema?: tv4.JsonSchema;
    // 是否必填
    required?: boolean;
    // 类型
    type?: string;
    uiSchema?: any;
    // 更改事件
    onChange?: (keys: Array<string>, value: any, schemaForm: ISchemaForm) => void;
    // 显示的数据
    titleMap?: Array<{ label: string, name?: string, value: string }>;
    // 如果是object，是否被初始化过
    init?: boolean;
}