/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseWidget } from './base';
export interface IProps extends ICommonChildProps {
    defaultValue: any;
}
export declare class StepsWidget extends BaseWidget<IProps, any> {
    constructor(props: any, context: any);
    handleDelete(idx: any): void;
    handleUp(idx: any): void;
    handleDown(idx: any): void;
    render(): JSX.Element;
}
