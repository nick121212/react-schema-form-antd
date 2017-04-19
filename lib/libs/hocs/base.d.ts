import { SchemaFormBase } from '../base';
import { ICommonChildProps } from '../props/common';
export declare class HocBase<T, P> extends SchemaFormBase<T & ICommonChildProps, P> {
    constructor(props: any, content: any);
}
