import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rent_list: []
    }
  }
  componentDidMount() {
    axios.get(this.props.base_url + 'api/rent-list')
      .then(response => {
        if (response.data) {
          this.setState({ rent_list: response.data })
        }
      })
  }

  rentList() {
    const flat = this.state.rent_list.map((item) => {
      return (
        <tr key={item.rent_id}>
          <td>{item.rent_id}</td>
          <td>{item.house_name}</td>
          <td>{item.flat_name}</td>
          <td>{item.renter_name}</td>
          <td>{item.rent_month}</td>
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
        <div className="row">
          <div className="col-sm-6 col-md-3 mg-t-20 mg-lg-t-0">
            <Link to="/flat-rent-form" className="btn btn-success btn-with-icon btn-block mg-t-10  mg-b-10">
              <div className="ht-40">
                <span className="icon wd-40"><i className="fas fa-plus"></i></span>
                <span className="pd-x-15">Rent form</span>
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
                <th>Flat Name</th>
                <th>Renter Name</th>
                <th>Rent Month</th>
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
export default connect(mapStateToProps, null)(RentList);