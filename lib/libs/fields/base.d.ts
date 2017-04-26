import { SchemaFormBase } from '../base';
import { ICommonChildProps } from '../props/common';
export declare class BaseField<P extends ICommonChildProps, S> extends SchemaFormBase<P, S> {
    private onChangeEvent;
    constructor(props: P, context: S);
    init(): void;
    dispose(): void;
    componentWillUnmount(): void;
}
