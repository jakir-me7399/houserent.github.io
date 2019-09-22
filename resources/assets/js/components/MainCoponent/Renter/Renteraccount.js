import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Renteraccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction_list: []
        }
    }
    componentDidMount() {
        const renter_id = this.props.match.params.renter_id;
        axios.get(this.props.base_url + 'api/renter-transaction/' + renter_id)
            .then(response => {
                if (response.data) {
                    this.setState({ transaction_list: response.data })
                }
            })
    }

    transactionList() {
        const renter = this.state.transaction_list.map((item) => {
            const Rent = "Rent";
            const Advanced = "Advanced";
            return (
                <tr key={item.rent_id}>
                    <td>{item.renter_name}</td>
                    <td>{item.flat_name}</td>
                    <td>{item.rent_month}</td>
                    <td>{item.accepted_at}</td>
                    <td>{item.rent_type == 1 ? Rent : Advanced}</td>
                    <td>{item.total_rent}</td>
                </tr>
            )
        })
        return renter;
    }

    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Transaction list</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>Renter Name</th>
                                <th>Flat Name</th>
                                <th>Rent Month</th>
                                <th>Pay Date</th>
                                <th>Rent Type</th>
                                <th>Total Rent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.transactionList()}
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
export default connect(mapStateToProps, null)(Renteraccount);