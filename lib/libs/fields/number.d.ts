/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseField } from './base';
export interface IProps extends ICommonChildProps {
}
export declare class NumberField extends BaseField<IProps, any> {
    constructor(props: any, context: any);
    render(): JSX.Element;
}
