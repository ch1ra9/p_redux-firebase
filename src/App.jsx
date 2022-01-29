import React, {useEffect, useState} from 'react';
import Form from "./Pages/Form";
import {Route, Routes, useNavigate} from "react-router";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SignOut_Initialize from "./UserActions/SignOutUser";
import "./App.css";
import Loader from "./Loader/loader";

const App = () => {
    const user = useSelector((State=>State.user));
    const dispach = useDispatch();
    const navigate =useNavigate();
    const [login, setLogin] = useState(false);
    useEffect(()=>{
        const userdata1={
            userid:null,login:false,
        }
        if(localStorage.getItem("User")===null) {
            localStorage.setItem("User", JSON.stringify(userdata1));
        }
    },[])
    useEffect(()=>{
        const {login} = JSON.parse(localStorage.getItem("User"));
        setLogin(login);
    },[user.payload.login])

    // console.log(login)
    return (
        <>
            <div className="nav">
                <div className="navname">
                    <ul>
                        <li><h3>Form</h3></li>
                        <li><Link to="/">Home</Link></li>
                        <li>{login?<Link to={`/Form/${user.payload.user}`}> Form </Link>:<Link to="/SignUp"> Sign Up </Link>}</li>
                        {
                            login?<li><button onClick={()=>{
                                dispach(SignOut_Initialize());
                                // if(resp) return navigate("/");
                                // window.location.reload();
                            }}>Sign Out</button></li>:<li><Link to="/Login"> Sign In </Link></li>
                        }
                    </ul>
                </div>
                <div className="barsearch">
                    <input type="search" placeholder="Search" aria-label="Search"/>
                        <button type="submit">Search</button>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Form/:id" element={<Form/>}/>
            </Routes>
        </>
    );
};

export default App;
