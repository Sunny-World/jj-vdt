!function(n,t){for(var e in t)n[e]=t[e]}(window,function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";var r=this&&this.__awaiter||function(n,t,e,r){return new(e||(e=Promise))(function(o,u){function c(n){try{a(r.next(n))}catch(n){u(n)}}function i(n){try{a(r.throw(n))}catch(n){u(n)}}function a(n){n.done?o(n.value):new e(function(t){t(n.value)}).then(c,i)}a((r=r.apply(n,t||[])).next())})},o=this&&this.__generator||function(n,t){var e,r,o,u,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(e)throw new TypeError("Generator is already executing.");for(;c;)try{if(e=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return c.label++,{value:u[1],done:!1};case 5:c.label++,r=u[1],u=[0];continue;case 7:u=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){c=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){c.label=u[1];break}if(6===u[0]&&c.label<o[1]){c.label=o[1],o=u;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(u);break}o[2]&&c.ops.pop(),c.trys.pop();continue}u=t.call(n,c)}catch(n){u=[6,n],r=0}finally{e=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},u=this;Object.defineProperty(t,"__esModule",{value:!0});var c=function(n){return!!n&&("object"==typeof n||"function"==typeof n)&&"function"==typeof n.then},i=function(n,t){return n?{res:n}:{res:n,msg:t}},a={empty:function(n){return""!==n},qq:function(n){return/^[1-9][0-9]{4,}$/.test(n)},ip:function(n){return/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/.test(n)},port:function(n){return/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(n)},phone:function(n){return/\d{11}/.test(n)},mail:function(n){return/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(n)}};t.vdtInitDefault=function(n){Object.keys(n).map(function(t){a[t]=n[t]})},t.vdt=function(n){for(var t={},e=function(e){for(var c=[],f=!1,l=function(n){n.default?c.push(function(t){return function(n,t,e){return a[n]?i(a[n](t),e):(console.error("jj-vdt: There is no matching check type. Check the default value"),i(!0,e))}(n.default,t,n.msg)}):n.fn||n.asyncFn?void 0===n.fn&&void 0!==n.asyncFn?(f=!0,c.push(function(t){return r(u,void 0,void 0,function(){var e;return o(this,function(r){switch(r.label){case 0:return e=i,[4,n.asyncFn(t)];case 1:return[2,e.apply(void 0,[r.sent(),n.msg])]}})})})):c.push(function(t){return i(n.fn(t),n.msg)}):c.push(null)},s=0,d="[object Array]"===Object.prototype.toString.call(n[e])?n[e]:[n[e]];s<d.length;s++){l(d[s])}0===c.length?t[e]=function(){return i(!0)}:t[e]=f?function(n){return r(u,void 0,void 0,function(){var t,e,r,u;return o(this,function(o){switch(o.label){case 0:t=0,e=c,o.label=1;case 1:return t<e.length?null===(r=e[t])?[3,3]:[4,r(n)]:[3,4];case 2:if(!(u=o.sent()).res)return[2,u];o.label=3;case 3:return t++,[3,1];case 4:return[2,i(!0)]}})})}:function(n){for(var t=0,e=c;t<e.length;t++){var r=e[t];if(null!==r){var o=r(n);if(!o.res)return o}}return i(!0)}},c=0,f=Object.keys(n);c<f.length;c++){e(f[c])}return t},t.vdtX={conf:null,init:function(n){t.vdtX.conf=n},check:function(n){if(null===t.vdtX.conf)return console.error("jj-vdt: vdt not yet configured, please to vdtX.init!");for(var e in n)if(/\d+/.test(e)&&console.error("jj-vdt: ${i} - Do not use numbers as keys, which can lead to orderly traversal!"),void 0===t.vdtX.conf[e]&&void 0===n[e].fn)return console.error("jj-vdt: vdt not yet configured "+e+"!")},run:function(n){for(var e in t.vdtX.check(n),n){c(t.vdtX.conf[e])&&console.error("jj-vdt: Please use vdtX.runAsync, "+e+" is return to Promise!");var r=null;if("object"==typeof n[e]&&"function"==typeof n[e].fn?n[e].fn&&(r=i(n[e].fn(),n[e].msg)):r=t.vdtX.conf[e](n[e]),!r.res)return r}return i(!0)},runAsync:function(n){return r(u,void 0,void 0,function(){var e,r,u,a,f,l,s,d;return o(this,function(o){switch(o.label){case 0:for(r in t.vdtX.check(n),e=[],n)e.push(r);u=0,o.label=1;case 1:return u<e.length?(a=e[u],f=null,void 0!==n[a].msg?[3,3]:[4,t.vdtX.conf[a](n[a])]):[3,11];case 2:return f=o.sent(),[3,9];case 3:return void 0===n[a].fn?[3,5]:(l=i,[4,n[a].fn()]);case 4:return f=l.apply(void 0,[o.sent(),n[a].msg]),[3,9];case 5:return c(n[a].asyncFn)?(s=i,[4,n[a].asyncFn]):[3,7];case 6:return f=s.apply(void 0,[o.sent(),n[a].msg]),[3,9];case 7:return d=i,[4,n[a].asyncFn()];case 8:f=d.apply(void 0,[o.sent(),n[a].msg]),o.label=9;case 9:if(!f.res)return[2,f];o.label=10;case 10:return u++,[3,1];case 11:return[2,i(!0)]}})})}},t.default=t.vdt}]));
//# sourceMappingURL=vdt.js.map