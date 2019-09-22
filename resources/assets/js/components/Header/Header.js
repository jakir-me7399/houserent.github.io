import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    logout(e) {
        e.preventDefault()
        axios.post(this.props.base_url + 'api/auth/logout')
            .then(response => {
                if (response.data) {
                    delete axios.defaults.headers.common['Authorization'];
                    this.props.onSetUser(false, {});
                    localStorage.removeItem('JWTtoken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('id');
                    this.props.history.replace('/owner-login');
                }
            })
    }

    render() {
        const user = localStorage.getItem('user');
        return (
            <div className="br-header">
                <div className="br-header-left">
                    <div className="navicon-left hidden-md-down"><a id="btnLeftMenu" href="#"><i className="fas fa-bars"></i></a></div>
                    <div className="navicon-left hidden-lg-up"><a id="btnLeftMenuMobile" href="#"><i className="fas fa-bars"></i></a></div>
                </div>
                <div className="br-header-right">
                    <nav className="nav">
                        <button onClick={ (e) => this.logout(e)} className="logged-name btn btn-primary" style={{cursor : "pointer"}}>logout</button>
                        {/* <div className="dropdown">
                            <a href="#" className="nav-link nav-link-profile" data-toggle="dropdown">
                                <span className="logged-name hidden-md-down">Katherine</span>
                                <img src="../img/img1.jpg" className="wd-32 rounded-circle" alt="" />
                                <span className="square-10 bg-success"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-header wd-200">
                                <ul className="list-unstyled user-profile-nav">
                                    <li><a href="#"><i className="icon ion-ios-person"></i> Edit Profile</a></li>
                                    <li><a href="#"><i className="icon ion-ios-gear"></i> Settings</a></li>
                                    <li><a href="#"><i className="icon ion-ios-download"></i> Downloads</a></li>
                                    <li><a href="#"><i className="icon ion-ios-star"></i> Favorites</a></li>
                                    <li><a href="#"><i className="icon ion-ios-folder"></i> Collections</a></li>
                                    <li><a href="#"><i className="icon ion-power"></i> Sign Out</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="dropdown">
                            <a href="#" className="nav-link nav-link-profile" data-toggle="dropdown">
                                <span className="logged-name hidden-md-down">{user}</span>
                                <img src="../img/img1.jpg" className="wd-32 rounded-circle" alt="" />
                                <span className="square-10 bg-success"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-header wd-200">
                                <ul className="list-unstyled user-profile-nav">
                                    <li><a href="#"><i className="icon ion-ios-person"></i> Edit Profile</a></li>
                                    <li><a href="#"><i className="icon ion-ios-gear"></i> Settings</a></li>
                                    <li><a href="#"><i className="icon ion-ios-download"></i> Downloads</a></li>
                                    <li><a href="#"><i className="icon ion-ios-star"></i> Favorites</a></li>
                                    <li><a href="#"><i className="icon ion-ios-folder"></i> Collections</a></li>
                                    <li><a href="#"><i className="icon ion-power"></i> Sign Out</a></li>
                                </ul>
                            </div>
                        </div> */}
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url,
        user: state.user,
        login: state.login,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSetUser: (login, user) => dispatch({ type: 'SET_USER_DATA', login: login, user: user }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));