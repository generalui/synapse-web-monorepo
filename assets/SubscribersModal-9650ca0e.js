import{a as g,j as l}from"./jsx-runtime-095bf462.js";import{C}from"./ConfirmationDialog-85b82184.js";import{u,am as S,S as o,an as b,bP as _,bJ as L}from"./SynapseClient-c43c6534.js";import{u as y}from"./useMutation-424ee4ed.js";import{r as A}from"./index-8db94870.js";import{U as w}from"./UserCard-6a6e23dc.js";import{S as T}from"./SynapseConstants-1ebc8be6.js";import{L as k}from"./Link-50e57cb4.js";function Q(e,s){const{accessToken:i,keyFactory:t}=u();return S(t.getSubscribersQueryKey(e.objectId,e.objectType),()=>o.getSubscribers(i,e),s)}function M(e,s,i){const{accessToken:t,keyFactory:r}=u(),n=async()=>{const a={objectType:s,idList:[e],sortByType:_.OBJECT_ID,sortDirection:L.ASC};return(await o.postSubscriptionList(t,a)).results[0]};return S(r.getSubscriptionQueryKey(e,s),n,i)}function v(e){const s=b(),{accessToken:i,keyFactory:t}=u();return y(r=>o.postSubscription(i,r),{...e,onSuccess:async(r,n,a)=>{await s.invalidateQueries(t.getAllSubscriptionsQueryKey()),await s.invalidateQueries(t.getSubscribersQueryKey(n.objectId,n.objectType)),e!=null&&e.onSuccess&&await e.onSuccess(r,n,a)}})}function D(e){const s=b(),{accessToken:i,keyFactory:t}=u();return y(r=>o.deleteSubscription(i,r),{...e,onSuccess:async(r,n,a)=>{await s.invalidateQueries(t.getAllSubscriptionsQueryKey()),await s.invalidateQueries(t.getAllSubscribersQueryKey()),e!=null&&e.onSuccess&&await e.onSuccess(r,n,a)}})}const h=(e,s)=>{const{data:i,isLoading:t}=M(e,s),{data:r}=Q({objectId:e,objectType:s}),{mutate:n,isLoading:a}=v(),{mutate:c,isLoading:p}=D(),m=t||a||p,f=A.useCallback(()=>{i?c(i.subscriptionId):n({objectId:e,objectType:s})},[c,e,s,n,i]);return{isLoading:m,subscription:i,toggleSubscribed:f,subscribers:r}},d=({id:e,objectType:s,showModal:i,handleModal:t})=>{const{subscribers:r}=h(e,s);return g("div",{className:"SubscribersModal",children:[r&&r.subscribers.length>0&&l(k,{onClick:()=>t(!0),children:`Followers (${r.subscribers.length})`}),l(C,{open:i,onCancel:()=>t(!1),title:"Followers",content:r&&r.subscribers.map(n=>l(w,{ownerId:n,size:T,showCardOnHover:!0},n)),onConfirm:()=>t(!1),confirmButtonText:"Ok",hasCancelButton:!1})]})};try{d.displayName="SubscribersModal",d.__docgenInfo={description:"",displayName:"SubscribersModal",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},objectType:{defaultValue:null,description:"",name:"objectType",required:!0,type:{name:"enum",value:[{value:'"FORUM"'},{value:'"THREAD"'},{value:'"DATA_ACCESS_SUBMISSION"'},{value:'"DATA_ACCESS_SUBMISSION_STATUS"'}]}},showModal:{defaultValue:null,description:"",name:"showModal",required:!0,type:{name:"boolean"}},handleModal:{defaultValue:null,description:"",name:"handleModal",required:!0,type:{name:"(a: boolean) => void"}}}}}catch{}export{d as S,h as u};
//# sourceMappingURL=SubscribersModal-9650ca0e.js.map
