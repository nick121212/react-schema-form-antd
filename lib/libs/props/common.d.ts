/// <reference types="eventemitter2" />
/// <reference types="tv4" />
import { IUiSchema } from './uischema';
import { IValidateResult } from './validateresult';
import { IOptions, MyJsonSchema } from '../core/default.type/utils';
export interface IHOC {
    init?: () => void;
    dispose?: () => void;
}
export interface ICommonProps {
    formData?: any;
    schema: MyJsonSchema;
    uiSchema?: Array<IUiSchema | string>;
    globalOptions?: any;
    form?: any;
    onChange?: (keys: Array<string>, data: any) => void;
    arrayIndex?: Array<number>;
}
export interface ICommonChildProps extends ICommonProps {
    schemaForm: ISchemaForm;
    formEvent: EventEmitter2;
    validateResult: {
        [id: string]: IValidateResult;
    };
    uiSchemaCombine: Array<tv4.JsonSchema & IUiSchema>;
    schemaFormOptions: IOptions;
    handleTrigger?: (data: any) => void;
    triggerProps?: {
        dataSource?: Array<any>;
        text?: string;
    };
}
export interface ISchemaForm {
    getData(): any;
    validator(): boolean;
}
