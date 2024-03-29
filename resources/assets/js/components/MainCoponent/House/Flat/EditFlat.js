import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactSummernote from 'react-summernote'
import '../../../../../../../node_modules/react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-uk-UA'
import Swal from 'sweetalert2'

class EditFlat extends Component {
    constructor(props) {
        super(props);
        this.flat_photo = React.createRef();
        this.state = {
            renter_list: [],
            house_list: [],
            edit_flat: {},
            renter_id: '',
            house_id: '',
            house_name: '',
            flat_name: '',
            flat_rent: '',
            flat_bed_room: '',
            flat_drawing_room: '',
            flat_dining_room: '',
            flat_wash_room: '',
            flat_kitchen: '',
            flat_balcony: '',
            flat_window: '',
            flat_photo: [],
            flat_description: ''
        }
        this.handelInputFlatdiscription = this.handelInputFlatdiscription.bind(this);
    }

    componentDidMount() {
        const flat_id = this.props.match.params.flat_id;
        axios.get(this.props.base_url + 'api/edit-flat/' + flat_id)
            .then(response => {
                if (response.data) {
                    this.setState({
                        edit_flat: response.data,
                        renter_id: response.data.renter_id,
                        house_id: response.data.house_id,
                        flat_name: response.data.flat_name,
                        flat_rent: response.data.flat_rent,
                        flat_bed_room: response.data.flat_bed_room,
                        flat_drawing_room: response.data.flat_drawing_room,
                        flat_dining_room: response.data.flat_dining_room,
                        flat_kitchen: response.data.flat_kitchen,
                        flat_wash_room: response.data.flat_wash_room,
                        flat_balcony: response.data.flat_balcony,
                        flat_window: response.data.flat_window,
                        flat_description: response.data.flat_description,
                        flat_photo: response.data.flat_photo,
                        house_name: response.data.house_name,
                        renter_name: response.data.renter_name,
                    })
                }
            })
    }

    handelInputFlatdiscription(e) {
        this.setState({ flat_description: e })
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSelectInput(e) {
        this.setState({
            [e.name]: e.value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const file_data = this.flat_photo.current.files;
        const form_data = new FormData();
        for (var i = 0; i < file_data.length; i++) {
            form_data.append('flat_photo[' + i + ']', file_data[i]);
        }
        form_data.append('flat_id', this.props.match.params.flat_id);
        form_data.append('renter_id', this.state.renter_id);
        form_data.append('house_id', this.state.house_id);
        form_data.append('flat_name', this.state.flat_name);
        form_data.append('flat_rent', this.state.flat_rent);
        form_data.append('flat_bed_room', this.state.flat_bed_room);
        form_data.append('flat_drawing_room', this.state.flat_drawing_room);
        form_data.append('flat_dining_room', this.state.flat_dining_room);
        form_data.append('flat_wash_room', this.state.flat_wash_room);
        form_data.append('flat_kitchen', this.state.flat_kitchen);
        form_data.append('flat_balcony', this.state.flat_balcony);
        form_data.append('flat_window', this.state.flat_window);
        form_data.append('flat_description', this.state.flat_description);

        axios.post(this.props.base_url + 'api/update-flat-info', form_data)
            .then(response => {
                if (response.data) {
                    Swal.fire({
                        position: 'top-center',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    editImage() {
        const images = this.state.edit_flat.flat_photo ? JSON.parse(this.state.edit_flat.flat_photo) : [];
        const image = images.map((item, i) => {
            return (
                <figure key={i} style={{ display: 'inline-block' }}>
                    <img src={this.props.base_url + item} width="100px" style={{ margin: '5px' }} alt="something" />
                </figure>
            )
        })
        return image
    }

    render() {
        return (
            <Fragment>
                <div className="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
                    <h4 className="tx-gray-800 mg-b-5">Add Flat</h4>
                </div>
                <div className="br-pagebody">
                    <form onSubmit={(e) => this.handleOnSubmit(e)} className="br-section-wrapper" data-parsley-validate>
                        <div className="form-layout form-layout-5">
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="house_id"><span className="tx-danger">*</span> House Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <select name="house_id" onChange={(e) => this.handleInput(e)} className="form-control">
                                        <option value={this.state.house_id}>{this.state.house_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_name"><span className="tx-danger">*</span> Flat Name:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.flat_name} className="form-control" id="flat_name" name="flat_name" placeholder="Flat Name" required />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_rent"><span className="tx-danger">*</span> Flat Basic Rent:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.flat_rent} id="flat_rent" name="flat_rent" placeholder="Flat rent" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_bed_room"><span className="tx-danger">*</span>BedRoom:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.flat_bed_room} id="flat_bed_room" name="flat_bed_room" placeholder="Flat bed room number" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label">Flat Drawing Room:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_drawing_room" onChange={(e) => this.handleInput(e)} value="1" checked={this.state.flat_drawing_room == 1} />
                                                <span>Yes</span>
                                            </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_drawing_room" onChange={(e) => this.handleInput(e)} value="0" checked={this.state.flat_drawing_room == 0} />
                                                <span>No</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label">Flat Dining Room:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_dining_room" onChange={(e) => this.handleInput(e)} value="1" checked={this.state.flat_dining_room == 1} />
                                                <span>Yes</span>
                                            </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_dining_room" onChange={(e) => this.handleInput(e)} value="0" checked={this.state.flat_dining_room == 0} />
                                                <span>No</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label">Flat Kitchen Room:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_kitchen" onChange={(e) => this.handleInput(e)} value="1" checked={this.state.flat_kitchen == 1} />
                                                <span>Yes</span>
                                            </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="rdiobox">
                                                <input type="radio" name="flat_kitchen" onChange={(e) => this.handleInput(e)} value="0" checked={this.state.flat_kitchen == 0} />
                                                <span>No</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_wash_room"><span className="tx-danger">*</span>Flat Washroom:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.flat_wash_room} id="flat_wash_room" name="flat_wash_room" placeholder="Washroom number" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_balcony"><span className="tx-danger">*</span>Flat Balcony:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.flat_balcony} id="flat_wash_room" name="flat_balcony" placeholder="Belcony number" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_window"><span className="tx-danger">*</span>Flat Window:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <input type="text" className="form-control" onChange={(e) => this.handleInput(e)} value={this.state.flat_window} id="flat_window" name="flat_window" placeholder="Total window number" />
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label"></label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <div>
                                        {this.editImage()}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-3 form-control-label" htmlFor="flat_photo"><span className="tx-danger">*</span>Flat Images:</label>
                                <div className="col-sm-9 mg-t-10 mg-sm-t-0">
                                    <label className="custom-file wd-100p">
                                        <input type="file" ref={this.flat_photo} onChange={(e) => this.handleInput(e)} multiple name="flat_photo" id="flat_photo" />
                                        {/* <span className="custom-file-control custom-file-control-primary"></span> */}
                                    </label>
                                </div>
                            </div>
                            <div className="row mg-t-20">
                                <label className="col-sm-3 form-control-label" htmlor="flat_description"><span className="tx-danger">*</span>Flat Description</label>
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
                                        onChange={this.handelInputFlatdiscription}
                                        value={this.state.flat_description}
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

export default connect(mapStateToProps, null)(EditFlat);