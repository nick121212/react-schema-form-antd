import * as React from 'react';
import { SchemaFormBase } from '../base';
import { ICommonChildProps } from '../props/common';

export abstract class HocBase<T, P> extends SchemaFormBase<T & ICommonChildProps, P> {

    constructor(props, content) {
        super(props, content);
    }
}