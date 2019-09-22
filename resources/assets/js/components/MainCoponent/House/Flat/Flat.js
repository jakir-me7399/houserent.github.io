import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Flat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            my_flat: []
        }
    }
    componentDidMount() {
        const house_name_slug = this.props.match.params.house_name_slug
        axios.get(this.props.base_url + 'api/house-flat/' + house_name_slug)
            .then(response => {
                if (response.data) {
                    this.setState({ my_flat: response.data })
                }
            })
    }

    flatList() {
        const flat = this.state.my_flat.map((item) => {
            return (
                <tr key={item.flat_id}>
                    <td>{item.flat_id}</td>
                    <td>{item.flat_name}</td>
                    <td>{item.renter_id ? (
                        <Link to={'/renter-details/' + item.renter_id}>{item.renter_name}</Link>
                    ) : (
                            <Link to={'add-renter/' + item.flat_id}><button className="btn btn-info">Assing new Renter</button></Link>
                        )}
                    </td>
                    <td>{item.flat_rent}</td>
                    <td>
                        <Link to={'/' + item.house_name_slug + '/flat/' + item.flat_id}><button className="btn btn-primary btn-icon mg-r-5 mg-b-10"><div><i className="far fa-eye"></i></div></button></Link>
                        <Link to={'/' +item.house_name_slug + '/edit-flat-info/' + item.flat_id}><button className="btn btn-success btn-icon mg-b-10"><div><i className="fas fa-edit"></i></div></button></Link>
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
export default connect(mapStateToProps, null)(Flat);