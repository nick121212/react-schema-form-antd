/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseField } from './base';
export interface IProps extends ICommonChildProps {
    arrayItems: Array<JSX.Element>;
}
export declare class ObjectField extends BaseField<IProps, any> {
    constructor(props: any, context: any);
    init(): void;
    render(): JSX.Element;
}
