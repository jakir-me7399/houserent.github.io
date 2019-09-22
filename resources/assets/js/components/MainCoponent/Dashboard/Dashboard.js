import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            count_house : '',
            count_flat : '',
            empty_flat : '',
            total_renter : '',
            total_balance: 0,
        }
    }

    componentDidMount(){
        axios.get( this.props.base_url + 'api/dashboard-info')
            .then(response =>{
                if(response.data){
                    this.setState({
                        count_house : response.data.count_house,
                        count_flat : response.data.count_flat,
                        empty_flat : response.data.empty_flat,
                        total_renter : response.data.total_renter,
                        total_balance : this.balanceMarge(response.data.total_balance),
                    })
                }
            })
    }

    balanceMarge(balance){
        let tk = 0;
        balance.forEach(item => {
            tk += item.total_balance;
        });
        return tk;
    }

    render() {
        const user = localStorage.getItem('user');
        return (
            <Fragment>
                <div className="pd-30">
                    <h4 className="tx-gray-800 mg-b-5">{user} <span className="tx-18">Dashboard</span></h4>
                    <p className="mg-b-0">Do big things with Bracket, the responsive bootstrap 4 admin template.</p>
                </div>
                <div className="br-pagebody mg-t-5 pd-x-30">
                    <div className="row row-sm">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-teal rounded overflow-hidden">
                                <div className="pd-25 d-flex align-items-center">
                                    <i className="ion ion-earth tx-60 lh-0 tx-white op-7"></i>
                                    <div className="mg-l-20">
                                        <p className="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10">Total House</p>
                                        <p className="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{this.state.count_house}</p>
                                        {/* <span className="tx-11 tx-roboto tx-white-6">24% higher yesterday</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3 mg-t-20 mg-sm-t-0">
                            <div className="bg-danger rounded overflow-hidden">
                                <div className="pd-25 d-flex align-items-center">
                                    <i className="ion ion-bag tx-60 lh-0 tx-white op-7"></i>
                                    <div className="mg-l-20">
                                        <p className="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10">Total Flat</p>
                                        <p className="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{this.state.count_flat}</p>
                                        {/* <span className="tx-11 tx-roboto tx-white-6">$390,212 before tax</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                            <div className="bg-primary rounded overflow-hidden">
                                <div className="pd-25 d-flex align-items-center">
                                    <i className="ion ion-monitor tx-60 lh-0 tx-white op-7"></i>
                                    <div className="mg-l-20">
                                        <p className="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10">Empty Flat</p>
                                        <p className="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{this.state.empty_flat}</p>
                                        {/* <span className="tx-11 tx-roboto tx-white-6">23% average duration</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                            <div className="bg-br-primary rounded overflow-hidden">
                                <div className="pd-25 d-flex align-items-center">
                                    <i className="ion ion-clock tx-60 lh-0 tx-white op-7"></i>
                                    <div className="mg-l-20">
                                        <p className="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10">Total Balance</p>
                                        <p className="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{this.state.total_balance}</p>
                                        {/* <span className="tx-11 tx-roboto tx-white-6">65.45% on average time</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return{
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(Dashboard);