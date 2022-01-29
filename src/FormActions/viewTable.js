import axios from "axios";

let getData = [];

const ViewTable_Started = () => {
    return {
        type: "ViewTable_Started",
        payload: {
            loading: true,
        }
    }
}

const ViewTable_Success = (table) => {
    return {
        type: "ViewTable_Success",
        payload: {
            table,
            loading: false,
        }
    }
}

const ViewTable_Fail = (error) => {
    return {
        type: "ViewTableFail",
        payload: {
            error,
            loading: false,
        }
    }
}


const viewTable = (userid) => {
    return async function (dispach) {
        dispach(ViewTable_Started());
        try {
            const resp = await axios.get(`https://redux-form-58d2c-default-rtdb.firebaseio.com//Form${userid}.json`);
            // console.log(resp,"resp");
            let fetchData = [];
            for (let key in resp.data) {
                fetchData.push({
                    id: key,
                    data: resp.data[key],
                });
            }
            getData = fetchData;
            // dispach({
            //     type: "View_Table",
            //     payload: {
            //         table: getData,
            //     }
            // });
            dispach(ViewTable_Success(getData));
        } catch (error) {
            // console.log(e);
            dispach(ViewTable_Fail(error.message));
        }
    }
}

export default viewTable;