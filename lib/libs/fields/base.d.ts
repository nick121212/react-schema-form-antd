import { SchemaFormBase } from '../base';
import { ICommonChildProps } from '../props/common';
export declare abstract class BaseField<P extends ICommonChildProps, S> extends SchemaFormBase<P, S> {
    private onChangeEvent;
    constructor(props: P, context: S);
    init(): void;
    componentWillUnmount(): void;
}
