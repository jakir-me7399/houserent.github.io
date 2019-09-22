import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class MonthRentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rent_list: [],
            rent_month: '',
            rent_year: '',
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

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name == 'rent_month' && this.state.rent_year) {
            const month = e.target.value
            const year = this.state.rent_year
            axios.get(this.props.base_url + 'api/monthly-rent-list/' + month + '/' + year)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            rent_list: response.data
                        })
                    }
                })
        }
    }

    rentList() {
        const flat = this.state.rent_list.map((item) => {
            return (
                <tr key={item.rent_id}>
                    <td>{item.rent_id}</td>
                    <td>{item.house_name + ' (' + item.flat_name + ') '}</td>
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

    selectYearOption() {
        const opt = [];
        const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        years.forEach(item => {
            const data = <option value={item} key={item}>{item}</option>
            opt.push(data);
        });
        return opt;
    }
    selectMonthOption() {
        const opt = [];
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 12; i++) {
            const data = <option value={i + 1} key={i}>{month[i]}</option>
            opt.push(data);
        }
        return opt;
    }
    render() {
        return (
            <div className="br-pagebody">
                <h6 className="tx-inverse tx-uppercase tx-bold tx-14 mg-t-80 mg-b-10">Rent List</h6>
                <h6 className="panel-title">
                    <select name="rent_year" onChange={(e) => this.handleInput(e)} className="btn btn-info mg-t-5 mg-r-8 mg-b-5">
                        <option value="">{"select Year"}</option>
                        {this.selectYearOption()}
                    </select>
                    <select name="rent_month" onChange={(e) => this.handleInput(e)} className="btn btn-info mg-t-5 mg-b-5">
                        <option value="">Select Month</option>
                        {this.selectMonthOption()}
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
export default connect(mapStateToProps, null)(MonthRentList);