/// <reference types="tv4" />
import { IUiSchema } from '../props/uischema';
import { IOptions, MyJsonSchema } from './default.type/utils';
export declare const mergeSchema: (schema: MyJsonSchema, uiSchema: (string | IUiSchema)[], options: IOptions, parentKey?: string[]) => {
    form: (IUiSchema & tv4.JsonSchema)[];
    options: IOptions;
};
