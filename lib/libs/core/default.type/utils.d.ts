export declare const enumToTitleMap: (enm: any) => any[];
export interface MyJsonSchema extends tv4.JsonSchema {
    $ref?: string;
    key: Array<string>;
    titleMap?: Array<any>;
    maxLength?: number;
    minLength?: number;
    readonly?: boolean;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    validationMessage?: {
        [key: string]: string;
    };
}
export interface IOptions {
    global?: {
        formDefaults?: any;
        combines?: any;
        schemas?: any;
        supressPropertyTitles?: boolean;
    };
    definition?: boolean;
    definitions?: any;
    required?: boolean;
    path?: Array<string>;
    lookup?: any;
    ignore?: any;
}
export declare const stdFormObj: (name: string, schema: MyJsonSchema, options: IOptions) => any;
