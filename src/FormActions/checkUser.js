const checkUser = (userid,login)=>{
    return{
        type:"Check_User",
        payload:{
            user:userid,
            login,
        }
    }
}

export default checkUser;