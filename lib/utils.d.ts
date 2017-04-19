/// <reference types="react" />
import * as React from 'react';
import { BaseFactory } from './libs/base.factory';
import { IUiSchema } from './libs/props/uischema';
export declare class Utils {
    getField(uiSchema: IUiSchema): any;
    getTemplate(uiSchema: IUiSchema, globalOptions?: any): Array<any>;
    getWidget(uiSchema: IUiSchema): new () => React.Component<any, any>;
    getTemplateRender({schema, uiSchemaCombine, wrapper, ...extra}: {
        [x: string]: any;
        schema: any;
        uiSchemaCombine: any;
        wrapper?: undefined[];
    }): any[];
    mergeKeys({uiSchema, arrayIndex}: {
        uiSchema: any;
        arrayIndex: any;
    }): Array<string>;
    compileKeys({uiSchema, arrayIndex}: {
        uiSchema: any;
        arrayIndex: any;
    }): string;
    saveData({data, formData, keys}: {
        data: any;
        formData: any;
        keys: any;
    }): void;
    validateSingle({data, uiSchema, keys, validateResult}: {
        data: any;
        uiSchema: any;
        keys: any;
        validateResult: any;
    }): any;
}
export declare const utils: Utils;
export declare const fieldFactory: BaseFactory<new () => React.Component<any, any>>;
export declare const widgetFactory: BaseFactory<new () => React.Component<any, any>>;
export declare const tempFactory: BaseFactory<new () => React.Component<any, any>>;
