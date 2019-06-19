function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}
// 返回校验后的信息格式
const vdtRes = (res: boolean, msg?: string) => {
    if (res) {
        return {
            res
        };
    } else {
        return {
            res,
            msg
        };
    }
};
// 模板校验方法
const vdtDefault = (type: string, val: any, msg: string) => {
    switch (type) {
        case "empty":
            if (val === "") {
                return vdtRes(false, msg);
            } else {
                return vdtRes(true);
            }
        case "qq":
            return vdtRes(/^[1-9][0-9]{4,}$/.test(val), msg);
        case "ip":
            return vdtRes(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/.test(val), msg);
        case "mail":
            return vdtRes(
                /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/.test(val),
                msg
            );
        default:
            return vdtRes(true, msg);
    }
};
const vdtFn = (conf: any) => {
    const fn: any = {};
    const list = Object.keys(conf);
    for (const key of list) {
        const fnArr = [];
        let isAsync = false;
        for (const item of conf[key]) {
            // 若存在默认解决办法
            if (item.default) {
                fnArr.push(val => {
                    return vdtDefault(item.default, val, item.msg);
                });
            } else if (item.fn) {
                // 若存在自定义解决办法
                if (isPromise(item.fn(""))) {
                    isAsync = true;
                    fnArr.push(async val => {
                        return vdtRes(await item.fn(val), item.msg);
                    });
                } else {
                    fnArr.push(val => {
                        return vdtRes(item.fn(val), item.msg);
                    });
                }
            } else {
                fnArr.push(null);
            }
        }
        if (fnArr.length === 0) {
            fn[key] = () => vdtRes(true);
        } else {
            if (isAsync) {
                fn[key] = async (val: any) => {
                    for (const fnItem of fnArr) {
                        if (fnItem !== null) {
                            const result = await fnItem(val);
                            if (!result.res) {
                                return result;
                            }
                        }
                    }
                    return vdtRes(true);
                };
            } else {
                fn[key] = (val: any) => {
                    for (const fnItem of fnArr) {
                        if (fnItem !== null) {
                            const result = fnItem(val);
                            if (!result.res) {
                                return result;
                            }
                        }
                    }
                    return vdtRes(true);
                };
            }
        }
    }
    return fn;
};
export const vdt: any = vdtFn({
    qq: [
        {
            msg: "不能为空",
            default: "empty"
        },

        {
            msg: "qq号填写错误",
            default: "qq"
        },
        {
            msg: "自定错误",
            fn: val => {
                return new Promise(resolve => {
                    const res = val ? false : true;
                    resolve(res);
                });
            }
        }
    ]
});
vdt.qq("12345").then(res => {
    console.log(res);
});
// console.log();
export default vdt;

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
