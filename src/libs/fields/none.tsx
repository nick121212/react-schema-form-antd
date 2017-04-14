import * as React from 'react';

import { BaseField } from './base';
import { ICommonChildProps } from '../props/common';

export interface IProps extends ICommonChildProps {

}

export class NoneField extends BaseField<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <span>
                {this.props.children}
            </span>
        );
    }

}