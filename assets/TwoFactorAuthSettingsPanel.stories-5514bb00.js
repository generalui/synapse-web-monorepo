import{a as n,j as o}from"./jsx-runtime-095bf462.js";import{d as u}from"./ToastMessage-6e66d93f.js";import{I as v}from"./IconSvg-5a64efdf.js";import{u as B,a as F,T as k}from"./TwoFactorEnrollmentForm-fec76807.js";import{C as s}from"./ConditionalWrapper-51b8d1ed.js";import{B as x}from"./Box-fe8ef83e.js";import{T as a}from"./Typography-b4a6e0b5.js";import{S as d}from"./Skeleton-cbf43066.js";import{S}from"./Stack-49641969.js";import{B as l}from"./Button-b9be626b.js";import{P as C}from"./Paper-16fb121c.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./FullWidthAlert-51eedfbf.js";import"./Alert-e578e9d5.js";import"./extends-98964cd2.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./Button-5637ed55.js";import"./createWithBsPrefix-0fdadc7a.js";import"./inheritsLoose-c82a83d4.js";import"./index-8ce4a492.js";import"./index-58d3fd43.js";import"./Clear-398befb5.js";import"./createSvgIcon-02cd1a2a.js";import"./SvgIcon-bc070951.js";import"./styled-2cba4329.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-29d231ba.js";import"./Tooltip-b11baf92.js";import"./useTheme-d9b5c73e.js";import"./ownerDocument-613eb639.js";import"./useForkRef-2674f3de.js";import"./useEnhancedEffect-c45cae33.js";import"./isHostComponent-73d6e646.js";import"./useControlled-be22aa93.js";import"./useEventCallback-65e61675.js";import"./utils-8d96ae5c.js";import"./TransitionGroupContext-53ae1513.js";import"./TransitionGroup-5e0fc2af.js";import"./assertThisInitialized-081f9914.js";import"./hasClass-ec9efd32.js";import"./uniqueId-4d05949d.js";import"./toString-cc90cb98.js";import"./isArray-5e3f9107.js";import"./isSymbol-7c514724.js";import"./ErrorOutlined-fccff164.js";import"./InfoOutlined-d944994d.js";import"./LeftRightPanel-f5cf7755.js";import"./SynapseClient-c43c6534.js";import"./SynapseConstants-1ebc8be6.js";import"./getEndpoint-ac94413e.js";import"./Link-50e57cb4.js";import"./dayjs.min-8d4ef725.js";import"./hoist-non-react-statics.cjs-775f1375.js";import"./inputBaseClasses-564a6ee4.js";import"./Fade-2249b304.js";import"./EntityTypeUtils-9aa47355.js";import"./IsType-0acbe7b9.js";import"./TextField-49546e5e.js";import"./InputLabel-f53e5970.js";import"./ownerWindow-698471fc.js";import"./emotion-react.browser.esm-9ef79d4e.js";import"./isMuiElement-08f54e3c.js";import"./LoadingScreen-62f7a4ed.js";import"./LinearProgress-3152c9d3.js";import"./Backdrop-0451e96c.js";import"./useMutation-424ee4ed.js";import"./Dialog-1654f0cb.js";import"./DialogTitle-cac35fb9.js";import"./Modal-cf7a81a7.js";import"./getScrollbarSize-ac846fe6.js";import"./createChainedFunction-0bab83cf.js";import"./IconButton-d433d837.js";import"./ButtonBase-bdd58ec3.js";import"./Divider-a55dd0d0.js";import"./extendSxProp-a6a93bb0.js";function m(e){const{onRegenerateBackupCodes:w,onBeginTwoFactorEnrollment:y}=e,{data:t,isLoading:c}=B(),r=(t==null?void 0:t.status)==="ENABLED",{mutate:A,isLoading:T}=F({onSuccess:()=>{u("2FA removed from this account","info")}}),i=c||T;return n(x,{children:[o(a,{variant:"headline2",children:"Two-factor Authentication (2FA)"}),o(s,{condition:i,wrapper:d,children:n(a,{variant:"body1",color:r?"success.main":"error.main",sx:{my:2,display:"flex",alignItems:"center"},children:[o(v,{icon:r?"check":"cross",sx:{mr:1,height:"24px"}}),i?"Loading...":r?"Active":"Inactive"]})}),o(a,{variant:"body1Italic",sx:{my:1},children:"Required to satisfy certain data access requirements, and recommended for overall account security."}),o(a,{variant:"body1",sx:{my:2},children:"Synapse uses a time-based system, which you can set up using an app like Google Authenticator, Duo Mobile, Microsoft Authenticator, or Authy. Certain data may require 2FA to be turned on for your account in order to request access."}),n(S,{direction:"row",gap:1,children:[o(s,{condition:c,wrapper:d,children:n(l,{variant:"outlined",disabled:i,onClick:()=>{r?A():y()},children:[r?"Deactivate":"Activate"," 2FA"]})}),(t==null?void 0:t.status)!=="DISABLED"&&o(s,{condition:c,wrapper:d,children:o(l,{variant:"text",disabled:i,onClick:()=>{w()},children:"Regenerate Backup Codes"})}),o(l,{variant:"text",onClick:()=>window.open(k,"_blank"),children:"More Information"})]})]})}try{m.displayName="TwoFactorAuthSettingsPanel",m.__docgenInfo={description:"",displayName:"TwoFactorAuthSettingsPanel",props:{onRegenerateBackupCodes:{defaultValue:null,description:"",name:"onRegenerateBackupCodes",required:!0,type:{name:"() => void"}},onBeginTwoFactorEnrollment:{defaultValue:null,description:"",name:"onBeginTwoFactorEnrollment",required:!0,type:{name:"() => void"}}}}}catch{}const Xo={title:"Authentication/TwoFactorSettingsPanel",component:m,render:e=>o(C,{sx:{p:7,mx:"auto",width:"720px"},children:o(m,{...e})})},p={args:{onBeginTwoFactorEnrollment:()=>{u("In-app, you would now redirect to the two-factor enrollment page","info")},onRegenerateBackupCodes:()=>{u("In-app, you would now redirect to the backup codes page","info")}}};var g,h,f;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    onBeginTwoFactorEnrollment: () => {
      displayToast('In-app, you would now redirect to the two-factor enrollment page', 'info');
    },
    onRegenerateBackupCodes: () => {
      displayToast('In-app, you would now redirect to the backup codes page', 'info');
    }
  }
}`,...(f=(h=p.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const Yo=["Demo"];export{p as Demo,Yo as __namedExportsOrder,Xo as default};
//# sourceMappingURL=TwoFactorAuthSettingsPanel.stories-5514bb00.js.map
