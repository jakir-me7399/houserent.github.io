import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import parse from 'html-react-parser'

class RenterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renter_details: {}
        }
    }

    componentDidMount() {
        const renter_id = this.props.match.params.renter_id;
        Axios.get(this.props.base_url + 'api/renter-details/' + renter_id)
            .then(response => {
                if (response.data) {
                    this.setState({ renter_details: response.data })
                }
            })
    }

    render() {
        const { renter_details } = this.state;
        let member_desc = '';
        let permanent_address = '';
        let old_address = '';
        if (renter_details.members_description && renter_details.permanent_address && renter_details.old_address) {
            member_desc = parse(renter_details.members_description)
            permanent_address = parse(renter_details.permanent_address)
            old_address = parse(renter_details.old_address)
        }
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">{renter_details.renter_name}'s Details</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <tbody>
                            <tr>
                                <td>Flat Name</td>
                                <td>{renter_details.flat_name}</td>
                            </tr>
                            <tr>
                                <td>Renter Name</td>
                                <td>{renter_details.renter_name}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{renter_details.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Family member</td>
                                <td>{renter_details.members}</td>
                            </tr>
                            <tr>
                                <td>Members Description</td>
                                <td>{member_desc}</td>
                            </tr>
                            <tr>
                                <td>NID Number</td>
                                <td>{renter_details.nid}</td>
                            </tr>
                            <tr>
                                <td>Renter Profession</td>
                                <td>{renter_details.renter_profession}</td>
                            </tr>
                            <tr>
                                <td>Permanent Address</td>
                                <td>{permanent_address}</td>
                            </tr>
                            <tr>
                                <td>Old Address</td>
                                <td>{old_address}</td>
                            </tr>
                            <tr>
                                <td>Renter Photo</td>
                                <td>
                                    <div>
                                        <figure>
                                            <img src={this.props.base_url + renter_details.renter_photo} width="100px" />
                                        </figure>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>NID Copy</td>
                                <td>
                                    <div>
                                        <figure>
                                            <img src={this.props.base_url + renter_details.nid_scan} width="100px" />
                                        </figure>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Enter Date</td>
                                <td>{renter_details.enter_date}</td>
                            </tr>
                            <tr>
                                <td>Left Date</td>
                                <td>{renter_details.left_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        base_url: state.base_url
    }
}
export default connect(mapStatetoProps, null)(RenterDetails);