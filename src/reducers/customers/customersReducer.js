const customersInitialState=[]

const customersReducer=(state=customersInitialState,action)=>{
    // console.log(action.payload,'user info from reducer');
    switch(action.type){
        case 'CUSTOMER_LIST':
            return [...action.payload]
        case 'ADD_CUSTOMER':
            return [...state,action.payload]
        case 'UPDATE_CUSTOMER':{
            console.log(action.payload,'user info from reducer');
            return state.map((ele)=>{
                    if(ele._id===action.payload._id){
                        return {...ele,...action.payload}
                    }else{
                        return {...ele}
                    }
                })
        }
        case 'DELETE_CUSTOMER':{
            return state.filter((customer)=>{
                if(customer._id!==action.payload._id){
                    return {...customer}
                }
            })
        }
            
        default:
            return [...state]
    }

}

export default customersReducer