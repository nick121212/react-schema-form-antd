import { IOptions, MyJsonSchema } from './default.type/utils';
export declare const mergeRef: (schema: MyJsonSchema, options: IOptions) => MyJsonSchema;
export declare const mergeAllOf: (schema: MyJsonSchema, options: IOptions) => MyJsonSchema;
export declare const defaultFormDefinition: (schemaTypes: any, name: string, schema: MyJsonSchema, options: IOptions, combine?: boolean) => any;
export declare const compileSchema: (schema: MyJsonSchema, defaultSchemaTypes: any, options: IOptions, parentKey?: string[]) => {
    defineForm: {};
    form: any[];
};
