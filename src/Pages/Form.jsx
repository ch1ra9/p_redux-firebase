import React, {useEffect, useState} from 'react';
import "./Form.css";
import {useDispatch, useSelector} from "react-redux";
import Table from "../Table";
import Post_Initialize from "../FormActions/postActions";
import deleteActions from "../FormActions/deleteActions";
import Update_Initialize from "../FormActions/updateActions";
import viewTable from "../FormActions/viewTable";
import Loader from "../Loader/loader";
import {useNavigate, useParams} from "react-router";
import checkUser from "../FormActions/checkUser";

function Form() {

    // const [getData, setGetData] = useState([]);
    const [uid, setUid] = useState(-1);
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        number: "",
    });

    const data = useSelector((state => state.form));
    const user = useSelector((State => State.user));
    // console.log(user);

    const userid = useParams().id;

    // console.log(userid);
    // console.log("loading",data.loading);
    // console.log("Data",data.payload.table);
    // console.log("Data",data.payload.table[0].data.fname);
    // console.log(data[0].payload.fname);
    // console.log(details)
    const dispach = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(user.payload.login){
    //         dispach(viewTable(userid));
    //     }
    // }, [dispach])
    // const {login} = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        if (localStorage.getItem("User") === null) {
            navigate("/");
        } else {
            const {userid, login} = JSON.parse(localStorage.getItem("User"));
            if (login) {
                dispach(checkUser(userid, login));
                dispach(viewTable(userid));
            }
            if (!login) {
                navigate("/");
            }
        }
    }, [dispach, navigate, user.payload.login])

    // useEffect(() => {
    //     // if (!user.payload.login) {
    //     //     navigate("/");
    //     // }
    //     console.log("l",logindetails.login,"u",user.payload.login)
    //     if (!logindetails.login) {
    //         navigate("/");
    //     }
    //
    //     // if(!login){
    //     //     navigate("/");
    //     // }
    // }, [logindetails.login,user.payload.user,user.payload.login]);

    // useEffect(() => {
    //     if (!user.payload.login) {
    //         navigate("/Login")
    //     }
    //     else{
    //         navigate(`/Form/${user.payload.user}`)
    //     }
    // }, [user.payload.login])

    const Handler = (event) => {
        const {name, value} = event.target;
        setDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const toSubmit = () => {
        const data = JSON.stringify(
            {
                fname: details.fname,
                lname: details.lname,
                email: details.email,
                number: details.number,
            })
        if (uid === -1) {
            dispach(Post_Initialize(data, userid));
        } else {
            dispach(Update_Initialize(data, uid, userid));
            setUid(-1);
        }

        setDetails({fname: "", email: "", number: "", lname: ""});
    }


    // const toSubmit = async () => {
    //     try {
    //         const data = JSON.stringify(
    //             {
    //                 fname: details.fname,
    //                 lname: details.lname,
    //                 email: details.email,
    //                 number: details.number,
    //             })
    //         const res = await axios.post("https://redux-form-58d2c-default-rtdb.firebaseio.com//Form.json", data
    //         )
    //         setDetails({fname: "", email: "", number: "", lname: ""});
    //         alert("Data Uploaded");
    //     } catch (e) {
    //         console.log(e)
    //     }
    //
    // }

    // useEffect(async () => {
    //     try {
    //         const resp = await axios.get("https://redux-form-58d2c-default-rtdb.firebaseio.com//Form.json");
    //         // console.log(resp.data);
    //         let fetchData = [];
    //         for (let key in resp.data) {
    //             fetchData.push({
    //                 id: key,
    //                 data: resp.data[key],
    //             });
    //         }
    //         console.log("a",fetchData);
    //         setGetData(fetchData);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // },[])
    //
    // console.log("fetch",getData)

    // const toShow = (index) => {
    //     navigate(`/${index}`);
    //     console.log("Show", index);
    // }

    const toDelete = (index) => {
        dispach(deleteActions(index, userid));
    }

    const toUpdate = (index) => {
        // console.log(index)
        // updateId = index;
        setUid(index);
        const id = data.payload.table.findIndex((element) => element.id === index)
        // console.log(id);
        setDetails({
            fname: data.payload.table[id].data.fname,
            lname: data.payload.table[id].data.lname,
            email: data.payload.table[id].data.email,
            number: data.payload.table[id].data.number,
        });
    }

    // const signOut = () =>{
    //     try{
    //         dispach(SignOut_Initialize());
    //         navigate("/");
    //     }catch (e){
    //         console.log(e);
    //     }
    //
    // }
    //
    // const toUpdate = (id) =>{
    //     updateIndex=data.findIndex((e)=>e.payload.id===id)
    //     // updateIndex2 = id-1;
    //     console.log(updateIndex);
    //     setDetails({
    //         fname: data[updateIndex].payload.fname,
    //         lname: data[updateIndex].payload.lname,
    //         email: data[updateIndex].payload.email,
    //         number: data[updateIndex].payload.number,
    //     })
    // }
    // console.log(data.payload)

    return (
        <>

            <div className="Form-Page">
                {
                    (data.payload.loading || user.payload.loading) ?
                        <Loader/> :
                        <div>
                            <div className="form">
                                <div className="title">Welcome</div>
                                <div className="subtitle">Let's create your account!</div>
                                <div className="input-container ic1">
                                    <input id="firstname" className="input" type="text" placeholder=" " name="fname"
                                           value={details.fname} onChange={Handler}/>
                                    <div className="cut"></div>
                                    <label htmlFor="firstname" className="placeholder">First name</label>
                                </div>
                                <div className="input-container ic2">
                                    <input id="lastname" className="input" type="text" placeholder=" " name="lname"
                                           value={details.lname} onChange={Handler}/>
                                    <div className="cut"></div>
                                    <label htmlFor="lastname" className="placeholder">Last name</label>
                                </div>
                                <div className="input-container ic2">
                                    <input id="email" className="input" type="text" placeholder=" " name="email"
                                           value={details.email}
                                           onChange={Handler}/>
                                    <div className="cut cut-short"></div>
                                    <label htmlFor="email" className="placeholder">Email</label>
                                </div>
                                <div className="input-container ic2">
                                    <input id="number" className="input" type="number" placeholder=" " name="number"
                                           value={details.number} onChange={Handler}/>
                                    <div className="cut cut-short"></div>
                                    <label htmlFor="number" className="placeholder">Mobile</label>
                                </div>
                                <button type="text" className="submit" onClick={toSubmit}>submit</button>
                            </div>
                            <div className="table">
                                <table className="rwd-table">
                                    <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                    </tr>
                                    {
                                        (data.payload.table).map((element, i) => {
                                            // console.log(element.id);
                                            return (
                                                <Table
                                                    key={i}
                                                    srNo={i + 1}
                                                    id={element.id}
                                                    fname={element.data.fname}
                                                    onSubmit1={toDelete}
                                                    onSubmit2={toUpdate}
                                                />

                                            )

                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
            </div>


        </>
    );
}

export default Form;