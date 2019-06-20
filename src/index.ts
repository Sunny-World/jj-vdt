import {
    ResStru,
    ConfStru,
    ExportStuc
} from "./interface"

const isPromise = (obj): boolean => {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}
// 返回校验后的信息格式
const vdtRes = (res: boolean, msg?: string): ResStru => {
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
const vdtDefault = (type: string, val: any, msg: string): ResStru => {
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
            console.error("jj-vdt:没有匹配的校验类型，请检查default值")
            return vdtRes(true, msg);
    }
};
// 注册自定义配置
export const vdt = (conf: ConfStru): ExportStuc => {
    const fn: ExportStuc = {};
    const list = Object.keys(conf);
    for (const key of list) {
        const fnArr = [];
        let isAsync = false;
        let confArr;
        if(Object.prototype.toString.call(conf[key]) === '[object Array]'){
            confArr=conf[key]
        }else{
            confArr=[conf[key]]
        }
        for (const item of confArr) {
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
                    fnArr.push((val): ResStru => {
                        return vdtRes(item.fn(val), item.msg);
                    });
                }
            } else {
                fnArr.push(null);
            }
        }
        if (fnArr.length === 0) {
            fn[key] = (): ResStru => vdtRes(true);
        } else {
            if (isAsync) {
                fn[key] = async (val: any) => {
                    for (const fnItem of fnArr) {
                        if (fnItem !== null) {
                            const result: ResStru = await fnItem(val);
                            if (!result.res) {
                                return result;
                            }
                        }
                    }
                    return vdtRes(true);
                };
            } else {
                fn[key] = (val: any): ResStru => {
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
// const testVdt =  vdt({
//     qq: [
//         {
//             msg: "不能为空",
//             default: "empty"
//         },
//         {
//             msg: "qq号填写错误",
//             default: "qq"
//         },
//         {
//             msg: "自定错误",
//             fn: (val: any) => {
//                 return new Promise(resolve => {
//                     const res = val ? false : true;
//                     resolve(res);
//                 });
//             }
//         }
//     ]
// });
// testVdt.qq("12345").then(res => {
//     console.log(res);
// });
export default vdt;
