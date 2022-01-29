const defaultValue = {
    payload: {
        user: undefined,
        login: false,
        error: null,
    }
}

const userReducer = (State = defaultValue, action) => {
    switch (action.type) {
        case "Login_Started":
        case "SignUp_Started":
        case "SignOut_Started":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    login:action.payload.login,
                }
            }
        case "Login_Success":
        case "SignUp_Success":
            const userdata={
                userid:action.payload.user,login:action.payload.login
            }
            localStorage.setItem("User",JSON.stringify(userdata));
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    user: action.payload.user,
                    login:action.payload.login,
                    error: action.payload.error,
                    redirect:`/Form/${action.payload.user}`,
                }
            }

        case "SignOut_Success":
            const userdata1={
                userid:null,login:action.payload.login,
            }
            localStorage.setItem("User",JSON.stringify(userdata1));
            return defaultValue;

        case "Login_Fail":
        case "SignUp_Fail":
        case "SignOut_Fail":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                    login:action.payload.login,
                }
            }
        case "Check_User":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    login: action.payload.login,
                    user:action.payload.user,
                }
            }
        default:
            return State;
    }
}

export default userReducer;