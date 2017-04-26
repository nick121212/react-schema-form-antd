/// <reference types="react" />
import * as React from 'react';
import { ICommonProps } from './props/common';
export interface IProps extends ICommonProps {
}
export declare class SchemaForm extends React.Component<IProps, any> {
    private validateResult;
    private valid;
    private formEvent;
    private onChangeAll;
    private onValidate;
    constructor(props: IProps, context: any);
    validator(): boolean;
    setData(keys: Array<string>, val: any): void;
    getData(): any;
    init(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    static create<P>(Componment: any): React.ComponentClass<P & IProps & {
        getData?: () => any;
        validator?: () => boolean;
        setData?: (keys: Array<string>, data: any) => void;
    }>;
}
