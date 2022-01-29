import React, {useEffect, useState} from 'react';
import "./Login.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Login_Initialize from "../UserActions/LoginUser";
import {useNavigate} from "react-router";
import Loader from "../Loader/loader";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const [logindetails, setLogindetails] = useState({
        login:false,userid:""
    });

    const user = useSelector((State => State.user));
    // console.log(user.payload.redirect)
    // const {login} = JSON.parse(localStorage.getItem("User"))
    // console.log(login);

    const dispach = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const userdata1={
            userid:null,login:false,
        }
        if(localStorage.getItem("User")===null) {
            localStorage.setItem("User", JSON.stringify(userdata1));
        }
    },[])

    // const {userid,login} = JSON.parse(localStorage.getItem("User"));
    useEffect(()=>{
        const {userid,login} = JSON.parse(localStorage.getItem("User"));
        setLogindetails((preValue)=>{
            return{
                ...preValue,
                login:login,
                userid: userid,
            }
        });
    },[user.payload.login,user.payload.user])

    // useEffect(()=>{
    //     // if(user.payload.login){
    //     //     navigate(`/Form/${user.payload.user}`);
    //     // }
    //     // if(user.payload.login){
    //     //     navigate(user.payload.redirect);
    //     // }
    //     if(login){
    //         navigate(`/Form/${userid}`);
    //     }
    // },[login,userid])

    useEffect(() => {
        // if (user.payload.login) {
        //     navigate(user.payload.redirect);
        // }
        if(logindetails.login && logindetails.userid){
            navigate(`/Form/${logindetails.userid}`);
        }

        if(logindetails.login){
            navigate(`/`);
        }
    }, [logindetails.login, logindetails.userid])

    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setLoginDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const submitLogin=(event) =>{
        event.preventDefault();
        // console.log("user:",details.email,"pass:",details.password);
        try{
            dispach(Login_Initialize(loginDetails));
            // navigate(user.payload.redirect);

            // navigate(`/Form/${user.payload.user}`);
        }catch (error){
            console.log(error);
        }
        // dispach(Login_Initialize(loginDetails));
        // navigate("/Form/1")
        // if(user.payload.login){
        //     navigate(`/Form/${loginDetails.email}`);
        // }
        setLoginDetails({
            email: "",
            password: "",
        })
    }

    // if(user.payload.user){
    //     navigate(`/Form/${user.payload.user}`);
    // }

    return (
        <>
            <div className="login-form">
                {
                    user.payload.loading ? <Loader/> :
                        <div className="lform">
                        <form onSubmit={submitLogin}>
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" required="required"
                                       name="email"
                                       value={loginDetails.email} onChange={detailsHandler}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password"
                                       required="required"
                                       name="password" value={loginDetails.password} onChange={detailsHandler}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Log in</button>
                            </div>
                        </form>
                            <p className="text-center"><Link to="/SignUp">Create an Account</Link></p>
                        </div>
                }
            </div>
        </>
    );
};

export default Login;
