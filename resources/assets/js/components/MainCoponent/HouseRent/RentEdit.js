import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'

class RentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renter_list: [],
            house_list: [],
            flat_list: [],
            renter_id: '',
            house_id: '',
            flat_id: '',
            basic_rent: '',
            gas_bill: '',
            water_bill: '',
            rent_type: '',
            rent_month: '',
            accepted_at: '',
            electricity_bill: '',
            others_charge: ''
        }
    }

    componentDidMount() {
        const rent_id = this.props.match.params.rent_id;
        Axios.get(this.props.base_url + 'api/rent-edit/' + rent_id)
            .then(response =>{
                if(response.data){
                    this.setState({
                        renter_id: response.data.renter_id,
                        house_id: response.data.house_id,
                        flat_id: response.data.flat_id,
                        basic_rent: response.data.basic_rent,
                        gas_bill: response.data.gas_bill,
                        electricity_bill: response.data.electricity_bill,
                        water_bill: response.data.water_bill,
                        others_charge: response.data.others_charge,
                        rent_type: response.data.rent_type,
                        rent_month: response.data.rent_month,
                        accepted_at: response.data.accepted_at,
                    })
                }
            })
        Axios.get(this.props.base_url + 'api/flat-basic-rent-info')
            .then(response => {
                if (response.data) {
                    this.setState({
                        house_list: response.data.house_list,
                        renter_list: response.data.renter_list,
                        flat_list: response.data.flat_list
                    })
                }
            })
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSelectInput(e) {
        this.setState({
            [e.name]: e.value
        })
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            'rent_id': this.props.match.params.rent_id,
            'renter_id': this.state.renter_id,
            'house_id': this.state.house_id,
            'flat_id': this.state.flat_id,
            'basic_rent': this.state.basic_rent,
            'gas_bill': this.state.gas_bill,
            'water_bill': this.state.water_bill,
            'rent_type': this.state.rent_type,
            'rent_month': this.state.rent_month,
            'accepted_at': this.state.accepted_at,
            'electricity_bill': this.state.electricity_bill,
            'others_charge': this.state.others_charge,
        }

        Axios.post(this.props.base_url + 'api/flat-rent-update', data)
            .then(response => {
                if (response.data) {
                    Swal.fire({
                        position: 'top-center',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    renterName() {
        const renter_options = this.state.renter_list.map((item) => {
            const { renter_id, renter_name } = item;
            return { value: renter_id, label: renter_name, name: 'renter_id' }
        })
        return renter_options;
    }
    houseName() {
        const house_options = this.state.house_list.map((item) => {
            const { house_id, house_name } = item;
            return { value: house_id, label: house_name, name: 'house_id' }
        })
        return house_options;
    }
    flatName() {
        const flat_options = this.state.flat_list.map((item) => {
            const { flat_id, flat_name } = item;
            return { value: flat_id, label: flat_name, name: 'flat_id' }
        })
        return flat_options;
    }
    render() {
        return (
            <div className="page-content">
                <div className="page-title">
                    <h5><i className="fa fa-table"></i>Edit Rent Data</h5>
                </div>
                <form className="form-horizontal" onSubmit={(e) => this.handleOnSubmit(e)} role="form">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h6 className="panel-title">About Your House</h6></div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right">Renter Name </label>
                                <div className="col-sm-10">
                                    <Select
                                        onChange={(e) => this.handleSelectInput(e)}
                                        value={this.state.renter_id}
                                        options={this.renterName()}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right">House Name </label>
                                <div className="col-sm-10">
                                    <Select
                                        onChange={(e) => this.handleSelectInput(e)}
                                        value={this.state.house_id}
                                        options={this.houseName()}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right">Flat Name </label>
                                <div className="col-sm-10">
                                    <Select
                                        onChange={(e) => this.handleSelectInput(e)}
                                        value={this.state.flat_id}
                                        options={this.flatName()}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlFor="basic_rent">Basic Rent</label>
                                <div className="col-sm-10">
                                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.basic_rent} className="form-control" id="basic_rent" name="basic_rent" placeholder="Basic Rent" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="gas_bill">Gas bill</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.gas_bill} id="gas_bill" name="gas_bill" placeholder="Gas Bill" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="electricity_bill">Electricity Bill</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.electricity_bill} id="electricity_bill" name="electricity_bill" placeholder="Electricity Bill" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="water_bill">Water Bill</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.water_bill} id="water_bill" name="water_bill" placeholder="Water Bill" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="others_charge">Others Bill</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.others_charge} id="others_charge" name="others_charge" placeholder="Others Bill" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right">Rent Type</label>
                                <div className="col-sm-10">
                                    <label className="radio-inline">
                                        <input type="radio" name="rent_type" onChange={(e) => this.handleInput(e)} value="1" checked={this.state.rent_type == 1} />
                                        Regular
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="rent_type" onChange={(e) => this.handleInput(e)} value="2" checked={this.state.rent_type == 2} />
                                        Advanced
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="rent_month">Month</label>
                                <div className="col-sm-10">
                                    <input type="month" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.rent_month} id="rent_month" name="rent_month" placeholder="Rent Month" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label text-right" htmlor="accepted_at">Accepet Date</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.accepted_at} id="accepted_at" name="accepted_at" placeholder="Accepet Date" />
                                </div>
                            </div>
                            <div className="form-actions text-right">
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(RentEdit);