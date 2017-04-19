import { ICommonChildProps } from '../props/common';
import { SchemaFormBase } from '../base';
export declare abstract class BaseWidget<P extends ICommonChildProps, S extends {
    value?: any;
    dataSource?: any;
    text?: any;
    loading?: boolean;
}> extends SchemaFormBase<P, S> {
    private onChangedEvent;
    private onTriggerEvent;
    constructor(props: any, context: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    triggerEvent(name: any, ...args: any[]): void;
    setDefaultProps(): {
        [id: string]: any;
    };
}
