import{a as r,F as a,j as t}from"./jsx-runtime-095bf462.js";import{r as n}from"./index-8db94870.js";import{I as x}from"./IconSvg-5a64efdf.js";import"./SynapseClient-c43c6534.js";import{j as P,k as C}from"./useAccessRequirements-97deb603.js";import"./EntityTypeUtils-9aa47355.js";import"./getEndpoint-ac94413e.js";import{T as c}from"./TextField-49546e5e.js";import{D as U,a as L,b as T}from"./DialogTitle-cac35fb9.js";import{S as _}from"./Stack-49641969.js";import{B as k}from"./Box-fe8ef83e.js";import{I as w}from"./IconButton-d433d837.js";import{T as E}from"./Typography-b4a6e0b5.js";import{A as F}from"./Alert-19607992.js";import{B as b}from"./Button-b9be626b.js";function R(l){const{onSave:u,managedACTAccessRequirement:i,onHide:d}=l,[m,p]=n.useState(""),[g,h]=n.useState(""),[f,S]=n.useState(i.isIDURequired?"":void 0),[s,y]=n.useState(),{data:q,isLoading:D}=P(String(i.id),{staleTime:1/0,onSuccess:e=>{e!=null&&e.projectLead&&p(e==null?void 0:e.projectLead),e!=null&&e.institution&&h(e==null?void 0:e.institution),e!=null&&e.intendedDataUseStatement&&S(e==null?void 0:e.intendedDataUseStatement)},onError:e=>{console.log("RequestDataAccessStep1: Error getting research project data: ",e)}}),{mutate:A,isLoading:j}=C({onSuccess:e=>{u&&u(e)},onError:e=>{console.log("RequestDataAccessStep1: Error updating research project data: ",e),y({key:"error",message:I(e.reason)})}}),o=D||j,I=(e="")=>r(a,{children:[t("strong",{children:"Unable to update research project data."}),t("br",{}),e]}),v=e=>{e.preventDefault(),A({...q,accessRequirementId:String(i.id),institution:g,projectLead:m,intendedDataUseStatement:f})};return r(a,{children:[t(U,{children:r(_,{direction:"row",alignItems:"center",gap:"5px",children:["Request Access",t(k,{sx:{flexGrow:1}}),t(w,{onClick:d,children:t(x,{icon:"close",wrap:!1,sx:{color:"grey.700"}})})]})}),t(L,{children:r("form",{onSubmit:v,children:[t(E,{variant:"body1",children:"Please tell us about your project."}),t(c,{id:"project-lead",label:"Project Lead",disabled:o,type:"text",value:m,required:!0,onChange:e=>p(e.target.value)}),t(c,{id:"institution",label:"Institution",type:"text",disabled:o,value:g,required:!0,onChange:e=>h(e.target.value)}),i.isIDURequired&&t(c,{id:"data-use",label:r(a,{children:["Intended Data Use Statement -",i.isIDUPublic&&t("i",{id:"idu-visible",children:"this will be visible to the public"})]}),required:!0,multiline:!0,rows:10,disabled:o,value:f,onChange:e=>S(e.target.value)}),s&&t(F,{severity:s.key,children:s.message})]})}),r(T,{children:[t(b,{variant:"outlined",disabled:o,onClick:d,children:"Cancel"}),t(b,{variant:"contained",type:"submit",disabled:o,onClick:v,children:j?"Saving...":"Save changes"})]})]})}try{R.displayName="ResearchProjectForm",R.__docgenInfo={description:"Step 1 of the Data Access Request/Renewal flow prompts the user to provide information about their ResearchProject.",displayName:"ResearchProjectForm",props:{managedACTAccessRequirement:{defaultValue:null,description:"",name:"managedACTAccessRequirement",required:!0,type:{name:"ManagedACTAccessRequirement"}},onSave:{defaultValue:null,description:"",name:"onSave",required:!1,type:{name:"((researchProject: ResearchProject) => void)"}},onHide:{defaultValue:null,description:"",name:"onHide",required:!1,type:{name:"(() => void)"}}}}}catch{}export{R};
//# sourceMappingURL=ResearchProjectForm-2f3f3f47.js.map
