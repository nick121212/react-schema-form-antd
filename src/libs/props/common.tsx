import { IUiSchema } from './uischema';
import { IValidateResult } from './validateresult';
import { IOptions, MyJsonSchema } from '../core/default.type/utils';

export interface IHOC{
    init?:()=>void;
    dispose?:()=>void;
}

export interface ICommonProps {
    /**
      * 当前的数据
      */
    formData?: any;
    /**
     * JSONSCHEMA
     */
    schema: MyJsonSchema;
    /**
     * UISCHEMA
     */
    uiSchema?: Array<IUiSchema | string>;
    /**
     * 全局配置
     */
    globalOptions?: any;
    /**
     * 传入的Form对象，可以是antd的form
     */
    form?: any;
    /**
     * change事件
     */
    onChange?: (keys: Array<string>, data: any) => void;
    /**
     * 当前的数据索引
     */
    arrayIndex?: Array<number>;
}

export interface ICommonChildProps extends ICommonProps {
    schemaForm: ISchemaForm;
    formEvent: EventEmitter2;
    validateResult: { [id: string]: IValidateResult };
    uiSchemaCombine: Array<tv4.JsonSchema & IUiSchema>;
    schemaFormOptions: IOptions;
}


export interface ISchemaForm {
    getData(): any;
    validator(): boolean;
}