import * as React from 'react';

import { SchemaFormBase } from '../base';
import { utils } from '../../utils';
import { HocBase } from './base';

/**
 * 包装Template的组件HOC
 * @param Component 需要包装的组件
 * @param options   参数
 */
export const TempHoc = (Component: any, options = {}) => {
    return class Hoc extends HocBase<any, any> {

        constructor(props, content) {
            super(props, content);
        }

        render() {
            const { uiSchema, ...extra } = this.props;
            const TempComponents = utils.getTemplate(uiSchema);

            // 获取temp组件，遍历组合
            return TempComponents.reduce((prev, CurComponent) => {
                let component = <CurComponent key={Date.now() + Math.random()} uiSchema={uiSchema} {...extra}>{prev}</CurComponent>;

                return component;
            }, <Component {...this.props}></Component>);
        }
    }
}