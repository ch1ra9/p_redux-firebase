import axios from "axios";
import viewTable from "./viewTable";

const Post_Started = () =>{
    return{
        type:"Post_Started",
        payload:{
            loading: true,
        }
    }
}

const Post_Success =(user) =>{
    return{
        type:"Post_Success",
        payload: {
            user,
            loading: false,
        }
        }
    }

const Post_Fail = (error) =>{
    return{
        type:"Post_Fail",
        payload:{
            error,
            loading: false,
        }
    }
}


const Post_Initialize = (user,userid) =>{
    return async function (dispach) {
        dispach(Post_Started());
        try {
            const res = await axios.post(`https://redux-form-58d2c-default-rtdb.firebaseio.com//Form${userid}.json`, user);
            dispach(Post_Success(user));
            dispach(viewTable(userid));
        } catch (error) {
            dispach(Post_Fail(error.message));
        }
    }
}

export default Post_Initialize;