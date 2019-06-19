// 返回校验后的信息格式
const vdtRes = (res: boolean, msg?: string) => {
    return {
        res,
        msg
    };
};
// 模板校验方法
const vdtDefault = (type: string, val: any) => {
    switch (type) {
        case "empty":
            if (val === "") {
                return vdtRes(false);
            } else {
                return vdtRes(true);
            }
        case "qq":
            return /^[1-9][0-9]{4,}$/.test(val);
        case "ip":
            return /^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/.test(val);
        case "mail":
            return /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/.test(val);
        default:
            return vdtRes(true);
    }
};
const vdtFn = (conf: object) => {
    const fn: object = {};
    const list = Object.keys(conf);

    for (const key of list) {
        const fnArr = [];
        for (const item of conf[key]) {
            // 若存在默认解决办法
            if (item.default) {
                fnArr[key] = val => {
                    return vdtDefault(item.default, val);
                };
            } else if (item.fn) {
                // 若存在自定义解决办法
                fnArr[key] = val => {
                    return vdtRes(item.fn(val), item.msg);
                };
            } else {
                fnArr[key] = null;
            }
        }
        fn[key] = (val: any) => {
            if (fnArr.length === 0) {
                return vdtRes(true);
            } else {
                for (const fnItem of fnArr) {
                    if (fnItem !== null) {
                        const result = fnItem(val);
                        if (!result.res) {
                            return result;
                        }
                    }
                }
            }
            return vdtRes(true);
        };
    }

    return fn;
};

export const vdt: any = vdtFn({
    test: [{
        msg: "不能为空",
        default: "empty"
    }, {
        msg: "qq号填写错误",
        default: "qq"
    }]
})

console.log(vdt.test(''))
export default vdt

// const Vdt = {
//     test: [
//         {
//             msg: "不能为空",
//             default: "empty"
//         },
//         {
//             msg: "输入错误",
//             fn: val => {
//                 // tslint:disable-next-line:align
//                 return /\d/.test(val);
//             }
//         }
//     ]
// };
