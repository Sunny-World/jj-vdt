# 校验中心

## 
```js
const Vdt = {
    test: [
        {
            msg: "不能为空",
            default: "empty"
        },
        {
            msg: "输入错误",
            fn: val => {
                // tslint:disable-next-line:align
                return /\d/.test(val);
            }
        }
    ]
};
```

## html中则直接引入common文件夹下的vdt.js,window.vdt进行调用