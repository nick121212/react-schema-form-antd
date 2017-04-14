import * as React from 'react';
import { Col } from 'antd';

import { ICommonChildProps } from '../props/common';

export interface IProps extends ICommonChildProps {

}

export class ColTemp extends React.Component<IProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, globalOptions = {}, children } = this.props;
        const options = uiSchema["ui:options"] || {};

        return (
            <Col {...globalOptions.col} {...options.col}>
                {children}
            </Col>
        );
    }
}