export const enumToTitleMap = (enm) => {
    const titleMap = [];

    enm.forEach((name) => {
        titleMap.push({ name, value: name, label: name });
    });

    return titleMap;
};

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
    validationMessage?: { [key: string]: string };
}

export interface IOptions {
    global?: {
        formDefaults?: any;
        combines?: any;
        schemas?: any;
        supressPropertyTitles?: boolean;
    }
    definition?: boolean;
    definitions?: any;
    required?: boolean;
    path?: Array<string>;
    lookup?: any;
    ignore?: any;
}

/**
 * Creates a form object with all common properties
 * @param name 
 * @param schema 
 * @param options 
 */
export const stdFormObj = (name: string, schema: MyJsonSchema, options: IOptions): MyJsonSchema => {
    options = options || {};

    // The Object.assign used to be a angular.copy. Should work though.
    const f = options.global && options.global.formDefaults ?
        Object.assign({}, options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
        f.title = schema.title;
    }
    else {
        f.title = schema.title || name;
    }

    if (schema.description) { f.description = schema.description; }
    if (options.required === true) { f.required = true; }
    if (schema.maxLength) { f.maxlength = schema.maxLength; }
    if (schema.minLength) { f.minlength = schema.minLength; }
    if (schema.readonly) { f.readonly = true; }
    if (schema.minimum) { f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0); }
    if (schema.maximum) { f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0); }

    // Non standard attributes (DONT USE DEPRECATED)
    // If you must set stuff like this in the schema use the x-schema-form attribute
    if (schema.validationMessage) { f.validationMessage = schema.validationMessage; }
    f.schema = schema;

    // Ng model options doesn't play nice with undefined, might be defined
    // globally though
    // f.ngModelOptions = f.ngModelOptions || {};

    return f;
};
