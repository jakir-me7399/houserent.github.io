import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import parse from 'html-react-parser'

class FlatDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flat_details: {}
        }
    }

    componentDidMount() {
        const flat_id = this.props.match.params.flat_id;
        Axios.get(this.props.base_url + 'api/flat-details/' + flat_id)
            .then(response => {
                if (response.data) {
                    this.setState({ flat_details: response.data })
                }
            })
    }

    imageGallery() {
        const images = JSON.parse(this.state.flat_details.flat_photo)
        const imgGallery = images.map((item, i) => {
            return (
                <figure key={i}>
                    <img src={this.props.base_url + item} alt="something" style={{ width: '48%', float: 'left', margin: '1%', overflow: 'hidden' }} />
                </figure>
            )
        })
        return imgGallery
    }

    render() {
        const { flat_details } = this.state;
        if (flat_details.flat_description == null)
            return null;
        const flat_desc = parse(flat_details.flat_description)
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Flat info details</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <tbody>
                            <tr>
                                <td>House Name</td>
                                <td>{flat_details.house_name}</td>
                            </tr>
                            <tr>
                                <td>Flat Name</td>
                                <td>{flat_details.flat_name}</td>
                            </tr>
                            <tr>
                                <td>Owner Name</td>
                                <td>{flat_details.full_name}</td>
                            </tr>
                            <tr>
                                <td>Renter Name</td>
                                <td>{flat_details.renter_name ? flat_details.renter_name : 'No Renter'}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{flat_details.phone_number ? flat_details.phone_number : 'Empty Flat'}</td>
                            </tr>
                            <tr>
                                <td>Total Family Member</td>
                                <td>{flat_details.members ? flat_details.members : 'Empty Flat'}</td>
                            </tr>
                            <tr>
                                <td>Flat Bed Room</td>
                                <td>{flat_details.flat_bed_room}</td>
                            </tr>
                            <tr>
                                <td>Flat Drawing Room</td>
                                <td>{flat_details.flat_drawing_room}</td>
                            </tr>
                            <tr>
                                <td>Flat Dining Room</td>
                                <td>{flat_details.flat_dining_room}</td>
                            </tr>
                            <tr>
                                <td>Flat Kitchen</td>
                                <td>{flat_details.flat_kitchen}</td>
                            </tr>
                            <tr>
                                <td>Flat WashRoom</td>
                                <td>{flat_details.flat_wash_room}</td>
                            </tr>
                            <tr>
                                <td>Flat Belcony</td>
                                <td>{flat_details.flat_balcony}</td>
                            </tr>
                            <tr>
                                <td>Flat Window</td>
                                <td>{flat_details.flat_window}</td>
                            </tr>
                            <tr>
                                <td>Flat Description</td>
                                <td>{flat_desc}</td>
                            </tr>
                            <tr>
                                <td>Flat Image Gallery</td>
                                <td className="img-gallery">{this.imageGallery()}</td>
                            </tr>
                            <tr>
                                <td>Basic Rent</td>
                                <td>{flat_details.flat_rent}</td>
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
export default connect(mapStatetoProps, null)(FlatDetails);