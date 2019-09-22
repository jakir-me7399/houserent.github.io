import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: ''
        }
    }


    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    login(e) {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(this.props.base_url + 'api/auth/login', data)
            .then(response => {
                if (response.data) {
                    const token = response.data.access_token
                    const username = response.data.user
                    const id = response.data.id
                    localStorage.setItem('JWTtoken', token);
                    localStorage.setItem('user', username);
                    localStorage.setItem('id', id);
                    if (token) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const payload = token.split('.')[1];
                        const token_data = JSON.parse(atob(payload));
                        // console.log('payload data', token_data)
                        this.props.onSetUser(true, token_data);
                        localStorage.setItem('JWTtoken', token);
                        this.props.history.replace('/');
                    }
                }
            })
    }

    render() {
        return (
            <Fragment>
                <div className="d-flex align-items-center justify-content-center bg-br-primary ht-100v">

                    <form onSubmit={(e) => this.login(e)} className="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-white rounded shadow-base">
                        <div className="signin-logo tx-center tx-28 tx-bold tx-inverse"><span className="tx-normal">[</span> EI Technology <span className="tx-normal">]</span></div>
                        <div className="tx-center mg-b-60">The Admin Template For HouseRent</div>

                        <div className="form-group">
                            <input onChange={(e) => this.handleInput(e)} value={this.state.email} name="email" type="email" className="form-control" placeholder="Enter your Email" />
                        </div>
                        <div className="form-group">
                            <input  onChange={(e) => this.handleInput(e)} value={this.state.password} name="password" type="password" type="password" className="form-control" placeholder="Enter your password" />
                            {/* <a href="#" className="tx-info tx-12 d-block mg-t-10">Forgot password?</a> */}
                        </div>
                        <button type="submit" className="btn btn-info btn-block">Sign In</button>

                        <div className="mg-t-60 tx-center">Not yet a member? <Link to="/owner-singup" className="tx-info">Sign Up</Link></div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        base_url: state.base_url,
        user: state.user,
        login: state.login,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSetUser: (login, user) => dispatch({ type: 'SET_USER_DATA', login: login, user: user })
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(Login);
