import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <Fragment>
                <div className="br-logo"><Link to="/"><span>[</span>EI Technology<span>]</span></Link></div>
                <div className="br-sideleft overflow-y-auto">
                    <label className="sidebar-label pd-x-15 mg-t-20">Navigation</label>
                    <div className="br-sideleft-menu">
                        <Link to="/" className="br-menu-link active">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-house-damage tx-16"></i>
                                {/* <i className="menu-item-icon icon ion-ios-home-outline tx-22"></i> */}
                                <span className="menu-item-label">Dashboard</span>
                            </div>{/* menu-item */}
                        </Link>{/* br-menu-link */}
                        <Link to="#" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon tx-16 fas fa-home"></i>
                                <span className="menu-item-label">House</span>
                                <i className="menu-item-arrow fa fa-angle-down"></i>
                            </div>{/* menu-item */}
                        </Link>{/* br-menu-link */}
                        <ul className="br-menu-sub nav flex-column">
                            <li className="nav-item"><Link to="/add-house" className="nav-link">Add House</Link></li>
                            <li className="nav-item"><Link to="/house" className="nav-link">My House</Link></li>
                        </ul>
                        <Link to="#" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-dolly-flatbed tx-16"></i>
                                <span className="menu-item-label">Flat</span>
                                <i className="menu-item-arrow fa fa-angle-down"></i>
                            </div>{/* menu-item */}
                        </Link>
                        <ul className="br-menu-sub nav flex-column">
                            <li className="nav-item"><Link to="/add-flat" className="nav-link">Add Falt</Link></li>
                            <li className="nav-item"><Link to="/flat" className="nav-link">My Flat</Link></li>
                            <li className="nav-item"><Link to="/rent-list" className="nav-link">Flat Rent List</Link></li>
                            <li className="nav-item"><Link to="/flat-rent-form" className="nav-link">Flat Rent form</Link></li>
                        </ul>
                        <Link to="#" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-users tx-16"></i>
                                <span className="menu-item-label">Ranter</span>
                                <i className="menu-item-arrow fa fa-angle-down"></i>
                            </div>{/* menu-item */}
                        </Link>
                        <ul className="br-menu-sub nav flex-column">
                            <li className="nav-item"><Link to="/renter-list" className="nav-link">All Renter</Link></li>
                            <li className="nav-item"><Link to="/add-renter" className="nav-link">Add Renter</Link></li>
                        </ul>
                        <Link to="#" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-money-check-alt tx-16"></i>
                                <span className="menu-item-label">Transcation info</span>
                                <i className="menu-item-arrow fa fa-angle-down"></i>
                            </div>{/* menu-item */}
                        </Link>
                        <ul className="br-menu-sub nav flex-column">
                            <li className="nav-item"><Link to="/balance" className="nav-link">Balance</Link></li>
                            <li className="nav-item"><Link to="/expense-list" className="nav-link">Eepense List</Link></li>
                            <li className="nav-item"><Link to="/expense-table" className="nav-link">Eepense table form</Link></li>
                        </ul>
                        <Link to="#" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-clipboard-list tx-16"></i>
                                <span className="menu-item-label">Report</span>
                                <i className="menu-item-arrow fa fa-angle-down"></i>
                            </div>{/* menu-item */}
                        </Link>
                        <ul className="br-menu-sub nav flex-column">
                            <li className="nav-item"><Link to="/all-rent-list" className="nav-link">All Rent List</Link></li>
                            <li className="nav-item"><Link to="/house-rent-list" className="nav-link">House Rent list</Link></li>
                            <li className="nav-item"><Link to="/flat-rent-list" className="nav-link">Flat Rent list</Link></li>
                            <li className="nav-item"><Link to="/monthly-rent-list" className="nav-link">Month wise Rent list</Link></li>
                        </ul>
                        <Link to="/renter-archive" className="br-menu-link">
                            <div className="br-menu-item">
                                <i className="menu-item-icon fas fa-user-times tx-16"></i>
                                <span className="menu-item-label">Renter archive list</span>
                            </div>{/* menu-item */}
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Sidebar;