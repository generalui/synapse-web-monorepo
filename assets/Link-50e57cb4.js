import{_ as B}from"./objectWithoutPropertiesLoose-4f48578a.js";import{_ as a}from"./extends-98964cd2.js";import{r as y}from"./index-8db94870.js";import{e as j,g as M,r as h,k as _,s as N,m as x,f as P,i as U,j as z}from"./styled-2cba4329.js";import{j as W}from"./jsx-runtime-095bf462.js";import{T as H}from"./Typography-b4a6e0b5.js";import{u as w}from"./TransitionGroupContext-53ae1513.js";import{u as E}from"./useForkRef-2674f3de.js";function I(e){return M("MuiLink",e)}const O=j("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),S=O,g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},q=e=>g[e]||e,G=({theme:e,ownerState:o})=>{const n=q(o.color),r=h(e,`palette.${n}`,!1)||o.color,s=h(e,`palette.${n}Channel`);return"vars"in e&&s?`rgba(${s} / 0.4)`:_(r,.4)},J=G,K=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],Q=e=>{const{classes:o,component:n,focusVisible:r,underline:s}=e,t={root:["root",`underline${x(s)}`,n==="button"&&"button",r&&"focusVisible"]};return z(t,I,o)},X=N(H,{name:"MuiLink",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:n}=e;return[o.root,o[`underline${x(n.underline)}`],n.component==="button"&&o.button]}})(({theme:e,ownerState:o})=>a({},o.underline==="none"&&{textDecoration:"none"},o.underline==="hover"&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},o.underline==="always"&&a({textDecoration:"underline"},o.color!=="inherit"&&{textDecorationColor:J({theme:e,ownerState:o})},{"&:hover":{textDecorationColor:"inherit"}}),o.component==="button"&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${S.focusVisible}`]:{outline:"auto"}})),Y=y.forwardRef(function(o,n){const r=P({props:o,name:"MuiLink"}),{className:s,color:t="primary",component:c="a",onBlur:u,onFocus:p,TypographyClasses:k,underline:C="always",variant:m="inherit",sx:l}=r,L=B(r,K),{isFocusVisibleRef:d,onBlur:V,onFocus:v,ref:F}=w(),[D,f]=y.useState(!1),R=E(n,F),T=i=>{V(i),d.current===!1&&f(!1),u&&u(i)},$=i=>{v(i),d.current===!0&&f(!0),p&&p(i)},b=a({},r,{color:t,component:c,focusVisible:D,underline:C,variant:m}),A=Q(b);return W(X,a({color:t,className:U(A.root,s),classes:k,component:c,onBlur:T,onFocus:$,ref:R,ownerState:b,variant:m,sx:[...Object.keys(g).includes(t)?[]:[{color:t}],...Array.isArray(l)?l:[l]]},L))}),ao=Y;export{ao as L};
//# sourceMappingURL=Link-50e57cb4.js.map
