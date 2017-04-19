import { ICommonChildProps } from '../props/common';
import { SchemaFormBase } from '../base';
export interface IProps extends ICommonChildProps {
}
export declare abstract class BaseTemp<P extends ICommonChildProps, T> extends SchemaFormBase<P, T> {
    private onValidatorEvent;
    constructor(props: any, context: any);
    init(): void;
    componentWillUnmount(): void;
    getErrorInfo(): {
        dirty: boolean;
        invalid: boolean;
        error: any;
    };
}
