/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseWidget } from './base';
export interface IProps extends ICommonChildProps {
    defaultValue: any;
}
export declare class AutoCompleteWidget extends BaseWidget<IProps, any> {
    constructor(props: any, context: any);
    setDefaultProps(): {};
    handleChange(value: any): void;
    render(): JSX.Element;
}
