import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../redux-store/actions/user-actions';

const UserModal = (props) => {
    const [submitted, setSubmitted] = useState(false);
    const isUserAdded = useSelector(state => state.user);
    const [userDetail, setuserDetail] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const dispatch = useDispatch();
    function handleChange(event) {
        // Here, we invoke the callback with the new value
        props.onClose();
    }
    useEffect(() => {
        if (props.userData !== undefined) {
            setuserDetail(props.userData)
        }
    }, [props.userData])
    function handleOnChange(e) {
        const { name, value } = e.target;
        setuserDetail(inputs => ({ ...inputs, [name]: value }));
    }
    function submitUserData(e) {
        e.preventDefault();
        setSubmitted(true);
        if (userDetail.email && userDetail.first_name) {
            if (!props.addUser && !props.isView) {
                dispatch(UserActions.updateUser('create', userDetail));
                handleChange();
            } else {
                dispatch(UserActions.addUser('create', userDetail));
                if (isUserAdded !== undefined) {
                    handleChange();
                }
            }
        }
    }
    return (
        <div>
            <Modal show={props.modalShow} onHide={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title>{props && props.userData && props.userData.first_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form__block" onSubmit={submitUserData}>
                        <div className="form-group mb-3">
                            <label htmlFor="first_name">First Name</label>
                            <input className={'form-control' + (submitted && !userDetail.first_name ? ' is-invalid' : '')} name="first_name" type="text" placeholder="Enter your first name" value={userDetail.first_name} onChange={handleOnChange} disabled={props.isView} />
                            {submitted && !userDetail.first_name &&
                                <div className="invalid-feedback">First name is required</div>
                            }
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="last_name">Last Name</label>
                            <input className={'form-control' + (submitted && !userDetail.last_name ? ' is-invalid' : '')} name="last_name" type="text" placeholder="Enter your last name" value={userDetail.last_name} onChange={handleOnChange} disabled={props.isView} />
                            {submitted && !userDetail.last_name &&
                                <div className="invalid-feedback">Last name is required</div>
                            }
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input className={'form-control' + (submitted && !userDetail.email ? ' is-invalid' : '')} name="email" type="email" placeholder="Enter your email" value={userDetail.email} onChange={handleOnChange} disabled={props.isView} />
                            {submitted && !userDetail.email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        {props.addUser &&
                            <div className="form-group mb-3">
                                <label htmlFor="email">Password</label>
                                <input className={'form-control' + (submitted && !userDetail.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Enter your password" value={userDetail.password} onChange={handleOnChange} />
                                {submitted && !userDetail.password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleChange}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={submitUserData} disabled={props.isView}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserModal
