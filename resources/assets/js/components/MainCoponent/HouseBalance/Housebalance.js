import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'

class Housebalanceform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance_list: []
        }
    }

    componentDidMount() {
        Axios.get(this.props.base_url + 'api/house-balance-list')
            .then(response => {
                if (response.data) {
                    this.setState({
                        balance_list: response.data,
                    })
                }
            })
    }

    balanceList() {
        const balance = this.state.balance_list.map((item) => {
            return (
                <tr key={item.balance_id}>
                    <td>{item.balance_id}</td>
                    <td>{item.house_name}</td>
                    <td>{item.total_amount_in}</td>
                    <td>{item.total_amount_out}</td>
                    <td>{item.total_balance}</td>
                    <td>{item.updated_at}</td>
                </tr>
            )
        })
        return balance;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Balance List</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>House Name</th>
                                <th>Total Amount In</th>
                                <th>Total Amount Out</th>
                                <th>Balance</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.balanceList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(Housebalanceform);