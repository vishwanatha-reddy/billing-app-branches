const productsInitialState=[];

const productsReducer=(state=productsInitialState,action)=>{
    switch(action.type){
        case 'PRODUCTS_LIST':
            return [...action.payload]
        case 'ADD_PRODUCT':
           return [...state, action.payload]
        case 'UPDATE_PRODUCT':{
               return state.map((ele)=>{
                   if(ele._id===action.payload._id){
                       return {...ele,...action.payload}
                   }else{
                       return {...ele}
                   }
               })}
        case 'DELETE_PRODUCT':{
            return state.filter((bill)=>{
                if(bill._id!==action.payload._id){
                    return {...bill}
                }
            })
        }
               
        default:
            return [...state]
    }

}

export default productsReducer