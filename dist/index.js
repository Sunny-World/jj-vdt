var vdtRes = function (res, msg) {
    return {
        res: res,
        msg: msg
    };
};
// 自定义解决办法
var vdtDefault = function (val) {
    switch (val) {
        case "empty":
            if (String(val).trim() === "") {
                return vdtRes(false);
            }
            else {
                return vdtRes(true);
            }
            break;
        default:
            return vdtRes(true);
    }
};
var vdt = function (conf) {
    var fn = {};
    var list = Object.keys(conf);
    var _loop_1 = function (key) {
        var fnArr = [];
        var _loop_2 = function (i) {
            // 若存在默认解决办法
            if (conf[key][i].default) {
                fnArr[i] = function (val) {
                    return vdtDefault(val);
                };
            }
            else if (conf[key][i].fn) {
                // 若存在自定义解决办法
                fnArr[i] = function (val) {
                    return vdtRes(conf[key][i].fn(val), conf[key][i].msg);
                };
            }
            else {
                fnArr[i] = null;
            }
        };
        for (var _i = 0, _a = conf[key]; _i < _a.length; _i++) {
            var i = _a[_i];
            _loop_2(i);
        }
        fn[key] = function (val) {
            if (fnArr.length === 0) {
                return vdtRes(true);
            }
            else {
                for (var _i = 0, fnArr_1 = fnArr; _i < fnArr_1.length; _i++) {
                    var fnItem = fnArr_1[_i];
                    if (fnItem !== null) {
                        var result = fnItem(val);
                        if (!result.res) {
                            return result;
                        }
                    }
                }
            }
            return vdtRes(true);
        };
    };
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var key = list_1[_i];
        _loop_1(key);
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
//# sourceMappingURL=index.js.map