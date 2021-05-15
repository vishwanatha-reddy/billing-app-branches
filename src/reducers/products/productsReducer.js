const productsInitialState=[];

const productsReducer=(state=productsInitialState,action)=>{
    // console.log(action.payload,'user info from reducer');
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

               
        default:
            return [...state]
    }

}

export default productsReducer