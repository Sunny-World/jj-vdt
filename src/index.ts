const vdtRes = (res: boolean, msg?: string) => {
    return {
        res,
        msg
    };
};
// 自定义解决办法
const vdtDefault = (val: string) => {
    switch (val) {
        case "empty":
            if (String(val).trim() === "") {
                return vdtRes(false);
            } else {
                return vdtRes(true);
            }
            break;
        default:
            return vdtRes(true);
    }
};
const vdt = (conf: object) => {
    const fn: object = {};
    const list = Object.keys(conf);
    for (const key of list) {
        const fnArr = [];
        for (const i of conf[key]) {
            // 若存在默认解决办法
            if (conf[key][i].default) {
                fnArr[i] = val => {
                    return vdtDefault(val);
                };
            } else if (conf[key][i].fn) {
                // 若存在自定义解决办法
                fnArr[i] = val => {
                    return vdtRes(conf[key][i].fn(val), conf[key][i].msg);
                };
            } else {
                fnArr[i] = null;
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
