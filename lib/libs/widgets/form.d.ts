/// <reference types="react" />
import { ICommonChildProps } from "../props/common";
import { BaseWidget } from './base';
export interface IProps extends ICommonChildProps {
}
export interface IState {
}
export declare class FormWidget extends BaseWidget<IProps, IState> {
    constructor(props: any, context: any);
    handleChange(value: any): void;
    render(): JSX.Element;
}
