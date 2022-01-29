const defaultValue = {
    payload: {
        user: null,
        error: null,
        id:null,
        table: [],
        loading: false,
    }
}

const formReducer = (State = defaultValue, action) => {
    switch (action.type) {
        case "Post_Started":
        case "Delete_Started":
        case "Update_Started":
        case "ViewTable_Started":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                }
            }
        case "Post_Success":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    user: action.payload.user,
                    loading: action.payload.loading,
                }
            }
        case "Delete_Success":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    id: action.payload.id,
                    loading: action.payload.loading,
                }
            }
        case "Update_Success":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    user: action.payload.data,
                    id: action.payload.id,
                    loading: action.payload.loading,
                }
            }
        case "ViewTable_Success":
            return {
                ...State,
                payload: {
                    table: action.payload.table,
                    loading: action.payload.loading,
                }
            }

        case "Post_Fail":
        case "Delete_Fail":
        case "Update_Fail":
        case "ViewTable_Fail":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    error: action.payload.error,
                    loading: action.payload.loading,
                }
            }
        // case "View_Table":
        //     return {
        //         ...State,
        //         payload: {
        //             table: action.payload.table,
        //         }
        //     }
        case "SignOut_Success":
            return defaultValue;
        default:
            return State;
    }
}

export default formReducer;
