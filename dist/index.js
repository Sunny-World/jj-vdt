// 返回校验后的信息格式
var vdtRes = function (res, msg) {
    return {
        res: res,
        msg: msg
    };
};
// 模板校验方法
var vdtDefault = function (val) {
    switch (val) {
        case "empty":
            if (String(val).trim() === "") {
                return vdtRes(false);
            }
            else {
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
var vdtFn = function (conf) {
    var fn = {};
    var list = Object.keys(conf);
    var _loop_1 = function (key) {
        var fnArr = [];
        var _loop_2 = function (item) {
            // 若存在默认解决办法
            if (item.default) {
                fnArr[key] = function (val) {
                    return vdtDefault(val);
                };
            }
            else if (item.fn) {
                // 若存在自定义解决办法
                fnArr[key] = function (val) {
                    return vdtRes(item.fn(val), item.msg);
                };
            }
            else {
                fnArr[key] = null;
            }
        };
        for (var _i = 0, _a = conf[key]; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_2(item);
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
export var vdt = vdtFn({
    test: [{
            msg: "不能为空",
            default: "empty"
        }, {
            msg: "qq号填写错误",
            default: "qq"
        }]
});
console.log(vdt.test(''));
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
//# sourceMappingURL=index.js.map