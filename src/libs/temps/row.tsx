import * as React from 'react';
import { Row } from 'antd';

import { ICommonChildProps } from '../props/common';

export interface IProps extends ICommonChildProps {

}

export class RowTemp extends React.Component<IProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, children, globalOptions = { row: {} } } = this.props;
        const options = uiSchema["ui:options"] || { row: {} };

        return (
            <Row {...globalOptions.row} {...options.row}>
                {children}
            </Row>
        );
    }
}