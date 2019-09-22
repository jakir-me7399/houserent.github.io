import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router  } from 'react-router-dom'
import { Provider } from 'react-redux'
import Reducer from '../Store/Reducer';
import { createStore } from 'redux'
import Registration from './Registration';
import Houserent from './Houserent';
import Login from './Login';

class Auth extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/owner-login" component={ Login } />
                    <Route exact path="/owner-singup" component={ Registration } />
                    <Route path="/" component={ Houserent } />
                </Switch>
            </Router>
        )
    }
}

const store = createStore(Reducer);

const token = localStorage.getItem('JWTtoken');
if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const payload = token.split('.')[1];
    const token_data = JSON.parse(atob(payload));
    store.dispatch({type: 'SET_USER_DATA', login: true, user: token_data});
    
}else{
    localStorage.removeItem('JWTtoken');
    delete axios.defaults.headers.common['Authorization'];

}


if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}><Auth /></Provider>, document.getElementById('root'));
}