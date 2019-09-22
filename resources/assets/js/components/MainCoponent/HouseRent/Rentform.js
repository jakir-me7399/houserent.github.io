import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

class Rentform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renter_list: [],
            renter_id: '',
            house_id: '',
            flat_id: '',
            basic_rent: '',
            gas_bill: '',
            water_bill: '',
            rent_type: 1,
            rent_month: '',
            accepted_at: '',
            electricity_bill: '',
            others_charge: '',
            form_disable: true,
        }
    }

    componentDidMount() {
        const owner_id = localStorage.getItem('id')
        axios.get(this.props.base_url + 'api/flat-basic-rent-info/' + owner_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        renter_list: response.data.renter_list,
                    })
                }
            })
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name == "renter_id") {
            axios.get(this.props.base_url + 'api/renter-info/' + e.target.value)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            house_name: response.data.house_name,
                            house_id: response.data.house_id,
                            flat_name: response.data.flat_name,
                            flat_id: response.data.flat_id,
                            basic_rent: response.data.flat_rent
                        })
                    }
                })
        }

        if (e.target.name == "renter_id") {
            this.setState({ form_disable: true, rent_month: "" })
        }

        if (e.target.name == "rent_month" && this.state.renter_id) {
            e.preventDefault();
            const data = {
                renter_id: this.state.renter_id,
                rent_month: e.target.value,
            }

            axios.post(this.props.base_url + 'api/rent-month', data)
                .then(response => {
                    if (response.data) {
                        this.setState({ rent_month: '' })
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Already pay rent for this month',
                        })
                    } else {
                        this.setState({ form_disable: false })
                    }
                })
        }
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            renter_id: this.state.renter_id,
            house_id: this.state.house_id,
            flat_id: this.state.flat_id,
            basic_rent: this.state.basic_rent,
            gas_bill: this.state.gas_bill ? this.state.gas_bill : 0,
            water_bill: this.state.water_bill ? this.state.water_bill : 0,
            rent_type: this.state.rent_type,
            rent_month: this.state.rent_month,
            accepted_at: this.state.accepted_at,
            electricity_bill: this.state.electricity_bill ? this.state.electricity_bill : 0,
            others_charge: this.state.others_charge ? this.state.others_charge : 0,
        }

        axios.post(this.props.base_url + 'api/flat-rent-store', data)
            .then(response => {
                if (response.data) {
                    const invoice_id = response.data
                    this.props.history.push('/invoice/' + invoice_id)
                    console.log('rent info', invoice_id)
                    // this.setState({
                    //     renter_id: '',
                    //     house_id: '',
                    //     flat_id: '',
                    //     basic_rent: '',
                    //     gas_bill: '',
                    //     water_bill: '',
                    //     rent_type: 1,
                    //     rent_month: '',
                    //     accepted_at: '',
                    //     electricity_bill: '',
                    //     others_charge: ''
                    // })
                    // Swal.fire({
                    //     type: 'success',
                    //     title: 'Your work has been saved',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // })
                }
            })
    }

    renterList() {
        const renterName = this.state.renter_list.map((item) => {
            return (
                <option value={item.renter_id} key={item.renter_id}>{item.renter_name}</option>
            )
        })
        return renterName
    }

    alert() {
        return (
            <div className="alert alert-danger mg-t-10" role="alert">
                <strong className="d-block d-sm-inline-block-force">Oh snap!</strong> Change a few things up and try submitting again.
            </div>
        )
    }
    render() {
        return (
            <Fragment>
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5">Rent From</h4>
                </div>
                <div className="br-pagebody">
                    <form onSubmit={(e) => this.handleOnSubmit(e)} className="br-section-wrapper" data-parsley-validate>
                        <div className="form-layout form-layout-5">
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="renter_id"><span className="tx-danger">*</span> Renter Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="renter_id" onChange={(e) => this.handleInput(e)} data-placeholder="Choose a Renter..." className="form-control">
                                        <option value="">{"please select a Renter"}</option>
                                        {this.renterList()}
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="rent_month"><span className="tx-danger">*</span> Month Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="month" onChange={(e) => this.handleInput(e)} value={this.state.rent_month} className="form-control" id="rent_month" name="rent_month" placeholder="Rent Month" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="house_id"><span className="tx-danger">*</span> House Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="house_id" onChange={(e) => this.handleInput(e)} className="form-control" readOnly>
                                        <option value={this.state.house_id}>{this.state.house_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_id"><span className="tx-danger">*</span> Flat Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="flat_id" onChange={(e) => this.handleInput(e)} className="form-control" readOnly>
                                        <option value={this.state.flat_id}>{this.state.flat_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="basic_rent"><span className="tx-danger">*</span> Flat Basic Rent:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.basic_rent} id="basic_rent" name="basic_rent" readOnly />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="gas_bill">Gas Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.gas_bill} id="gas_bill" name="gas_bill" placeholder="Gas Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="electricity_bill">Electricity Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.electricity_bill} id="electricity_bill" name="electricity_bill" placeholder="Electricity Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="water_bill">Water Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.water_bill} id="water_bill" name="water_bill" placeholder="Water Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="others_charge">Others Bill:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.others_charge} id="others_charge" name="others_charge" placeholder="Others Bill" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label">Rent Type:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="rent_type" onChange={(e) => this.handleInput(e)} value="1" checked={this.state.rent_type == 1} />
                                                <span>Regular</span>
                                            </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="rent_type" onChange={(e) => this.handleInput(e)} value="2" checked={this.state.rent_type == 2} />
                                                <span>Advanced</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="accepted_at"><span className="tx-danger">*</span>Accepet Date:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="date" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.accepted_at} id="accepted_at" name="accepted_at" />
                                </div>
                            </div>
                        </div>
                        <div className="row mg-t-30">
                            <div className="col-sm-8 mg-l-auto">
                                <div className="form-layout-footer">
                                    <button type="submit" className="btn btn-info">Submit Form</button>
                                    {/* <span style={{ color: '#f00', display: 'block' }}>{this.state.form_disable ? 'You must select a month' : null}</span> */}
                                    {this.state.form_disable ? this.alert() : null}
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

export default connect(mapStateToProps, null)(Rentform);