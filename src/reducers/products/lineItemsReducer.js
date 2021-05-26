const itemsInitialState=[];

const lineItemsReducer=(state=itemsInitialState,action)=>{
    // console.log(action.payload,'user info from reducer');
    switch(action.type){
        case 'UPDATE_CART':
            return [...state,action.payload]
        case 'CLEAR_CART':
            return itemsInitialState
        case 'DELETE_CARTITEM':{
            return state.filter(prod=>{
                if(prod.product!=action.payload.product.toString()){
                    return {...prod}
                }
            })
        }
        default:
            return [...state]
    }

}

export default lineItemsReducer