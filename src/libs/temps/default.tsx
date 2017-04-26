import * as React from 'react';
import { Col } from 'antd';

import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { BaseTemp } from './base';

export interface IProps extends ICommonChildProps {

}

export class DefaultTemp extends BaseTemp<IProps, any>{
    constructor(props, context) {
        super(props, context);
        this.init();
    }

    render() {
        const { schema, uiSchema, globalOptions = {}, children } = this.props;
        const options = uiSchema["ui:options"] || {};
        const { error, invalid, dirty } = this.getErrorInfo();

        return (
            <div>
                <div>
                    {children}
                    <i style={{ clear: "both", display: "block" }}></i>
                </div>
                <div>
                    {invalid && dirty && error.message + this.getKey()}
                </div>
            </div>
        );
    }
}