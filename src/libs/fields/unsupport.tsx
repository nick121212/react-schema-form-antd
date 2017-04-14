import * as React from 'react';
import { ICommonChildProps } from '../props/common';

export interface IProps extends ICommonChildProps{

}

export class UnSupportField extends React.Component<IProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { uiSchema } = this.props;

        return (
            <div className="unsupported-field">
                Unsupported field schema {JSON.stringify(uiSchema, null, 2)}.
            </div>
        );
    }

}