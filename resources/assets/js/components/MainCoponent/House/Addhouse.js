import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactSummernote from 'react-summernote'
import '../../../../../../node_modules/react-summernote/dist/react-summernote.css'
import '../../../../../../node_modules/react-summernote/lang/summernote-uk-UA'
import Swal from 'sweetalert2'

class Addhouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house_name: '',
            house_number: '',
            house_address: '',
            house_information: ''
        }
        this.handelInputHouseAddress = this.handelInputHouseAddress.bind(this);
        this.handelInputHouseInformation = this.handelInputHouseInformation.bind(this);
    }

    handelInputHouseAddress(e) {
        this.setState({ house_address: e })
    }
    handelInputHouseInformation(e) {
        this.setState({ house_information: e })
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const id = localStorage.getItem('id')
        const { house_name, house_number, house_address, house_information } = this.state;
        const data = {
            owner_id: id,
            house_name: house_name,
            house_number: house_number,
            house_address: house_address,
            house_information: house_information
        }
        axios.post(this.props.base_url + 'api/create-house', data)
            .then(response => {
                if (response.data == 200) {
                    this.setState({
                        house_name: '',
                        house_number: '',
                        house_address: '',
                        house_information: ''
                    })
                    Swal.fire({
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    render() {
        return (
            <Fragment>
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5">Add House</h4>
                </div>
                <div className="br-pagebody">
                    <form onSubmit={(e) => this.handleOnSubmit(e)} className="br-section-wrapper" data-parsley-validate>
                        <div className="form-layout form-layout-5">
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="house_name"><span className="tx-danger">*</span> House Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.house_name} className="form-control" id="house_name" name="house_name" placeholder="House Name" required/>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="house_number"><span className="tx-danger">*</span> House Number:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.house_number} id="house_number" name="house_number" placeholder="Your House Number" required/>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="house_address"><span className="tx-danger">*</span> House Address</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <ReactSummernote
                                        options={{
                                            lang: 'uk-UA',
                                            height: 100,
                                            dialogsInBody: true,
                                            // required,
                                            toolbar: [
                                                ['style', ['style']],
                                                ['font', ['bold', 'underline', 'clear']],
                                                ['fontname', ['fontname']],
                                                ['para', ['ul', 'ol', 'paragraph']],
                                                ['table', ['table']],
                                                ['insert', ['link', 'picture', 'video']],
                                                ['view', ['fullscreen', 'codeview']]
                                            ]
                                        }}
                                        onChange={this.handelInputHouseAddress}
                                        value={this.state.house_address}
                                    />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="house_information"><span className="tx-danger">*</span> House Information</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <ReactSummernote
                                        options={{
                                            lang: 'uk-UA',
                                            height: 100,
                                            dialogsInBody: true,
                                            // required,
                                            toolbar: [
                                                ['style', ['style']],
                                                ['font', ['bold', 'underline', 'clear']],
                                                ['fontname', ['fontname']],
                                                ['para', ['ul', 'ol', 'paragraph']],
                                                ['table', ['table']],
                                                ['insert', ['link', 'picture', 'video']],
                                                ['view', ['fullscreen', 'codeview']]
                                            ]
                                        }}
                                        onChange={this.handelInputHouseInformation}
                                        value={this.state.house_information}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mg-t-30">
                            <div className="col-sm-8 mg-l-auto">
                                <div className="form-layout-footer">
                                    <button type="submit" className="btn btn-info">Submit Form</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(Addhouse);