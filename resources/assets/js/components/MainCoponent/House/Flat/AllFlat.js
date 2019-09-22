import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllFlat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            my_all_flat: []
        }
    }
    componentDidMount() {
        const owner_id = localStorage.getItem('id')
        axios.get(this.props.base_url + 'api/my-flat/' + owner_id)
            .then(response => {
                if (response.data) {
                    this.setState({ my_all_flat: response.data })
                }
            })
    }
    // deleteFlat(flat_id) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.value) {
    //             axios.delete(this.props.base_url + 'api/delete-flat/' + flat_id)
    //                 .then(response => {
    //                     if (response.data == 200) {
    //                         let old_flat = this.state.my_all_flat;
    //                         const ind = old_flat.findIndex(item => item.flat_id == flat_id);
    //                         old_flat.splice(ind, 1);
    //                         this.setState({ my_house: old_flat })
    //                         Swal.fire(
    //                             'Deleted!',
    //                             'Your file has been deleted.',
    //                             'success'
    //                         )
    //                     }
    //                 })
    //         }
    //     })
    // }

    flatList() {
        const flat = this.state.my_all_flat.map((item) => {
            return (
                <tr key={item.flat_id}>
                    <td>{item.flat_id}</td>
                    <td>{item.flat_name}</td>
                    <td>{item.renter_id ? (
                        <Link to={'/renter-details/' + item.renter_id}>{item.renter_name}</Link>
                    ) : (
                            <Link to={item.house_name_slug + '/add-renter/' + item.flat_id}><button className="btn btn-info">Assing new Renter</button></Link>
                        )}
                    </td>
                    <td>{item.flat_rent}</td>
                    <td>
                        <Link to={item.house_name_slug + '/flat/' + item.flat_id}><button className="btn btn-primary btn-icon mg-r-5 mg-b-10"><div><i className="far fa-eye"></i></div></button></Link>
                        <Link to={item.house_name_slug + '/edit-flat-info/' + item.flat_id}><button className="btn btn-success btn-icon mg-b-10"><div><i className="fas fa-edit"></i></div></button></Link>
                        {/* <li><button onClick={() => { this.deleteFlat(item.flat_id) }} className="btn btn-danger">Delete</button></li> */}
                    </td>
                </tr>
            )
        })
        return flat;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">My Flat List</h6>
                {/* <div className="row">
                    <div className="col-sm-6 col-md-3 mg-t-20 mg-lg-t-0">
                        <Link to="/add-house" className="btn btn-success btn-with-icon btn-block mg-t-10  mg-b-10">
                            <div className="ht-40">
                                <span className="icon wd-40"><i className="fas fa-plus"></i></span>
                                <span className="pd-x-15">Add a new house</span>
                            </div>
                        </Link>
                    </div>
                </div> */}
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Flat Name</th>
                                <th>Renter Name</th>
                                <th>Basic Rent</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.flatList()}
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
export default connect(mapStateToProps, null)(AllFlat);