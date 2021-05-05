import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../redux-store/actions/user-actions';
import { history } from '../utils/history';

const DashboardComponent = () => {
    const users = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(UserActions.getAll('users'));
    }, [dispatch]);

    return (
        <div className="mx-5 pt-3">
            <div className="row">
                <div className="header--title col-md-10">
                    <h1>Dashboard</h1>
                </div>
                <div className="col-md-2">
                    {users && users.items && users.items.length &&
                        <button className="btn btn-link" onClick={() => history.push('/login')}>Logout</button>
                    }
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
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
                                        <td>{user.email}</td>
                                        <td>
                                            <img key={user.avatar} src={user.avatar} className="img-fluid" alt="" />
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-info">View</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary">Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DashboardComponent
