import React, { useEffect } from "react";

function RegisterPage() {

    const registerURL = '/api/register/';

    const handleSubmit = (e) => {
        let name = document.getElementById("username").value;
        // console.log(name);
        let password = document.getElementById("password").value;
        // console.log(password);
        if (!name || name === "") {
            alert("username mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if (!password || password === "") {
            alert("password mustn't be empty.");
            e.preventDefault();
            return false;
        }


        return true;
    };

    useEffect(() => {
        document.getElementById("register-form").action = registerURL;
    }, [registerURL]);

    return (
        <>
            <nav className="header-padding">
                <a href="/login" id="LogoutAction">
                    back
                </a>
            </nav>
            <header>
                <h1 className="text-center aoe-text pt-5">Register</h1>
            </header>
            <main>
                <div className="container bottom-padding">
                    <div
                        id="Register-row"
                        className="row justify-content-center align-items-center"
                    >
                        <div id="Register-column" className="col-md-6">
                            <div id="Register-box" className="col-md-12">
                                <form
                                    id="register-form"
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;