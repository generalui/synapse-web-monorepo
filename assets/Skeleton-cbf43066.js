import{_ as y}from"./objectWithoutPropertiesLoose-4f48578a.js";import{_ as r}from"./extends-98964cd2.js";import{r as x}from"./index-8db94870.js";import{g as _,e as R,s as S,k as $,f as U,i as M,j}from"./styled-2cba4329.js";import{j as A}from"./jsx-runtime-095bf462.js";import{k as b,c as u}from"./emotion-react.browser.esm-9ef79d4e.js";function X(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function N(t){return parseFloat(t)}function B(t){return _("MuiSkeleton",t)}R("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const F=["animation","className","component","height","style","variant","width"];let s=t=>t,p,m,f,g;const K=t=>{const{classes:a,variant:e,animation:i,hasChildren:o,width:l,height:n}=t;return j({root:["root",e,i,o&&"withChildren",o&&!l&&"fitContent",o&&!n&&"heightAuto"]},B,a)},P=b(p||(p=s`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),T=b(m||(m=s`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),W=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=X(t.shape.borderRadius)||"px",i=N(t.shape.borderRadius);return r({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:$(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${e}/${Math.round(i/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&u(f||(f=s`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),P),({ownerState:t,theme:a})=>t.animation==="wave"&&u(g||(g=s`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),T,(a.vars||a).palette.action.hover)),E=x.forwardRef(function(a,e){const i=U({props:a,name:"MuiSkeleton"}),{animation:o="pulse",className:l,component:n="span",height:h,style:v,variant:k="text",width:C}=i,d=y(i,F),c=r({},i,{animation:o,component:n,variant:k,hasChildren:!!d.children}),w=K(c);return A(W,r({as:n,ref:e,className:M(w.root,l),ownerState:c},d,{style:r({width:C,height:h},v)}))}),G=E;export{G as S};
//# sourceMappingURL=Skeleton-cbf43066.js.map
