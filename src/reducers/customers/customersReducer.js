const customersInitialState=[]

const customersReducer=(state=customersInitialState,action)=>{
    // console.log(action.payload,'user info from reducer');
    switch(action.type){
        case 'CUSTOMER_LIST':
            return [...action.payload]
        case 'ADD_CUSTOMER':
            return [...state,action.payload]
        default:
            return [...state]
    }

}

export default customersReducer