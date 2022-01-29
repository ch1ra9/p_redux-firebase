import auth from "../firebase";

const SignUp_Started = () =>{
    return{
        type:"SignUp_Started",
        payload:{
            loading: true,
            login: false,
        }
    }
}

const SignUp_Success =(user) =>{
    return{
        type:"SignUp_Success",
        payload: {
            user,
            loading: false,
            login: true,
        }
    }
}

const SignUp_Fail = (error) =>{
    return{
        type:"SignUp_Fail",
        payload:{
            error,
            loading: false,
            login:false,
        }
    }
}


const SignUp_Initialize = (user) =>{
    const {username,email,password} = user;
    return async function (dispach) {
        dispach(SignUp_Started());
        auth.createUserWithEmailAndPassword(email,password).then(({user}) => {
            user.updateProfile({username});
            dispach(SignUp_Success(user.uid));
        }).catch((error)=>dispach(SignUp_Fail(error.message)))
    }
}

export default SignUp_Initialize;