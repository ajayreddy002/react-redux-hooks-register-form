import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { UserActions } from '../redux-store/actions/user-actions';

const LoginComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });
    const [registerDetails, setRegisterDetails] = useState({
        firstName: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [rSubmitted, setRSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => { 
        dispatch(UserActions.logout()); 
    }, [dispatch]);
    function handleLoginChange(e) {
        const { name, value } = e.target;
        setLoginDetails(inputs => ({ ...inputs, [name]: value }));
    }
    function submitLoginData(e) {
        e.preventDefault();

        setSubmitted(true);
        if (loginDetails.email && loginDetails.password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(UserActions.login('login', loginDetails, from));
        }
    }

    function handleRegisterChange(e) {
        const { name, value } = e.target;
        setRegisterDetails(inputs => ({ ...inputs, [name]: value }));
    }

    function submitRegisterData(e) {
        e.preventDefault();

        setRSubmitted(true);
        if (registerDetails.email && registerDetails.password) {
            dispatch(UserActions.register('register', registerDetails));
        }
    }
    return (
        <div className="login__block">
            {isLogin &&
                <form className="form__block" onSubmit={submitLoginData}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input className={'form-control' + (submitted && !loginDetails.email ? ' is-invalid' : '')} name="email" type="email" placeholder="Enter your email" value={loginDetails.email} onChange={handleLoginChange} />
                        {submitted && !loginDetails.email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Password</label>
                        <input className={'form-control' + (submitted && !loginDetails.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Enter your password" value={loginDetails.password} onChange={handleLoginChange} />
                        {submitted && !loginDetails.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div>
                        <span className="text-muted">Don't have an account ?</span>
                        <button type="button" className="btn btn-link" onClick={() => setIsLogin(false)}>Register</button>
                    </div>
                </form>
            }
            {!isLogin &&
                <form className="form__block" onSubmit={submitRegisterData}>
                    <div className="form-group mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input className={'form-control' + (rSubmitted && !registerDetails.firstName ? ' is-invalid' : '')} name="firstName" type="text" placeholder="Enter your first name" value={registerDetails.firstName} onChange={handleRegisterChange} />
                        {rSubmitted && !registerDetails.firstName &&
                            <div className="invalid-feedback">First name is required</div>
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input className={'form-control' + (rSubmitted && !registerDetails.email ? ' is-invalid' : '')} name="email" type="email" placeholder="Enter your email" value={registerDetails.email} onChange={handleRegisterChange} />
                        {rSubmitted && !registerDetails.email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Password</label>
                        <input className={'form-control' + (rSubmitted && !registerDetails.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Enter your password" value={registerDetails.password} onChange={handleRegisterChange} />
                        {rSubmitted && !registerDetails.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='submit' className="btn btn-primary">Register</button>
                    </div>
                    <div>
                        <span className="text-muted">have an account</span>
                        <button type="button" className="btn btn-link" onClick={() => setIsLogin(true)}>Login</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default LoginComponent
