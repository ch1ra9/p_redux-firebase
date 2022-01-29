const SignOut_Started = () =>{
    return{
        type:"SignOut_Started",
        payload:{
            loading: true,
            login:true,
        }
    }
}

const SignOut_Success =() =>{
    return{
        type:"SignOut_Success",
        payload: {
            user:null,
            loading: false,
            login:false,
            error: ""
        }
    }
}

const SignOut_Fail = (error) =>{
    return{
        type:"SignOut_Fail",
        payload:{
            error,
            loading: false,
            login:true,
        }
    }
}


const SignOut_Initialize = () =>{
    return async function (dispach) {
        dispach(SignOut_Started());
        try{
            setTimeout(() => {
                dispach(SignOut_Success());
            }, 1000);
        }catch (error){
            dispach(SignOut_Fail(error.message));
        }
    }
}

export default SignOut_Initialize;

