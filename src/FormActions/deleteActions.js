import axios from "axios";
import viewTable from "./viewTable";

const Delete_Started = () =>{
    return{
        type:"Delete_Started",
        payload:{
            loading: true,
        }
    }
}

const Delete_Success =(id) =>{
    return{
        type:"Delete_Success",
        payload:{
            id,
            loading: false,
        },
    }
}

const Delete_Fail = (error) =>{
    return{
        type:"Delete_Fail",
        payload: {
            error,
            loading: false,
        },
    }
}


const Delete_Initialize = (id,userid) =>{
    return async function (dispach) {
        dispach(Delete_Started());
        try {
            const res = await axios.delete(`https://redux-form-58d2c-default-rtdb.firebaseio.com//Form${userid}/${id}.json`);
            dispach(Delete_Success(id));
            dispach(viewTable(userid));
        } catch (error) {
            dispach(Delete_Fail(error.message()));
        }
    }
}

export default Delete_Initialize;