(this["webpackJsonpjavascript-helpers"]=this["webpackJsonpjavascript-helpers"]||[]).push([[0],[,,,,,,,function(e,t,n){"use strict";var a,r=n(0),c=n.n(r),u=n(21),o=n(8),i=n(6);!function(e){e.INPUT="input",e.TEXTAREA="textarea"}(a||(a={}));var l=function(e){var t=e.label,n=e.value,r=e.type,l=void 0===r?a.INPUT:r,s=e.onChange,f=e.errorMsg,m=e.rows;return c.a.createElement(u.a.Group,{as:o.a,className:"align-items-center"},c.a.createElement(u.a.Label,{column:!0,sm:"3"},t),c.a.createElement(i.a,{sm:"9"},l===a.INPUT&&c.a.createElement(u.a.Control,{onChange:function(e){var t,n;e.preventDefault(),s(null!==(t=null===e||void 0===e||null===(n=e.target)||void 0===n?void 0:n.value)&&void 0!==t?t:"")},isInvalid:!!f,value:n}),l===a.TEXTAREA&&c.a.createElement(u.a.Control,{as:"textarea",onChange:function(e){var t,n;e.preventDefault(),s(null!==(t=null===e||void 0===e||null===(n=e.target)||void 0===n?void 0:n.value)&&void 0!==t?t:"")},isInvalid:!!f,value:n,rows:m}),f&&c.a.createElement(u.a.Control.Feedback,{type:"invalid"},f)))};n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return a}))},,,function(e,t,n){"use strict";var a="LOAD_PRESET",r="RESET_SETTINGS",c="UPDATE_SETTINGS",u="SHOW_ADVANCED_SETTINGS",o="HIDE_ADVANCED_SETTINGS";function i(e){return{type:a,preset:e}}function l(){return{type:r}}function s(e){return{type:c,newSettingsValues:e}}function f(){return{type:u}}function m(){return{type:o}}var E,v=n(5),d=n(9),g=n(0),p=n.n(g),b=n(12),h=n(8),C=n(6),O=n(7),S=Object(d.b)((function(e){return Object(v.a)({showAdvancedSettings:x(e)},w(e))}),(function(e){return{onChange:function(t){e(s(t))},showAdvanced:function(){e(f())},resetForm:function(){e(l())},hideAdvanced:function(){e(m())}}}))((function(e){return p.a.createElement(h.a,null,p.a.createElement(C.a,null,p.a.createElement(h.a,null,p.a.createElement(C.a,null,p.a.createElement("h3",null,"Settings")),p.a.createElement(C.a,{className:"text-right"},p.a.createElement(b.a,{variant:"outline-danger",size:"sm",onClick:e.resetForm},"Reset settings"))),p.a.createElement(O.a,{label:"Char to use as filler",onChange:function(t){e.onChange({filler:t})},value:e.filler}),p.a.createElement(O.a,{label:"Line length",onChange:function(t){var n=parseInt(t);isNaN(n)&&(n=0),e.onChange({lineLength:n})},value:""+e.lineLength}),p.a.createElement(h.a,null,p.a.createElement(C.a,null,p.a.createElement("h3",null,"Advanced settings")),p.a.createElement(C.a,{className:"text-right"},e.showAdvancedSettings?p.a.createElement(b.a,{variant:"primary",size:"sm",onClick:e.hideAdvanced},"Hide advanced settings"):p.a.createElement(b.a,{variant:"outline-primary",size:"sm",onClick:e.showAdvanced},"Show advanced settings"))),e.showAdvancedSettings&&p.a.createElement("div",null,p.a.createElement(O.a,{label:"General prefix",onChange:function(t){e.onChange({generalPrefix:t})},value:e.generalPrefix}),p.a.createElement(O.a,{label:"General postfix",onChange:function(t){e.onChange({generalPostfix:t})},value:e.generalPostfix}),p.a.createElement(O.a,{label:"Line start",onChange:function(t){e.onChange({lineStart:t})},value:e.lineStart}),p.a.createElement(O.a,{label:"Line end",onChange:function(t){e.onChange({lineEnd:t})},value:e.lineEnd}),p.a.createElement(O.a,{label:"Char escaper",onChange:function(t){e.onChange({charEscaper:t})},value:e.charEscaper}),p.a.createElement(O.a,{label:"Concatenate variable in log char",onChange:function(t){e.onChange({variableConcatenateChar:t})},value:e.variableConcatenateChar}),p.a.createElement(O.a,{label:"Variable wrapper prefix",onChange:function(t){e.onChange({variableWrapperCodePrefix:t})},value:e.variableWrapperCodePrefix}),p.a.createElement(O.a,{label:"Variable wrapper postfix",onChange:function(t){e.onChange({variableWrapperCodePostfix:t})},value:e.variableWrapperCodePostfix}))))}));!function(e){e.BROWSER="BROWSER",e.NODEJS="NODEJS",e.REACT_RENDER="REACT_RENDER",e.DEFAULT="DEFAULT",e.CUSTOM="CUSTOM"}(E||(E={}));var T={currentPreset:E.DEFAULT,showAdvancedSettings:!1,values:{presetFullName:"Default",filler:"*",lineLength:60,lineStart:"console.log(",lineEnd:");",charEscaper:"'",variableConcatenateChar:", ",variableWrapperCodePrefix:"JSON.stringify(",variableWrapperCodePostfix:", null, '\\t')",generalPrefix:"",generalPostfix:""}},j={BROWSER:{presetFullName:"Browser",lineStart:"console.log(",lineEnd:");",charEscaper:"'",variableConcatenateChar:", ",variableWrapperCodePrefix:"JSON.stringify(",variableWrapperCodePostfix:", null, '\\t')",generalPrefix:"",generalPostfix:""},NODEJS:{presetFullName:"NodeJS",lineStart:"console.log(",lineEnd:");",charEscaper:"'",variableConcatenateChar:", ",variableWrapperCodePrefix:"util.inspect(",variableWrapperCodePostfix:", false, 5)",generalPrefix:"const util = require('util');",generalPostfix:""},REACT_RENDER:{presetFullName:"React render() log",lineStart:"",lineEnd:"<br />",charEscaper:"",variableConcatenateChar:"",variableWrapperCodePrefix:"{JSON.stringify(",variableWrapperCodePostfix:", null, '\\t')}",generalPrefix:"<pre>",generalPostfix:"</pre>"},DEFAULT:Object(v.a)({},T.values),CUSTOM:{presetFullName:"Custom"}};function R(e){return j[e]}function N(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case a:return Object(v.a)(Object(v.a)({},e),{},{currentPreset:t.preset,values:Object(v.a)(Object(v.a)({},e.values),R(t.preset))});case r:return Object(v.a)({},T);case c:return Object(v.a)(Object(v.a)({},e),{},{currentPreset:E.CUSTOM,values:Object(v.a)(Object(v.a)(Object(v.a)({},e.values),R(E.CUSTOM)),t.newSettingsValues)});case u:return Object(v.a)(Object(v.a)({},e),{},{showAdvancedSettings:!0});case o:return Object(v.a)(Object(v.a)({},e),{},{showAdvancedSettings:!1});default:return e}}var P=function(e){return e.settings},x=function(e){return P(e).showAdvancedSettings},w=function(e){return P(e).values};n.d(t,"g",(function(){return i})),n.d(t,"h",(function(){return l})),n.d(t,"k",(function(){return s})),n.d(t,"j",(function(){return f})),n.d(t,"f",(function(){return m})),n.d(t,"b",(function(){return S})),n.d(t,"a",(function(){return E})),n.d(t,"c",(function(){return R})),n.d(t,"i",(function(){return N})),n.d(t,"e",(function(){return x})),n.d(t,"d",(function(){return w}))},,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return i}));var a=n(46),r={RESET_VARS:"RESET_VARS",UPDATE_VARS:"UPDATE_VARS"};function c(){return{type:r.RESET_VARS}}var u=function(e){switch(e){case"(":return")";case"{":return"}";case"[":return"]"}},o=function(e){return/[)}\]]/.test(e)};function i(e){var t,n=/[ ,;]/,c=[],i="",l=[],s="",f=Object(a.a)(e);try{for(f.s();!(t=f.n()).done;){var m=t.value;if(s.length>0)break;if(!n.test(m)||l.length>0){if(i+=m,/[({[]/.test(m)&&l.push(m),o(m)){var E=l[l.length-1];l.length&&m===u(E)?l.pop():(s='Closing bracket "'.concat(m,'" does not match'),s+=E?' last opened "'.concat(E,'"'):" any opening bracket")}}else i.trim()&&(c.push(i),i="")}}catch(v){f.e(v)}finally{f.f()}return i.trim()&&!s&&c.push(i),l.length&&!s&&(s='Last unclosed bracket "'.concat(l[l.length-1],'" does not have closing bracket pair')),{type:r.UPDATE_VARS,rawVars:e,vars:c,bracketsError:s}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c}));var a={RESET_COMMENT:"RESET_COMMENT",SET_COMMENT:"UPDATE_COMMENT"};function r(){return{type:a.RESET_COMMENT}}function c(e){return{type:a.SET_COMMENT,comment:e}}},,function(e,t,n){"use strict";var a=n(42);n.d(t,"LogVars",(function(){return a.a}));n(14);var r=n(35);n.o(r,"getVars")&&n.d(t,"getVars",(function(){return r.getVars})),n.o(r,"varsReducer")&&n.d(t,"varsReducer",(function(){return r.varsReducer}));var c=n(36);n.d(t,"varsReducer",(function(){return c.a}));var u=n(19);n.d(t,"getVars",(function(){return u.c}))},,function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return c}));var a=function(e){return e.vars.vars},r=function(e){return e.vars.rawVars},c=function(e){return e.vars.bracketsError}},function(e,t,n){"use strict";var a=n(43);n.d(t,"Comment",(function(){return a.a}));n(15);var r=n(37);n.o(r,"commentReducer")&&n.d(t,"commentReducer",(function(){return r.commentReducer})),n.o(r,"getComment")&&n.d(t,"getComment",(function(){return r.getComment}));var c=n(38);n.d(t,"commentReducer",(function(){return c.a}));var u=n(25);n.d(t,"getComment",(function(){return u.a}))},,,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e){return e.comment}},,,,,,,,,,function(e,t){},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(26),r=n(5),c=n(14),u={vars:[],rawVars:"",bracketsError:""};function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.a.RESET_VARS:return Object(r.a)({},u);case c.a.UPDATE_VARS:return Object(r.a)(Object(r.a)({},e),{},{vars:Object(a.a)(t.vars),rawVars:t.rawVars,bracketsError:t.bracketsError});default:return e}}},function(e,t){},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(15);function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"your comment",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case a.a.RESET_COMMENT:return"your comment";case a.a.SET_COMMENT:return t.comment;default:return e}}},function(e,t){},function(e,t){},function(e,t,n){"use strict";var a=n(9),r=n(23),c=n.n(r),u=n(26),o=n(32),i=n(31),l=n(0),s=n.n(l);function f(e,t){return"".concat(e.lineStart).concat(t).concat(e.lineEnd)}function m(e,t){return e.charEscaper+t+e.charEscaper}function E(e,t){var n=function(e,t){var n=e.lineLength-t.length-2;return n<=0?t:e.filler.repeat(Math.floor(n/2))+" "+t+" "+e.filler.repeat(Math.ceil(n/2))}(e,t);return e.charEscaper&&(n=n.replace(new RegExp(e.charEscaper,"ig"),"\\".concat(e.charEscaper))),f(e,m(e,n))}function v(e){var t=m(e,e.filler.repeat(e.lineLength));return f(e,t)}n(65);function d(e){return g.apply(this,arguments)}function g(){return(g=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:navigator.clipboard.writeText(t);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var p=n(17),b=n(20),h=n(10);n.d(t,"a",(function(){return C}));var C=Object(a.b)((function(e){return{vars:Object(p.getVars)(e),comment:Object(b.getComment)(e),settings:Object(h.d)(e)}}))((function(e){var t=e.vars,n=e.comment,a=e.settings,r=Object(l.useState)(!1),g=Object(o.a)(r,2),p=g[0],b=g[1],h=Object(l.useState)(!1),C=Object(o.a)(h,2),O=C[0],S=C[1],T=a.generalPrefix,j=a.generalPostfix,R=v(a),N=t.map((function(e){return function(e,t){return f(e,m(e,"".concat(e.filler," ").concat(t,": "))+"".concat(e.variableConcatenateChar)+"".concat(e.variableWrapperCodePrefix).concat(t).concat(e.variableWrapperCodePostfix))}(a,e)})),P=[T,R,function(e,t){return t.split("\n").map((function(e){return e.trim()})).map((function(t){return t?E(e,t):v(e)})).join("\n")}(a,n),R].concat(Object(u.a)(N),[N.length>0?R:"",j]).filter(Boolean);return s.a.createElement("div",{className:"output card"},s.a.createElement("pre",{className:"card-body ".concat(p?"output__copied":""," ").concat(O?"hide-popup":"")},s.a.createElement("code",{onClick:Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(P.join("\n"));case 2:S(!1),b(!0),setTimeout((function(){S(!0)}),1e3);case 3:case"end":return e.stop()}}),e)})))},P.map((function(e,t){return s.a.createElement("div",{key:t},e)})))))}))},function(e,t,n){"use strict";var a=n(9),r=n(0),c=n.n(r),u=n(12),o=n(8),i=n(6),l=n(7),s=n(14),f=n(19);n.d(t,"a",(function(){return m}));var m=Object(a.b)((function(e){return{vars:Object(f.c)(e),rawVars:Object(f.b)(e),bracketsError:Object(f.a)(e)}}),(function(e){return{onChange:function(t){e(Object(s.c)(t))},resetVariables:function(){e(Object(s.b)())}}}))((function(e){var t=e.resetVariables,n=e.onChange,a=e.rawVars,r=e.bracketsError;return c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement("h3",null,"Variables")),c.a.createElement(i.a,{className:"text-right"},c.a.createElement(u.a,{variant:"outline-danger",size:"sm",onClick:function(){t()}},"Reset variables"))),c.a.createElement(l.a,{label:"Variable names to log",onChange:function(e){n(e)},value:a,errorMsg:r})))}))},function(e,t,n){"use strict";var a=n(9),r=n(0),c=n.n(r),u=n(12),o=n(8),i=n(6),l=n(7),s=n(15),f=n(25);n.d(t,"a",(function(){return m}));var m=Object(a.b)((function(e){return{comment:Object(f.a)(e)}}),(function(e){return{onChange:function(t){e(Object(s.c)(t))},resetComment:function(){e(Object(s.b)())}}}))((function(e){var t=e.resetComment,n=e.onChange,a=e.comment;return c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement("h3",null,"Comment")),c.a.createElement(i.a,{className:"text-right"},c.a.createElement(u.a,{variant:"outline-danger",size:"sm",onClick:function(){t()}},"Reset comment"))),c.a.createElement(l.a,{label:"The comment",type:l.b.TEXTAREA,onChange:function(e){return n(e)},value:a,rows:7})))}))},function(e,t,n){"use strict";var a=n(9),r=n(10),c=n(0),u=n.n(c),o=n(8),i=n(6),l=n(49),s=n(12);n.d(t,"a",(function(){return f}));var f=Object(a.b)((function(e){return{activePreset:e.settings.currentPreset}}),(function(e){return{changePreset:function(t){e(Object(r.g)(t))}}}))((function(e){return u.a.createElement(o.a,null,u.a.createElement(i.a,{className:"d-flex flex-column"},u.a.createElement("h3",null,"Presets"),u.a.createElement(l.a,{size:"sm",className:"mt-3"},Object.values(r.a).map((function(t){return u.a.createElement(s.a,{key:t,variant:e.activePreset===t?"primary":"outline-primary",onClick:function(){return e.changePreset(t)}},Object(r.c)(t).presetFullName)}))),u.a.createElement("br",null)))}))},,,function(e,t,n){"use strict";var a=n(41);n.d(t,"Output",(function(){return a.a}));n(39)},function(e,t,n){"use strict";var a=n(44);n.d(t,"Presets",(function(){return a.a}));n(40)},,,function(e,t,n){e.exports=n(68)},,,,,,,,,,,function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(24),u=n.n(c),o=n(16),i=n(9),l=n(50),s=(n(61),n(62),n(10)),f=n(17),m=n(20),E=n(47),v=n(48),d=n(8),g=n(6),p=(n(66),function(){return r.a.createElement(d.a,null,r.a.createElement(g.a,{className:"footer"},"Built: ","2022-02-13 - 10:32:56"))}),b=function(){return r.a.createElement(l.a,null,r.a.createElement("h1",null,"JS Development helpers"),r.a.createElement(v.Presets,null),r.a.createElement(s.b,null),r.a.createElement(f.LogVars,null),r.a.createElement(m.Comment,null),r.a.createElement(E.Output,null),r.a.createElement(p,null))},h=Object(o.b)({settings:s.i,vars:f.varsReducer,comment:m.commentReducer}),C=(n(67),function(){try{var e=localStorage.getItem("__state");if(null===e)return;return JSON.parse(e)}catch(t){return void console.log("Error was throw during store reading: ",t)}}()),O=Object(o.c)(h,C,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());O.subscribe((function(){!function(e){try{var t=JSON.stringify(e);localStorage.setItem("__state",t)}catch(n){console.log("Error was throw during store parsing: ",n)}}(O.getState())})),u.a.render(r.a.createElement(i.a,{store:O},r.a.createElement(b,null)),document.getElementById("root"))}],[[51,1,2]]]);
//# sourceMappingURL=main.be84d655.chunk.js.map