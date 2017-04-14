import * as React from 'react';
import * as tv4 from 'tv4';
import { Card } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { UnSupportField } from '../fields/unsupport';

export interface IProps extends ICommonChildProps{

}

export class CardTemp extends React.Component<IProps , any>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, children, globalOptions } = this.props;
        const options = uiSchema["ui:options"] || {};

        return (
            <Card title={(uiSchema as tv4.JsonSchema).title}  {...options.card}>
                {children}
            </Card>
        );
    }
}