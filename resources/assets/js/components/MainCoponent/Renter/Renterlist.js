import React, { Component } from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class Renterlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renter_list: []
        }
    }
    componentDidMount() {
        axios.get(this.props.base_url + 'api/renter-list')
            .then(response => {
                if (response.data) {
                    this.setState({ renter_list: response.data })
                }
            })
    }
    deleteRenter(renter_id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete(this.props.base_url + 'api/delete-renter/' + renter_id)
                    .then(response => {
                        if (response.data) {
                            let old_renter = this.state.renter_list;
                            const ind = old_renter.findIndex(item => item.renter_id == renter_id);
                            old_renter.splice(ind, 1);
                            this.setState({ renter_list: old_renter })
                            Swal.fire(
                                'Deleted!',
                                'Your file has been store in archive.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    renterList() {
        const renter = this.state.renter_list.map((item) => {
            const permanent_address = parse(item.permanent_address)
            return (
                <tr key={item.renter_id}>
                    <td>{item.renter_id}</td>
                    <td><Link to={'renter-details/' + item.renter_id}>{item.renter_name}</Link></td>
                    <td>{item.house_name + ' ' + '(' + item.flat_name + ')'}</td>
                    <td>{item.phone_number}</td>
                    <td>{permanent_address}</td>
                    <td><Link to={'/renter-transaction/' + item.renter_id}><button className="btn btn-info">Transaction</button></Link></td>
                    <td>
                        <Link to={'edit-renter/' + item.renter_id}><button className="btn btn-success btn-icon mg-r-5 mg-b-10"><div><i className="fas fa-edit"></i></div></button></Link>
                        <button onClick={() => { this.deleteRenter(item.renter_id) }} className="btn btn-danger btn-icon mg-b-10"><div><i className="fas fa-trash-alt"></i></div></button>
                    </td>
                </tr>
            )
        })
        return renter;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Renter List</h6>
                <div className="row">
                    <div className="col-sm-6 col-md-3 mg-t-20 mg-lg-t-0">
                        <Link to="/add-renter" className="btn btn-success btn-with-icon btn-block mg-t-10  mg-b-10">
                            <div className="ht-40">
                                <span className="icon wd-40"><i className="fas fa-plus"></i></span>
                                <span className="pd-x-15">Add New Renter</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Renter Name</th>
                                <th>Flat Name</th>
                                <th>Contact Number</th>
                                <th>Permanent Address</th>
                                <th>Transaction</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renterList()}
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
export default connect(mapStateToProps, null)(Renterlist);