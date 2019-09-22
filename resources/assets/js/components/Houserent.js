import React, { Component, Fragment } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Content from './MainCoponent/Content';
import { connect } from 'react-redux'

class Houserent extends Component {
    componentDidMount() {
        if (!this.props.login) {
            this.props.history.replace('/owner-login')
        }
    }
    render() {
        return (
            <Fragment>
                <Sidebar />
                <Header />
                <div className="br-mainpanel">
                    <Content />
                </div>
            </Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        base_url: state.base_url,
        login: state.login,
    }
}
export default connect(mapStatetoProps, null)(Houserent);
