import { ResStru, ConfStru, ExportStuc } from "./interface";

const isPromise = (obj): boolean => {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
};
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
            console.error(
                "jj-vdt: There is no matching check type. Check the default value"
            );
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
        if (Object.prototype.toString.call(conf[key]) === "[object Array]") {
            confArr = conf[key];
        } else {
            confArr = [conf[key]];
        }
        for (const item of confArr) {
            // 若存在默认解决办法
            if (item.default) {
                fnArr.push(val => {
                    return vdtDefault(item.default, val, item.msg);
                });
            } else if (item.fn || item.asyncFn) {
                // 若存在自定义解决办法
                if (item.fn === undefined && item.asyncFn !== undefined) {
                    isAsync = true;
                    fnArr.push(async val => {
                        return vdtRes(await item.asyncFn(val), item.msg);
                    });
                } else {
                    fnArr.push(
                        (val): ResStru => {
                            return vdtRes(item.fn(val), item.msg);
                        }
                    );
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

export const vdtX = {
    conf: null,
    init: obj => {
        vdtX.conf = obj;
    },
    check: obj => {
        if (vdtX.conf === null) {
            return console.error(
                "jj-vdt: vdt not yet configured, please to vdtX.init!"
            );
        }
        for (const i in obj) {
            if (/\d+/.test(i)) {
                console.error(
                    "jj-vdt: ${i} - Do not use numbers as keys, which can lead to orderly traversal!"
                );
            }
            if (vdtX.conf[i] === undefined && obj[i].fn === undefined) {
                return console.error(`jj-vdt: vdt not yet configured ${i}!`);
            }
        }
    },
    run: (obj): ResStru => {
        vdtX.check(obj);
        for (const i in obj) {
            if (isPromise(vdtX.conf[i])) {
                console.error(
                    `jj-vdt: Please use vdtX.runAsync, ${i} is return to Promise!`
                );
            }
            let end: ResStru = null;
            if (obj[i].fn === undefined) {
                end = vdtX.conf[i](obj[i]);
            } else {
                // 若为自定义
                if (obj[i].fn) end = vdtRes(obj[i].fn(), obj[i].msg);
            }
            if (!end.res) {
                return end;
            }
        }
        return vdtRes(true);
    },
    runAsync: async obj => {
        vdtX.check(obj);
        for (const i in obj) {
            let end: any = null;
            if (obj[i].msg === undefined) {
                end = await vdtX.conf[i](obj[i]);
            } else {
                if (obj[i].fn !== undefined) {
                    end = vdtRes(await obj[i].fn(), obj[i].msg)
                } else {
                    if (isPromise(obj[i].asyncFn)) {
                        end = vdtRes(await obj[i].asyncFn, obj[i].msg);
                    } else {
                        end = vdtRes(await obj[i].asyncFn(), obj[i].msg);
                    }
                }
            }
            if (!end.res) {
                return end;
            }
        }
        return vdtRes(true);
    }
};
export default vdt;
