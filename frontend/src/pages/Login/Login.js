import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

    const loginURL = '/api/login';

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        let obj = {
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value
        }
        // console.log(obj);
        if (!obj.username || obj.username === "") {
            alert("username mustn't be empty");
            return;
        }
        if (!obj.password || obj.password === "") {
            alert("password mustn't be empty");
            return;
        }
        fetch(loginURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json();
                }
            }
        ).then(
            (data)=>{
                if(data){
                    props.setUserName(data);
                    navigate("/account");
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        document.getElementById("login-form").action = loginURL;
    }, [loginURL]);

    return (
        <div id="login">
            <header className="header-padding">
                <h1 className="text-center aoe-text pt-5">Login</h1>
            </header>
            <main>
                <div className="container bottom-padding">
                    <div
                        id="login-row"
                        className="row justify-content-center align-items-center"
                    >
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form
                                    id="login-form"
                                    className="form"
                                    action="/"
                                    method="post"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="username" className="aoe-text">
                                            Username:
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="aoe-text">
                                            Password:
                                        </label>
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            className="btn btn-info btn-md aoe-btn-submit"
                                            defaultValue="submit"
                                        />
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <a href="/register" className="aoe-text">
                                            Register here
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

Login.propTypes = {};

export default Login;