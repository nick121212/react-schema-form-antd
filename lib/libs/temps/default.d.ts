/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseTemp } from './base';
export interface IProps extends ICommonChildProps {
}
export declare class DefaultTemp extends BaseTemp<IProps, any> {
    constructor(props: any, context: any);
    render(): JSX.Element;
}
