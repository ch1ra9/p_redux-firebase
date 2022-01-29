import auth from "../firebase";

const Login_Started = () =>{
    return{
        type:"Login_Started",
        payload:{
            loading: true,
            login:false,
        }
    }
}

const Login_Success =(user) =>{
    return{
        type:"Login_Success",
        payload: {
            user,
            loading: false,
            login: true,
        }
    }
}

const Login_Fail = (error) =>{
    return{
        type:"Login_Fail",
        payload:{
            error,
            loading: false,
            login: false,
        }
    }
}


const Login_Initialize = (user) =>{
    const {email,password} = user;
    return async function (dispach) {
        dispach(Login_Started());
       auth.signInWithEmailAndPassword(email,password).then(({user}) => {
           dispach(Login_Success(user.uid));
    }).catch((error)=>dispach(Login_Fail(error.message)))
}
}

export default Login_Initialize;