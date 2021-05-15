export const setLineItems=(item)=>{
     return {
         type:'UPDATE_CART',
         payload:item
     }
 }

 export const setClearLineItems=()=>{
     return {
         type:'CLEAR_CART'
     }
 }