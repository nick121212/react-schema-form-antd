/// <reference types="tv4" />
import { ISchemaForm } from "./common";
export interface IUiSchema {
    "ui:widget"?: string;
    "ui:temp"?: string | Array<string>;
    "ui:field"?: string;
    "ui:options"?: Object;
    "ui:trigger"?: Object;
    "ui:condition"?: Object;
    readonly?: boolean;
    key?: Array<string> | string;
    items?: Array<IUiSchema | string>;
    title?: string;
    schema?: tv4.JsonSchema;
    required?: boolean;
    type?: string;
    uiSchema?: any;
    onChange?: (keys: Array<string>, value: any, schemaForm: ISchemaForm) => void;
    titleMap?: Array<{
        label: string;
        name?: string;
        value: string;
    }>;
    init?: boolean;
}
