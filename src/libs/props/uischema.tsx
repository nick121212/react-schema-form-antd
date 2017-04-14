

export interface IUiSchema {
    "ui:widget"?: string;
    "ui:temp"?: string | Array<string>;
    "ui:field"?: string;
    "ui:options"?: Object;
    "ui:grid"?: {
        row?: Object;
        col?: Object;
    } | boolean;

    readonly?: boolean;
    key?: Array<string> | string;
    items?: Array<IUiSchema | string>;
    title?: string;
    schema?: tv4.JsonSchema;
    required?: boolean;
    type?: string;
    uiSchema?: any;

    titleMap?: Array<{ label: string, name?: string, value: string }>;
}