import * as React from 'react';
import { utils } from '../../utils';
import { BaseField } from './base';
import { ICommonChildProps } from '../props/common';

export interface IProps extends ICommonChildProps{

}

export class BoolField extends BaseField<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, ...extra } = this.props;
        const WidgetComponent: any = utils.getWidget(uiSchema);
        const value = this.getFieldValue();

        return (
            <WidgetComponent schema={schema} uiSchema={uiSchema} {...extra} />
        );
    }

}