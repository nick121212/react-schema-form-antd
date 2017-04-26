/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseField } from './base';
export interface IProps extends ICommonChildProps {
}
export declare class ArrayField extends BaseField<IProps, any> {
    private changeCurrentArray;
    private onChanged;
    constructor(props: any, context: any);
    handleChange(opt: string, idx: number, keys: Array<string>, items: any): void;
    handleAdd(e: any): void;
    handleDelete(idx: any, e: any): void;
    handleUp(idx: any): void;
    handleDown(idx: any): void;
    renderItems(): any[];
    init(): void;
    dispose(): void;
    render(): JSX.Element;
}
