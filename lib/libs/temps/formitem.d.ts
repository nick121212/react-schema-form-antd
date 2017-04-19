/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseTemp } from './base';
export interface IProps extends ICommonChildProps {
    arrayItems?: JSX.Element;
}
export declare class FormItemTemp extends BaseTemp<IProps, any> {
    constructor(props: any, context: any);
    render(): JSX.Element;
}
