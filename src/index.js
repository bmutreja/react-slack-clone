import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter  as Router,Switch, Route,useHistory,withRouter } from 'react-router-dom';
import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect, Provider } from 'react-redux';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';
import Spinner from './Spinner';
import firebase from '../src/firebase';


const store = createStore(rootReducer, composeWithDevTools());


function Root(props){

  let history  = useHistory();

  useEffect(()=>{
    console.log(props.isloading);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        props.setUser(user);

        history.push('/');
        // ...
        
      }else{
        history.push('/login');
        props.clearUser();
      }
    });
  },[]);



  return (
    props.isloading ? <Spinner/> :
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
    
)
};

const mapStateFromProps = state => ({
  isloading: state.user.isLoading
});

const RootWithComponent = withRouter(connect(mapStateFromProps, {setUser, clearUser})(Root));

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <RootWithComponent/>
    </Router>
    </Provider>
    ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
