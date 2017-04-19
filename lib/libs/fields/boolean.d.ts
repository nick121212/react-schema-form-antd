/// <reference types="react" />
import { BaseField } from './base';
import { ICommonChildProps } from '../props/common';
export interface IProps extends ICommonChildProps {
}
export declare class BoolField extends BaseField<IProps, any> {
    constructor(props: any, context: any);
    render(): JSX.Element;
}
