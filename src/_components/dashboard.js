import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../redux-store/actions/user-actions';
import { history } from '../utils/history';
import UserModal from './user-modal'
const DashboardComponent = () => {
    const users = useSelector(state => state.user);
    const [selectedUser, setSelectedUser] = useState({});
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    useEffect(() => {
        dispatch(UserActions.getAll('users'));
    }, [dispatch]);

    function showModal(user, actionType) {
        setModalShow(true);
        // Assigning the value for to do operation in modal
        setSelectedUser(user);
        setIsView(true ? actionType === 'view' : false);
        setIsAdd(true ? actionType === 'add' : false);
    }
    function closeModal() {
        setModalShow(false);
    }
    function logout() {
        dispatch(UserActions.logout());
        history.go('/login');
    }
    return (
        <div className="mx-5 pt-3">
            <div className="row">
                <div className="header--title col-md-10">
                    <h1>Dashboard</h1>
                </div>
                <div className="col-md-2">
                    {users && users.items && users.items.length &&
                        <button className="btn btn-link" onClick={logout}>Logout</button>
                    }
                </div>
                <div className="add--btn col-md-9">
                    {/* Here we dont have a usedat so sending it as undefined */}
                    <button className="btn btn-primary pl-4 pr-4" onClick={() => showModal(undefined, 'add')}> + Add User</button>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text rounded-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.items && users.items.length &&
                        users.items.map((user) => {
                            return (
                                <Fragment key={user.id}>
                                    <tr>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <img key={user.avatar} src={user.avatar} className="img-fluid" alt="" />
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-info" onClick={() => showModal(user, 'view')}>
                                                <i className="bi bi-eye-fill"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => showModal(user, 'edit')}>
                                                <i className="bi bi-pencil-square" ></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-danger">
                                                <i className="bi bi-person-x-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })
                    }
                </tbody>
            </table>
            {/* User Modal Popup */}
            {modalShow &&
                <UserModal addUser={isAdd} isView={isView} userData={selectedUser} modalShow={modalShow} onClose={() => closeModal(setModalShow(false))}></UserModal>
            }
        </div>
    )
}

export default DashboardComponent
