/// <reference types="react" />
import { ICommonChildProps } from '../props/common';
import { BaseWidget } from './base';
export interface IProps extends ICommonChildProps {
    defaultValue: any;
}
export declare class TreeWidget extends BaseWidget<IProps, any> {
    constructor(props: any, context: any);
    setDefaultProps(): {
        [id: string]: any;
    };
    onLoadData(treeNode: any): any;
    loop(data: any): void;
    render(): JSX.Element;
}
