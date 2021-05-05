import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
import { alertActions } from './redux-store/actions/alert-actions';
import { history } from './utils/history';
import DashboardComponent from './_components/dashboard';
import LoginComponent from './_components/LoginComponent';
import { PrivateRoute } from './_components/private-routes/PreivateRoute';


function App() {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);
  return (
    <div className="App">
      {alert.message &&
        <div className={`alert ${alert.type}`}> {alert.message} try again.</div>
      }
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardComponent} />
          <Route exact path="/login" component={LoginComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
