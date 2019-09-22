import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

class Expense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house_list: [],
            house_id: '',
            title: '',
            electricity_bill: '',
            gas_bill: '',
            tax: '',
            others: '',
            payment_date: '',
            wasa_bill: '',
        }
    }

    componentDidMount() {
        axios.get(this.props.base_url + 'api/flat-basic-information')
            .then(response => {
                if (response.data) {
                    this.setState({
                        house_list: response.data,
                    })
                }
            })
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            house_id: this.state.house_id,
            title: this.state.title,
            electricity_bill: this.state.electricity_bill ? this.state.electricity_bill : 0,
            gas_bill: this.state.gas_bill ? this.state.gas_bill : 0,
            tax: this.state.tax ? this.state.tax : 0,
            others: this.state.others ? this.state.others : 0,
            payment_date: this.state.payment_date,
            wasa_bill: this.state.wasa_bill ? this.state.wasa_bill : 0,
        }
        axios.post(this.props.base_url + 'api/store-expense', data)
            .then(response => {
                if (response.data == 200) {
                    this.setState({
                        house_id: '',
                        title: '',
                        electricity_bill: '',
                        gas_bill: '',
                        tax: '',
                        others: '',
                        payment_date: '',
                        wasa_bill: '',
                    })

                    Swal.fire({
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    houseList() {
        const house_options = this.state.house_list.map((item) => {
            return (<option value={item.house_id} key={item.house_id}>{item.house_name}</option>)
        })
        return house_options;
    }
    render() {
        return (
            <Fragment>
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5">Expense Information</h4>
                </div>
                <div className="br-pagebody">
                    <form onSubmit={(e) => this.handleOnSubmit(e)} className="br-section-wrapper" data-parsley-validate>
                        <div className="form-layout form-layout-5">
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="house_id"><span className="tx-danger">*</span> House Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="house_id" onChange={(e) => this.handleInput(e)} className="form-control">
                                        <option value=""></option>
                                        {this.houseList()}
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="title"><span className="tx-danger">*</span> Expense Title:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.title} className="form-control" id="title" name="title" placeholder="Expense Title" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="gas_bill">Gas Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.gas_bill} id="gas_bill" name="gas_bill" placeholder="Gas Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="wasa_bill">WASA Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.wasa_bill} id="wasa_bill" name="wasa_bill" placeholder="WASA Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="tax">Tax:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.tax} id="tax" name="tax" placeholder="Tax" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="others"> Other Coast:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.others} id="others" name="others" placeholder="Other Coast" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="payment_date"><span className="tx-danger">*</span> Payment Date:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="date" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.payment_date} id="payment_date" name="payment_date" placeholder="Payment Date" />
                                </div>
                            </div>
                        </div>
                        <div className="row mg-t-30">
                            <div className="col-sm-8 mg-l-auto">
                                <div className="form-layout-footer">
                                    <button type="submit" className="btn btn-info">Submit Form</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(Expense);