import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import PrintProvider, { print, Print } from 'react-easy-print';
import Pdf from 'react-to-pdf';

const ref = React.createRef();

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice_data: [],
            is_downloaded : false,
        }
    }

    componentDidMount() {
        const invoice_id = this.props.match.params.invoice_id
        Axios.get(this.props.base_url + 'api/invoice/' + invoice_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        invoice_data: response.data,
                    })
                }
            })
    }

    handleChagneDownloadStatus(){
        this.setState({ is_downloaded : true});
    }


    render() {
        const { invoice_data } = this.state
        const payment_date = new Date(invoice_data.created_at)
        const rent_month = new Date(invoice_data.rent_month)
        const date = payment_date.getDate() + '-' + (payment_date.getMonth() + 1) + '-' + payment_date.getFullYear()
        const year = rent_month.getFullYear()
        const month = rent_month.toLocaleString('en-us', { month: 'long' });
        return (
            <Fragment>
                <div style={{backgroundColor: "#FFF", padding:'30px 96px', width: '794px'}}>
                    <button onClick={() => window.print()} className="btn btn-primary mg-r-10">Print <i className="fas fa-print mg-l-10"></i></button>
                    <Pdf 
                    targetRef={ref} 
                    y={0} 
                    onComplete={this.handleChagneDownloadStatus.bind(this)}
                    filename="money-receipt.pdf"
                    >
                        {({ toPdf, targetRef }) => <button className="btn btn-dark" disabled={this.state.is_downloaded} onClick={toPdf} ref={targetRef} >Download <i className="fas fa-download mg-l-10"></i></button>}
                    </Pdf>
                </div>
                <div ref={ref} style={{width: '794px', height: '750px', backgroundColor : '#FFF'}}>
                    <div id="invoice" style={{ padding: '50px 96px' }}>
                        <PrintProvider>
                                <Print single name="invoice" id="invoice_print" className="page-content">
                                        <div className="page-title text-center mg-b-30">
                                            <h1 className="tx-inverse text-uppercase">{invoice_data.house_name}</h1>
                                            <h5 className="tx-inverse text-uppercase">Money Receipt</h5>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <ul style={{ listStyleType: "none", padding: '0' }}>
                                                            <li><span>Renter Name </span> : {invoice_data.renter_name}</li>
                                                            <li><span>Flat Name </span> : {invoice_data.house_name + ' ( ' + invoice_data.flat_name + ' )'}</li>
                                                            <li><span>Renter Phone </span> : {invoice_data.phone_number}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <ul style={{ listStyleType: "none", padding: '0' }}>
                                                            <li><span>Rent Month </span> : {month + ' ' + year}</li>
                                                            <li><span>Payment Date </span> : {date}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-colored table-success">
                                                    <thead>
                                                        <tr>
                                                            <th className="wd-10p">SL</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>Basic Rent</td>
                                                            <td>{invoice_data.basic_rent}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">2</th>
                                                            <td>Electricity Bill</td>
                                                            <td>{invoice_data.electricity_bill}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">3</th>
                                                            <td>Water Bill</td>
                                                            <td>{invoice_data.water_bill}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">4</th>
                                                            <td>Gas Bill</td>
                                                            <td>{invoice_data.gas_bill}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">5</th>
                                                            <td>Other Coast</td>
                                                            <td>{invoice_data.others_charge}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="text-right">Total Rent</td>
                                                            <td>{invoice_data.total_rent}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                </Print>
                        </PrintProvider>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(Invoice);