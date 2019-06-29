# jj-vdt 校验中心
- [文档地址](https://javison666.github.io/jj-vdt/)
- 可以简单使用默认也可以自定义通过进行校验，非常适用于验证中心
- 新增管道形式，适用于多重校验
- 提供异步校验能力
- 新增新增流程式校验能力，依然支持同步异步
- html中则直接引入common文件夹下的vdt.js,window.vdt进行调用

## 安装
```js
import vdt from 'jj-vdt'
// 扩展流程式校验
import { vdt, vdtX} from 'jj-vdt'
```
```html
<script src="jj-vdt/common/vdt.js"></script>
```

## 使用
### 校验空值
```js
// 先注入校验配置
const Vdt = vdt({
    // key指代校验模式，通过Vdt.test(val)采用相应模式校验
    test:{
        msg: "该值不能为空",
        default: "empty"
    },
    testA:{
        msg: "请输入***",
        default: "empty"
    }
})
console.log(Vdt.test(""))
// {
//     res:false,
//     msg:"该值不能为空"
// }
console.log(Vdt.testA(""))
// {
//     res:false,
//     msg:"请输入***"
// }
console.log(Vdt.test("1"))
// {
//     res:true,
// }
```
### 管道模式（ 适用于多重校验 ）
```js
const Vdt = vdt({
    qq:[{
        msg: "请输入qq号",
        default: "empty"
    },{
        msg: "qq号输入错误",
        default: "qq"
    }]
})
console.log(Vdt.qq(""))
// {
//     res:false,
//     msg:"请输入qq号"
// }
console.log(Vdt.qq("12"))
// {
//     res:false,
//     msg:"qq号输入错误"
// }
console.log(Vdt.qq("12345"))
// {
//     res:true
// }
```
### 自定义校验方法
自定义需要注入fn函数，参数即需要校验的值，函数需要返回true/false，来返回校验结果
```js
const Vdt = vdt({
    test:[{
        msg: "请输入内容",
        default: "empty"
    },{
        msg: "只能输入3个字",
        fn: (val)=>{
            return val.length===3 ? true : false;
        }
    }]
})
console.log(Vdt.test(""))
// {
//     res:false,
//     msg:"请输入内容"
// }
console.log(Vdt.test("12"))
// {
//     res:false,
//     msg:"只能输入3个字"
// }
console.log(Vdt.test("123"))
// {
//     res:true,
// }
```
### 自定义异步校验方法
自定义需要注入返回promise对象的fn函数，参数即需要校验的值，resolve的值需要为true/false
```js
const Vdt = vdt({
    test:[{
        msg: "请输入内容",
        default: "empty"
    },{
        msg: "只能输入3个字",
        asyncFn: (val)=>{
            return new Promise(resolve => {
                resolve(val.length===3 ? true : false;)
            })
        }
    }]
})
console.log( Vdt.test("").then(res => console.log(res)) )
// {
//     res:false,
//     msg:"请输入内容"
// }
console.log(Vdt.test("12").then(res => console.log(res)) )
// {
//     res:false,
//     msg:"只能输入3个字"
// }
console.log(Vdt.test("123").then(res => console.log(res)) )
// {
//     res:true,
// }
```
## 支持的默认模式(设置default)，持续更新添加
- empty: 校验空值
- qq: 校验qq
- ip: 校验ip
- port: 校验端口
- mail: 校验mail

## 添加默认方法
```js
import { vdtInitDefault } from "jj-vdt"
vdtInitDefault({
    test: val => true
});
const testVdt = vdt({
    new: [
        {
            msg: "test错误",
            default: "test"
        }
    ]
});
```

# 高级用法 - 流程校验用法
一般我们我们表单校验会校验多个值，所以增加了vdtX流程方法，请不要使用数字作为key值，因为会导致对象无序遍历。
## 同步校验
```js
import { vdt, vdtX } from "jj-vdt"
// 初始化配置
const testVdt = vdt({
    account: [
        {
            msg: "账号不能为空",
            default: "empty"
        }
    ],
    password: [
        {
            msg: "密码不能为空",
            default: "empty"
        }
    ]
});
// 初始化流程校验
vdtX.init(testVdt);
// 进行流程校验
vdtX.run({
    account: "",
    password: ""
})
// {
//     res:false,
//     msg:"账号不能为空"
// }
vdtX.run({
    account: "admin",
    password: ""
})
// {
//     res:false,
//     msg:"密码不能为空"
// }
```
## 异步校验
当流程涉及校验的key，存在使用异步方法进行校验时，请使用runAsync
```js
const testVdt = vdt({
    account: [
        {
            msg: "账号不能为空",
            default: "empty"
        },
        {
            msg: "自定错误",
            asyncFn: (val: any) => {
                return new Promise(resolve => {
                    const res = val ? false : true;
                    resolve(res);
                });
            }
        }
    ],
    password: [
        {
            msg: "密码不能为空",
            default: "empty"
        }
    ]
});
vdtX.init(testVdt);

vdtX.runAsync({
    account: "",
    password: ""
}).then(res => {
    console.log(res)
})
// {
//     res:false,
//     msg:"账号不能为空"
// }
```
## vdtX自定义校验
vdtX中依然支持使用自定义的校验方法
```js
const testVdt = vdt({
    qq: [
        {
            msg: "qq不能为空",
            default: "empty"
        }
    ],
    mail: [
        {
            msg: "邮箱不能为空",
            default: "empty"
        }
    ]
});
vdtX.init(testVdt);
// 同步
vdtX.run({
    qq: "12",
    mail: {
        msg: "这里信息自定义",
        fn: () => {
            return false
        }
    }
})

// 异步1
vdtX.runAsync({
    qq: "12",
    mail: {
        msg: "这里信息自定义",
        asyncFn: () => {
            return new Promise(resolve=>{
                resolve(false)
            });
        }
    }
}).then(res => {
    console.log(res)
})
// 异步2
vdtX.runAsync({
    qq: "12",
    mail: {
        msg: "这里信息自定义",
        asyncFn: new Promise(resolve=>{
            resolve(false)
        });
    }
}).then(res => {
    console.log(res)
})
```

## 请我喝杯果汁呗～

![Image text](https://github.com/Javison666/jj-vdt/blob/master/image/alipay.jpg?raw=true)![Image text](https://github.com/Javison666/jj-vdt/blob/master/image/wechat.jpg?raw=true)