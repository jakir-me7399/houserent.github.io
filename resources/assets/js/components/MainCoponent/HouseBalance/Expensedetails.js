import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios';

class Expensedetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expense_details: {}
        }
    }

    componentDidMount() {
        const expense_id = this.props.match.params.expense_id;
        Axios.get(this.props.base_url + 'api/expense-details/' + expense_id)
            .then(response => {
                if (response.data) {
                    this.setState({ expense_details: response.data })
                }
            })
    }

    render() {
        const { expense_details } = this.state;
        const total = expense_details.tax + expense_details.others + expense_details.gas_bill + expense_details.wasa_bill + expense_details.electricity_bill
        if (expense_details.owner_id) {
            return (
                <div className="br-pagebody">
                    <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Expnese Details</h6>
                    <div className="bd bd-gray-300 rounded table-responsive">
                        <table className="table table-striped mg-b-0">
                            <tbody>
                                <tr>
                                    <td>House Name</td>
                                    <td>{expense_details.house_name}</td>
                                </tr>
                                <tr>
                                    <td>Expense Title</td>
                                    <td>{expense_details.title}</td>
                                </tr>
                                <tr>
                                    <td>Payment Date</td>
                                    <td>{expense_details.payment_date}</td>
                                </tr>
                                <tr>
                                    <td>Electricity Bill</td>
                                    <td>{expense_details.electricity_bill}</td>
                                </tr>
                                <tr>
                                    <td>Water Bill</td>
                                    <td>{expense_details.wasa_bill}</td>
                                </tr>
                                <tr>
                                    <td>Gas Bill</td>
                                    <td>{expense_details.gas_bill}</td>
                                </tr>
                                <tr>
                                    <td>Other Coast</td>
                                    <td>{expense_details.others}</td>
                                </tr>
                                <tr>
                                    <td>Tax Amount</td>
                                    <td>{expense_details.tax}</td>
                                </tr>
                                <tr>
                                    <td>Total Amount</td>
                                    <td>{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5 text-capitalize">this is not valid url</h4>
                    <p className="mg-b-0"><Link to="/expense-list" className="btn btn-info">Back</Link></p>
                </div>
            )
        }
    }
}

const mapStatetoProps = state => {
    return {
        base_url: state.base_url
    }
}
export default connect(mapStatetoProps, null)(Expensedetails);