import React, { Component } from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            my_house: []
        }
    }
    componentDidMount() {
        const owner_id = localStorage.getItem('id')
        axios.get(this.props.base_url + 'api/my-house/' + owner_id)
            .then(response => {
                if (response.data) {
                    this.setState({ my_house: response.data })
                }
            })
    }
    // deleteHouse(house_id) {
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
    //             axios.delete(this.props.base_url + 'api/delete-house/' + house_id)
    //                 .then(response => {
    //                     if (response.data == 200) {
    //                         let old_house = this.state.my_house;
    //                         const ind = old_house.findIndex(item => item.house_id == house_id);
    //                         old_house.splice(ind, 1);
    //                         this.setState({ my_house: old_house })
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

    houseList() {
        const house = this.state.my_house.map((item) => {
            const house_address = parse(item.house_address)
            const house_information = parse(item.house_information)
            return (
                <tr key={item.house_id}>
                    <td>{item.house_id}</td>
                    <td><Link to={'/' + item.house_name_slug + '/flat'}>{item.house_name}</Link></td>
                    <td>{item.house_number}</td>
                    <td>{house_address}</td>
                    <td>{house_information}</td>
                    <td><Link to={'edit-house/' + item.house_id}><button className="btn btn-info">Edit</button></Link>
                        {/* <ul>
                            <li><Link to={'edit-house/' + item.house_id}><button className="btn btn-info">Edit</button></Link></li>
                            <li><button onClick={() => { this.deleteHouse(item.house_id) }} className="btn btn-danger">Delete</button></li>
                        </ul> */}
                    </td>
                </tr>
            )
        })
        return house;
    }
    render() {
        return (

            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">
                    My House
                </h6>
                <div className="row">
                    <div className="col-sm-6 col-md-3 mg-t-20 mg-lg-t-0">
                        <Link to="/add-house" className="btn btn-success btn-with-icon btn-block mg-t-10  mg-b-10">
                            <div className="ht-40">
                                <span className="icon wd-40"><i className="fas fa-plus"></i></span>
                                <span className="pd-x-15">Add a new house</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bd bd-gray-300 rounded table-responsive">
                    <table className="table table-striped mg-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>House Name</th>
                                <th>House Number</th>
                                <th>House Address</th>
                                <th>House Information</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.houseList()}
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
export default connect(mapStateToProps, null)(House);