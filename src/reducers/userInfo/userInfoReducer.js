const userInfoInitialState={};

const userInfoReducer=(state=userInfoInitialState,action)=>{
    // console.log(action.payload,'user info from reducer');
    switch(action.type){
        case 'USER_INFO':
            return {...action.payload}
        default:
            return {...state}
    }

}

export default userInfoReducer