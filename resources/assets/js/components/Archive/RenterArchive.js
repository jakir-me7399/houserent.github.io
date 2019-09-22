import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class RenterArchive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archive_list: []
        }
    }

    componentDidMount() {
        Axios.get(this.props.base_url + 'api/archive-list')
            .then(response => {
                if (response.data) {
                    this.setState({
                        archive_list: response.data,
                    })
                }
            })
    }

    retnerArchiveList() {
        const archive = this.state.archive_list.map((item) => {
            return (
                <tr key={item.renter_archive_id}>
                    <td>{item.renter_name}</td>
                    <td>{item.house_name + ' ( ' + item.flat_name + ' )'}</td>
                    <td>{item.enter_date}</td>
                    <td>{item.left_date}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.renter_profession}</td>
                    <td><Link to={'/renter-details/' + item.renter_id}><button className="btn btn-primary btn-icon"><div><i className="far fa-eye"></i></div></button></Link></td>
                </tr>
            )
        })
        return archive;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Archive list</h6>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>Renter Name</th>
                                <th>House Name</th>
                                <th>Enter Date</th>
                                <th>Left Date</th>
                                <th>Contact Number</th>
                                <th>Proffesion</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.retnerArchiveList()}
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

export default connect(mapStateToProps, null)(RenterArchive);