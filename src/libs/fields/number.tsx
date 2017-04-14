import * as React from 'react';
import { ICommonProps, ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { IUiSchema } from '../props/uischema';
import { BaseField } from './base';

export interface IProps extends ICommonChildProps{

}

export class NumberField extends BaseField<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {  schema, uiSchema,  ...extra } = this.props;
        const WidgetComponent: any = utils.getWidget(uiSchema);
        const value = this.getFieldValue();

        return (
            <WidgetComponent schema={schema} uiSchema={uiSchema} {...extra} />
        );
    }

}