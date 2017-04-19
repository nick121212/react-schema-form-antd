export declare const createDefaults: () => {
    string: ((name: any, schema: any, options: any) => any)[];
    object: ((name: any, schema: any, options: any, defaultFormDef: any) => any)[];
    number: ((name: any, schema: any, options: any) => any)[];
    integer: ((name: any, schema: any, options: any) => any)[];
    boolean: ((name: any, schema: any, options: any) => any)[];
    array: ((name: any, schema: any, options: any, defaultFormDef: any) => any)[];
};
