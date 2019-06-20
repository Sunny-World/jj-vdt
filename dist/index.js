var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var isPromise = function (obj) {
    return (!!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function");
};
// 返回校验后的信息格式
var vdtRes = function (res, msg) {
    if (res) {
        return {
            res: res
        };
    }
    else {
        return {
            res: res,
            msg: msg
        };
    }
};
// 模板校验方法
var vdtDefault = function (type, val, msg) {
    switch (type) {
        case "empty":
            if (val === "") {
                return vdtRes(false, msg);
            }
            else {
                return vdtRes(true);
            }
        case "qq":
            return vdtRes(/^[1-9][0-9]{4,}$/.test(val), msg);
        case "ip":
            return vdtRes(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/.test(val), msg);
        case "mail":
            return vdtRes(/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/.test(val), msg);
        default:
            console.error("jj-vdt:没有匹配的校验类型，请检查default值");
            return vdtRes(true, msg);
    }
};
// 注册自定义配置
export var vdt = function (conf) {
    var fn = {};
    var list = Object.keys(conf);
    var _loop_1 = function (key) {
        var fnArr = [];
        var isAsync = false;
        var confArr = void 0;
        if (Object.prototype.toString.call(conf[key]) === '[object Array]') {
            confArr = conf[key];
        }
        else {
            confArr = [conf[key]];
        }
        var _loop_2 = function (item) {
            // 若存在默认解决办法
            if (item.default) {
                fnArr.push(function (val) {
                    return vdtDefault(item.default, val, item.msg);
                });
            }
            else if (item.fn) {
                // 若存在自定义解决办法
                if (isPromise(item.fn(""))) {
                    isAsync = true;
                    fnArr.push(function (val) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = vdtRes;
                                    return [4 /*yield*/, item.fn(val)];
                                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), item.msg])];
                            }
                        });
                    }); });
                }
                else {
                    fnArr.push(function (val) {
                        return vdtRes(item.fn(val), item.msg);
                    });
                }
            }
            else {
                fnArr.push(null);
            }
        };
        for (var _i = 0, confArr_1 = confArr; _i < confArr_1.length; _i++) {
            var item = confArr_1[_i];
            _loop_2(item);
        }
        if (fnArr.length === 0) {
            fn[key] = function () { return vdtRes(true); };
        }
        else {
            if (isAsync) {
                fn[key] = function (val) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, fnArr_1, fnItem, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, fnArr_1 = fnArr;
                                _a.label = 1;
                            case 1:
                                if (!(_i < fnArr_1.length)) return [3 /*break*/, 4];
                                fnItem = fnArr_1[_i];
                                if (!(fnItem !== null)) return [3 /*break*/, 3];
                                return [4 /*yield*/, fnItem(val)];
                            case 2:
                                result = _a.sent();
                                if (!result.res) {
                                    return [2 /*return*/, result];
                                }
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/, vdtRes(true)];
                        }
                    });
                }); };
            }
            else {
                fn[key] = function (val) {
                    for (var _i = 0, fnArr_2 = fnArr; _i < fnArr_2.length; _i++) {
                        var fnItem = fnArr_2[_i];
                        if (fnItem !== null) {
                            var result = fnItem(val);
                            if (!result.res) {
                                return result;
                            }
                        }
                    }
                    return vdtRes(true);
                };
            }
        }
    };
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var key = list_1[_i];
        _loop_1(key);
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
//# sourceMappingURL=index.js.map