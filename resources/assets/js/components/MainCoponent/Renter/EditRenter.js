import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactSummernote from 'react-summernote'
import '../../../../../../node_modules/react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-uk-UA'
import Axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'

class EditRenter extends Component {
    constructor(props) {
        super(props);
        this.nid_scan = React.createRef();
        this.renter_photo = React.createRef();
        this.state = {
            edit_renter: {},
            flat_id: '',
            renter_name: '',
            members: '',
            members_description: '',
            nid: '',
            nid_scan: '',
            renter_photo: '',
            renter_profession: '',
            permanent_address: '',
            old_address: '',
            phone_number: '',
            left_date: '',
            enter_date: ''
        }
        this.handelInputMemberDescription = this.handelInputMemberDescription.bind(this);
        this.handelInputPermanentAddress = this.handelInputPermanentAddress.bind(this);
        this.handelInputOldAddress = this.handelInputOldAddress.bind(this);
    }

    componentDidMount() {
        const renter_id = this.props.match.params.renter_id
        Axios.get(this.props.base_url + 'api/edit-renter/' + renter_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        flat_id: response.data.flat_id,
                        renter_name: response.data.renter_name,
                        members: response.data.members,
                        members_description: response.data.members_description,
                        nid: response.data.nid,
                        nid_scan: response.data.nid_scan,
                        renter_photo: response.data.renter_photo,
                        renter_profession: response.data.renter_profession,
                        permanent_address: response.data.permanent_address,
                        old_address: response.data.old_address,
                        phone_number: response.data.phone_number,
                        left_date: response.data.left_date,
                        enter_date: response.data.enter_date,
                        flat_name: response.data.flat_name
                    })
                }
            })
    }

    handelInputMemberDescription(e) {
        this.setState({ members_description: e })
    }

    handelInputPermanentAddress(e) {
        this.setState({ permanent_address: e })
    }

    handelInputOldAddress(e) {
        this.setState({ old_address: e })
    }

    handleSelectInput(e) {
        this.setState({
            [e.name]: e.value
        })
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { flat_id, renter_name, members, members_description, nid, renter_profession, permanent_address, old_address, phone_number, left_date, enter_date } = this.state;
        const nid_scan_copy = this.nid_scan.current.files[0];
        const renter_image = this.renter_photo.current.files[0];
        const form_data = new FormData();
        form_data.append('nid_scan', nid_scan_copy);
        form_data.append('renter_id', this.props.match.params.renter_id);
        form_data.append('renter_photo', renter_image);
        form_data.append('flat_id', flat_id);
        form_data.append('renter_name', renter_name);
        form_data.append('members', members);
        form_data.append('members_description', members_description);
        form_data.append('nid', nid);
        form_data.append('permanent_address', permanent_address);
        form_data.append('old_address', old_address);
        form_data.append('renter_profession', renter_profession);
        form_data.append('phone_number', phone_number);
        form_data.append('enter_date', enter_date);
        form_data.append('left_date', left_date);

        Axios.post(this.props.base_url + 'api/update-renter', form_data)
            .then(response => {
                if (response.data == 200) {
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
                    <h4 className="tx-gray-800 mg-b-5">Add a New Renter</h4>
                </div>
                <div className="br-pagebody">
                    <form onSubmit={(e) => this.handleOnSubmit(e)} className="br-section-wrapper" data-parsley-validate>
                        <div className="form-layout form-layout-5">
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_id"><span className="tx-danger">*</span> Flat Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="flat_id" onChange={(e) => this.handleInput(e)} className="form-control" readOnly>
                                        <option value={this.state.flat_id}>{this.state.flat_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="renter_name"><span className="tx-danger">*</span> Renter Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.renter_name} className="form-control" id="renter_name" name="renter_name" placeholder="Renter Name" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="members"><span className="tx-danger">*</span> Total Members:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.members} id="members" name="members" placeholder="Members in number" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="members_description"><span className="tx-danger">*</span>Member Description:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <ReactSummernote
                                        options={{
                                            lang: 'uk-UA',
                                            height: 100,
                                            dialogsInBody: true,
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
                                        onChange={this.handelInputMemberDescription}
                                        value={this.state.members_description}
                                    />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="nid"><span className="tx-danger">*</span>NID Number:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.nid} id="nid" name="nid" placeholder="NID Number" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="nid_scan"><span className="tx-danger">*</span> NID Scan Copy:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <label className="custom-file wd-100p">
                                        <input type="file" ref={this.nid_scan} onChange={(e) => this.handleInput(e)} name="nid_scan" id="nid_scan" />
                                        {/* <span className="custom-file-control custom-file-control-primary"></span> */}
                                    </label>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label"> </label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div>
                                        <figure>
                                            <img src={this.props.base_url + this.state.nid_scan} style={{ width: '80px', margin: '10px' }} />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="renter_photo"><span className="tx-danger">*</span> Renter Image:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <label className="custom-file wd-100p">
                                        <input type="file" ref={this.renter_photo} onChange={(e) => this.handleInput(e)} name="renter_photo" id="renter_photo" />
                                        {/* <span className="custom-file-control custom-file-control-primary"></span> */}
                                    </label>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label"> </label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div>
                                        <figure>
                                            <img src={this.props.base_url + this.state.renter_photo} style={{ width: '80px', margin: '10px' }} />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="renter_profession"><span className="tx-danger">*</span> Renter Profession:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.renter_profession} id="renter_profession" name="renter_profession" placeholder="Renter Profession" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="permanent_address"><span className="tx-danger">*</span>Permanent Address:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <ReactSummernote
                                        options={{
                                            lang: 'uk-UA',
                                            height: 100,
                                            dialogsInBody: true,
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
                                        onChange={this.handelInputPermanentAddress}
                                        value={this.state.permanent_address}
                                    />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="old_address"><span className="tx-danger">*</span>Old Address:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <ReactSummernote
                                        options={{
                                            lang: 'uk-UA',
                                            height: 100,
                                            dialogsInBody: true,
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
                                        onChange={this.handelInputOldAddress}
                                        value={this.state.old_address}
                                    />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="phone_number"><span className="tx-danger">*</span> Phone Number:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.phone_number} id="phone_number" name="phone_number" placeholder="Phone Number" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="left_date"><span className="tx-danger">*</span> Left date:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="date" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.left_date} id="left_date" name="left_date" placeholder="Left date" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="enter_date"><span className="tx-danger">*</span> Enter Date:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="date" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.enter_date} id="enter_date" name="enter_date" placeholder="Enter date" />
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
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        base_url: state.base_url
    }
}

export default connect(mapStateToProps, null)(EditRenter);