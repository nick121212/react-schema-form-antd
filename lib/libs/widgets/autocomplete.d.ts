/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseWidget } from './base';
export interface IProps extends ICommonChildProps {
    defaultValue: any;
}
export declare class AutoCompleteWidget extends BaseWidget<IProps, any> {
    private timeId;
    constructor(props: any, context: any);
    setDefaultProps(): {} & {
        [id: string]: any;
    } & {};
    handleChange(value: string): void;
    onSelect(value: any): void;
    render(): JSX.Element;
}
