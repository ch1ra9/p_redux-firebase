import React, {useEffect, useState} from 'react';
import "./SignUp.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SignUp_Initialize from "../UserActions/SignUpUser";
import {useNavigate} from "react-router";
import Loader from "../Loader/loader";

const SignUp = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmpass: ""
    })
    const [logindetails, setLogindetails] = useState({login:false,userid:""});

    const user = useSelector((State => State.user))
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

    // const {userid,login} = JSON.parse(localStorage.getItem("User"));


    useEffect(() => {
        // if (user.payload.login) {
        //     navigate(user.payload.redirect);
        // }
        if(logindetails.login){
            navigate(`/Form/${logindetails.userid}`);
        }
    }, [logindetails.login, logindetails.userid])


    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setSignUpDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const submitSignUp = (event) => {
        event.preventDefault();
        // console.log("user:",details.email,"pass:",details.password);
        if (signUpDetails.password === signUpDetails.confirmpass) {
            dispach(SignUp_Initialize(signUpDetails));
        }
        setSignUpDetails({
            username: "",
            email: "",
            password: "",
            confirmpass: ""
        })
    }

    return (
        <>
            <div className="signup-form">
                {
                    user.payload.loading ? <Loader/> :
                        <div className="sform">
                            <form className="form-horizontal" onSubmit={submitSignUp}>
                                <div className="row">
                                    <div className="col-8 offset-4">
                                        <h2>Sign Up</h2>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-4">Username</label>
                                    <div className="col-8">
                                        <input type="text" className="form-control" name="username" required="required"
                                               value={signUpDetails.username} onChange={detailsHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-4">Email Address</label>
                                    <div className="col-8">
                                        <input type="text" className="form-control" name="email" required="required"
                                               value={signUpDetails.email} onChange={detailsHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-4">Password</label>
                                    <div className="col-8">
                                        <input type="password" className="form-control" name="password"
                                               required="required"
                                               value={signUpDetails.password} onChange={detailsHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-4">Confirm Password</label>
                                    <div className="col-8">
                                        <input type="password" className="form-control" name="confirmpass"
                                               required="required"
                                               value={signUpDetails.confirmpass} onChange={detailsHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-8 offset-4">
                                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                            <div className="text-center">Already have an account? <Link to="/Login">Login here</Link>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default SignUp;
