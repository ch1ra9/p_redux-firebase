import axios from "axios";
import viewTable from "./viewTable";

const Update_Started = () =>{
    return{
        type:"Update_Started",
        payload:{
            loading: true,
        }
    }
}

const Update_Success =(data,id) =>{
    return{
        type:"Update_Success",
        payload:{
            id,
            data,
            loading: false,
        },
    }
}

const Update_Fail = (error) =>{
    return{
        type:"Update_Fail",
        payload: {
            error,
            loading: false,}
    }
}


const Update_Initialize = (data,id,userid) =>{
    return async function (dispach) {
        dispach(Update_Started());
        try {
            const res = await axios.put(`https://redux-form-58d2c-default-rtdb.firebaseio.com//Form${userid}/${id}.json`,data);
            dispach(Update_Success(data,id));
            dispach(viewTable(userid));
        } catch (error) {
            dispach(Update_Fail(error.message));
        }
    }
}

export default Update_Initialize;