import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expense_list: []
        }
    }

    componentDidMount() {
        Axios.get(this.props.base_url + 'api/expense-list')
            .then(response => {
                if (response.data) {
                    this.setState({
                        expense_list: response.data,
                    })
                }
            })
    }

    expenseList() {
        const balance = this.state.expense_list.map((item) => {
            const total = item.tax + item.others + item.gas_bill + item.wasa_bill + item.electricity_bill
            return (
                <tr key={item.expense_id}>
                    <td>{item.expense_id}</td>
                    <td>{item.house_name}</td>
                    <td>{item.title}</td>
                    <td>{item.payment_date}</td>
                    <td>{total}</td>
                    <td><Link to={'/expense-details/' + item.expense_id}><button className="btn btn-primary btn-icon mg-r-5 mg-b-10"><div><i className="far fa-eye"></i></div></button></Link></td>
                </tr>
            )
        })
        return balance;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Expense List</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>House Name</th>
                                <th>Title</th>
                                <th>Payment Date</th>
                                <th>Expense Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.expenseList()}
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

export default connect(mapStateToProps, null)(ExpenseList);