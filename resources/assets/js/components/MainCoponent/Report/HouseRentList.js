import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class HouseRentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rent_list: [],
            house_list: [],
            house_name: ''
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
        const house_id = e.target.value
        axios.get(this.props.base_url + 'api/house-rent-list/' + house_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        rent_list: response.data,
                        house_name: response.data[0].house_name
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
                    <td><Link to={'rent-details/' + item.rent_id}><button className="btn btn-primary btn-icon"><div><i className="far fa-eye"></i></div></button></Link></td>
                </tr>
            )
        })
        return flat;
    }
    render() {
        const house_name = this.state.house_name ? this.state.house_name : ' '
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">{house_name} Rent List</h6>
                <h6 className="panel-title">
                    <select name="house_id" onChange={(e) => this.handleInput(e)} className="btn btn-info mg-t-5 mg-b-5">
                        <option vlaue="">Select House</option>
                        {this.houseList()}
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
export default connect(mapStateToProps, null)(HouseRentList);