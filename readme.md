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
3. 使用eventemmiter2来触发事件。

## 文档

## 基础用法
第一步，请先定义JsonSchema：
```
var schema = {
    "type": "object",
    "required": ["name", "rollback_flow"],
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

## 如何安装

```
npm install react-schema-form-antd --save
```

## 依赖
1. [react](https://github.com/facebook/react)
2. [antd](https://github.com/ant-design/ant-design)
3. [tv4](https://github.com/geraintluff/tv4)
4. [tv4-formats](https://github.com/ikr/tv4-formats)
5. [validator](https://github.com/chriso/validator.js)
6. [eventemmiter2](https://github.com/asyncly/EventEmitter2)
7. [json-pointer](https://github.com/manuelstofer/json-pointer)

## License
MIT