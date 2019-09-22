import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class FlatRentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rent_list: [],
            house_list: [],
            flat_list: [],
            house_name: '',
            flat_name: '',
        }
    }
    componentDidMount() {
        axios.get(this.props.base_url + 'api/rent-list')
            .then(response => {
                if (response.data) {
                    this.setState({ rent_list: response.data })
                }
            })
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
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name == 'house_id') {
            axios.get(this.props.base_url + 'api/renter-flat-id/' + e.target.value)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            flat_list: response.data,
                        })
                    }
                })
            axios.get(this.props.base_url + 'api/house-rent-list/' + e.target.value)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            rent_list: response.data,
                            house_name: response.data[0].house_name
                        })
                    }
                })
        }

    }
    onChangerentList(e) {
        const flat_id = e.target.value
        axios.get(this.props.base_url + 'api/flat-rent-list/' + flat_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        rent_list: response.data,
                        flat_name: response.data[0].flat_name
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

    flat_name() {
        const flat_options = this.state.flat_list.map((item) => {
            return (<option key={item.flat_id} value={item.flat_id}>{item.flat_name}</option>)
        })
        return flat_options;
    }

    rentList() {
        const flat = this.state.rent_list.map((item) => {
            return (
                <tr key={item.rent_id}>
                    <td>{item.rent_id}</td>
                    <td>{item.flat_name}</td>
                    <td>{item.renter_name}</td>
                    <td>{item.rent_month}</td>
                    <td>{item.accepted_at}</td>
                    <td>{item.total_rent}</td>
                    <td><Link to={'rent-details/' + item.rent_id}><button className="btn btn-primary btn-icon mg-r-5 mg-b-10"><div><i className="far fa-eye"></i></div></button></Link></td>
                </tr>
            )
        })
        return flat;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Rent List</h6>
                <h6 className="panel-title">
                    <select name="house_id" onChange={(e) => this.handleInput(e)} className="btn btn-info mg-t-5 mg-r-8 mg-b-5">
                        <option value="">{"select House"}</option>
                        {this.houseList()}
                    </select>
                    <select name="flat_id" onChange={(e) => this.onChangerentList(e)} className="btn btn-info mg-t-5 mg-b-5">
                        <option value="">Select Falt</option>
                        {this.flat_name()}
                    </select>
                </h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Flat Name</th>
                                <th>Renter Name</th>
                                <th>Rent Month</th>
                                <th>Payment Date</th>
                                <th>Total Rent</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rentList()}
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
export default connect(mapStateToProps, null)(FlatRentList);