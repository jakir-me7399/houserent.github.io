import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class RentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rent_details: {}
        }
    }

    componentDidMount() {
        const rent_id = this.props.match.params.rent_id;
        Axios.get(this.props.base_url + 'api/rent-details/' + rent_id)
            .then(response => {
                if (response.data) {
                    this.setState({ rent_details: response.data })
                }
            })
    }

    alert() {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })
    }

    render() {
        // const owner_id = localStorage.getItem('id')
        const { rent_details } = this.state;
        if (!rent_details.owner_id) {
            return (
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5 text-capitalize">this is not valid url</h4>
                    <p className="mg-b-0"><Link to="/all-rent-list" className="btn btn-info">Back</Link></p>
                </div>
            )
        } else {
            return (
                <div className="br-pagebody">
                    <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Rent Details</h6>
                    <div className="bd bd-gray-300 rounded table-responsive">
                        <table className="table table-striped mg-b-0">
                            <tbody>
                                <tr>
                                    <td>Flat Name</td>
                                    <td>{rent_details.house_name + ' (' + rent_details.flat_name + ')'}</td>
                                </tr>
                                <tr>
                                    <td>Renter Name</td>
                                    <td>{rent_details.renter_name}</td>
                                </tr>
                                <tr>
                                    <td>Rent Month</td>
                                    <td>{rent_details.rent_month}</td>
                                </tr>
                                <tr>
                                    <td>Basic Rent</td>
                                    <td>{rent_details.basic_rent}</td>
                                </tr>
                                <tr>
                                    <td>Electricity Bill</td>
                                    <td>{rent_details.electricity_bill}</td>
                                </tr>
                                <tr>
                                    <td>Water Bill</td>
                                    <td>{rent_details.water_bill}</td>
                                </tr>
                                <tr>
                                    <td>Gas Bill</td>
                                    <td>{rent_details.gas_bill}</td>
                                </tr>
                                <tr>
                                    <td>Other Coast</td>
                                    <td>{rent_details.others_charge}</td>
                                </tr>
                                <tr>
                                    <td>Total Rent</td>
                                    <td>{rent_details.total_rent}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
export default connect(mapStatetoProps, null)(RentDetails);