/// <reference types="react" />
import * as React from 'react';
import { ICommonChildProps } from './props/common';
export declare class SchemaFormBase<P extends ICommonChildProps, S> extends React.Component<P, S> {
    constructor(props: any, context: any);
    protected getFieldValue(): any;
    protected getFieldValueForKeys(keys: Array<string>): any;
    swapItems(arr: any, indexOld: any, indexNew: any): any;
    swapObjectItems(obj: any, indexOld: any, indexNew: any): void;
    canUp(arr: any, index: any): boolean;
    canDown(arr: any, index: any): boolean;
    up(arr: any, index: any): void;
    down(arr: any, index: any): void;
    protected getKey(): string;
    triggerEvent(name: any, ...args: any[]): void;
    setData(val: any): boolean;
}
