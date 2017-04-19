# REACT-SCHEMA-FORM-ANTD

使用react和antd自动生成表单
#
## Demo Time

## 这是什么
schemaform是一个react的组件，它可以轻易的完成两件事情：
1. 直接通过JsonSchema来生成表单。 
2. 通过上面的JsonSchema对字段做验证。

SchemaForm通过约定的语法规则来生成配置。你可以使用的默认设置，当然你也可以定制配置。

### *SchemaForm*
1. 使用antd中的组件来组合表单。
2. 使用tv4来做验证，兼容第四版本的JSONSCHEMA。
3. 使用EventEmitter2来触发事件(数据更改，数据验证等)。

### *未完成列表*
1. **自定义验证**
2. **自定义验证错误信息**

## 文档

1. [JsonSchema规范](http://json-schema.org/)
2. [参数以及配置文档](https://github.com/nick121212/react-schema-form-antd/blob/master/docs/index.md)

## 基础用法
第一步，请先定义JsonSchema：
```
var schema = {
    "type": "object",
    "required": ["name", "rollback_flow","trigger_time","trigger_day"],
    "properties": {
        "trigger_day": {
            "type": "number"
        },
        "trigger_time": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "flows": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "trigger_mode": {
            "type": "number",
            "enum": [0, 1, 2, 3, 4]

        },
        "rollback_flow": {
            "type": "number"
        }
    }
}
```
第二步，定义表单的展现形式：
```
var uiSchema = ["name", 
{
    "key": "trigger_mode",
    "ui:widget": "number",
    "titleMap": [
        { label: "立即执行", value: 0 },
        { label: "定时执行", value: 1 },
        { label: "每天执行", value: 2 },
        { label: "每周执行", value: 3 },
        { label: "每月执行", value: 4 }
    ]
}, {
        "key": "trigger_day",
        "ui:condition": {
            "key": "/trigger_mode",
            "opt": "eq",
            "initial": true,
            "value": 3
        },
        "ui:options": {
            "widget": {
                "inputnumber": {
                    "min": 1,
                    "max": 7
                }
            }
        }
    }, {
        "key": "trigger_day",
        "ui:condition": {
            "key": "/trigger_mode",
            "opt": "eq",
            "value": 4
        },
        "ui:options": {
            "widget": {
                "inputnumber": {
                    "min": 1,
                    "max": 28
                }
            }
        }
    }, {
        "key": "trigger_time",
        "ui:widget": "datepicker",
        "ui:condition": {
            "key": "/trigger_mode",
            "opt": "gt",
            "initial": false,
            "value": 0
        },
    }, {
        "key": "flows"
    }, {
        "key": "rollback_flow"
    }]
```

最后使用render来描绘组件
```
<Form schema={schema} uiSchema={uiSchema} formData={formData} >
    <Button type="primary" htmlType="submit">确定</Button>
</Form>
```

上面的事例做了什么？
1. jsonschema定义了6个字段:[trigger_day,name,trigger_time,flows,trigger_mode,rollback_flow]；其中[name,trigger_day,trigger_time,rollback_flow]必填。
2. uiSchema定义了需要展示JsonSchema中的那些字段以及展现逻辑。当[trigger_mode>0]显示[trigger_time]；当[trigger_mode=3]显示[trigger_day],此时[trigger_day]的范围是1-7；当[trigger_mode=3]显示[trigger_day],此时[trigger_day]的范围是1-28。

## 如何安装

```
npm install react-schema-form-antd --save
```

## 打包

```
tsc -d
```
生成lib目录以及.d.ts文件

## 如何启动
```
webpack-dev-server
```
直接访问[http://localhost:8081/](http://localhost:8081/)查看效果

## 依赖
1. [react](https://github.com/facebook/react)
2. [antd](https://github.com/ant-design/ant-design)
3. [tv4](https://github.com/geraintluff/tv4)
4. [tv4-formats](https://github.com/ikr/tv4-formats)
5. [validator](https://github.com/chriso/validator.js)
6. [EventEmitter2](https://github.com/asyncly/EventEmitter2)
7. [json-pointer](https://github.com/manuelstofer/json-pointer)

## License
The MIT License (MIT) Copyright (c) 2012-2017 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.