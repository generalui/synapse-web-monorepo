import{j as e,a as t}from"./jsx-runtime-095bf462.js";import{I as m}from"./Icon-08f02968.js";import{P as g}from"./Paper-16fb121c.js";import{B as a}from"./Box-fe8ef83e.js";import{T as o}from"./Typography-b4a6e0b5.js";import{S as n}from"./Skeleton-cbf43066.js";import{s as f}from"./styled-2cba4329.js";const c=f(g,{label:"ActionRequiredCardContainer"})(({theme:i})=>({padding:`${i.spacing(2.5)} ${i.spacing(4)}`,display:"grid",alignItems:"center",gridTemplateColumns:"160px auto 200px",gap:i.spacing(4)}));function d(i){if(i.isLoading)return e(h,{});const{title:l,description:s,iconType:u,count:r,actionNode:p}=i;return t(c,{children:[e(a,{sx:{textAlign:"center",minWidth:"100px"},children:e(m,{type:u})}),t(a,{sx:{flexGrow:1},children:[e(o,{variant:"headline3",sx:{mb:1},children:l}),r&&t(o,{variant:"smallText1",sx:{my:1,color:"grey.700"},children:[r," File",r!=1?"s":""]}),e(o,{variant:"smallText1",children:s})]}),e(a,{sx:{textAlign:"center",marginLeft:"auto"},children:p})]})}function h(){return t(c,{children:[e(n,{variant:"rectangular",width:136,height:74}),t("div",{children:[e(n,{width:320}),e(n,{width:100})]}),e(n,{variant:"rectangular",width:160,height:33})]})}try{d.displayName="ActionRequiredCard",d.__docgenInfo={description:`The ActionRequiredCard component renders a generic card that represents some action that a user must take to gain
download access to a file.`,displayName:"ActionRequiredCard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"ReactNode"}},actionNode:{defaultValue:null,description:"",name:"actionNode",required:!0,type:{name:"ReactNode"}},iconType:{defaultValue:null,description:"",name:"iconType",required:!0,type:{name:"string"}},count:{defaultValue:null,description:"",name:"count",required:!1,type:{name:"number"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}}}}}catch{}export{d as A,h as L};
//# sourceMappingURL=ActionRequiredCard-11ba6007.js.map
