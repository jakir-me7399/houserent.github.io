import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.owner_nid_copy = React.createRef();
        this.owner_photo = React.createRef();
        this.state = {
            owner_name: '',
            owner_photo: '',
            required_owner_name: '',
            owner_email: '',
            required_owner_email: '',
            owner_phone: '',
            required_owner_phone: '',
            owner_nid: '',
            required_owner_nid: '',
            owner_nid_copy: '',
            required_owner_nid_copy: '',
            owner_address: '',
            required_owner_address: '',
            password: '',
            required_password: '',
            password_confirmation: '',
            required_password_confirmation: '',
        }
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmint(e) {
        e.preventDefault();
        const owner_nid_copy = this.owner_nid_copy.current.files[0]
        const owner_photo = this.owner_photo.current.files[0]
        const from_data = new FormData();
        from_data.append('owner_nid_copy', owner_nid_copy)
        from_data.append('owner_photo', owner_photo)
        from_data.append('owner_name', this.state.owner_name)
        from_data.append('owner_email', this.state.owner_email)
        from_data.append('owner_phone', this.state.owner_phone)
        from_data.append('owner_nid', this.state.owner_nid)
        from_data.append('owner_address', this.state.owner_address)
        from_data.append('password', this.state.password)
        from_data.append('password_confirmation', this.state.password_confirmation)
        axios.post(this.props.base_url + 'api/store-admin', from_data)
            .then(response => {
                if (response.data) {
                    this.setState({
                        owner_photo: '',
                        owner_name: '',
                        required_owner_name: '',
                        owner_email: '',
                        required_owner_email: '',
                        owner_phone: '',
                        required_owner_phone: '',
                        owner_nid: '',
                        required_owner_nid: '',
                        owner_nid_copy: '',
                        required_owner_nid_copy: '',
                        owner_address: '',
                        required_owner_address: '',
                        password: '',
                        required_password: '',
                        password_confirmation: '',
                        required_password_confirmation: '',
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
                <div className="bg-br-primary pd-y-20">
                    <div className="d-flex justify-content-center bg-br-primary">
                        <form onSubmit={(e) => this.handleSubmint(e)} className="login-wrapper wd-300 wd-xs-400 pd-25 pd-xs-40 bg-white rounded shadow-base">
                            <div className="signin-logo tx-center tx-28 tx-bold tx-inverse"><span className="tx-normal">[</span> EI Technology <span className="tx-normal">]</span></div>
                            <div className="tx-center mg-b-40">The Admin Template For Perfectionist</div>

                            <div className="form-group">
                                <label className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Full Name</label>
                                <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.owner_name} className="form-control" name="owner_name" id="owner_name" placeholder="Full Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner_email" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Email</label>
                                <input type="email" onChange={(e) => this.handleInput(e)} value={this.state.owner_email} name="owner_email" className="form-control" id="owner_email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner_phone" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Phone Number</label>
                                <input type="number" onChange={(e) => this.handleInput(e)} value={this.state.owner_phone} name="owner_phone" className="form-control" id="owner_phone" placeholder="Enter your phone number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner_nid" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">NID Number</label>
                                <input type="number" onChange={(e) => this.handleInput(e)} value={this.state.owner_nid} name="owner_nid" className="form-control" id="owner_nid" placeholder="Enter your nid number" />
                            </div>
                            <div className="form-group">
                                <label className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Profile Image</label>
                                <label className="custom-file wd-100p">
                                    <input type="file" ref={this.owner_photo} onChange={(e) => this.handleInput(e)} value={this.state.owner_photo} name="owner_photo" id="owner_photo" className="custom-file-input" />
                                    <span className="custom-file-control custom-file-control-primary"></span>
                                </label>
                           </div>
                            <div className="form-group">
                                <label className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">NID Scan Copy</label>
                                <label className="custom-file wd-100p">
                                    <input type="file" ref={this.owner_nid_copy} onChange={(e) => this.handleInput(e)} value={this.state.owner_nid_copy} name="owner_nid_copy" id="owner_nid_copy" className="custom-file-input" />
                                    <span className="custom-file-control custom-file-control-primary"></span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner_address" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Address</label>
                                <textarea onChange={(e) => this.handleInput(e)} value={this.state.owner_address} name="owner_address" className="form-control" id="owner_address"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Create Password</label>
                                <input type="password" onChange={(e) => this.handleInput(e)} value={this.state.password} className="form-control" id="password" name="password" placeholder="Create a password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation" className="d-block tx-11 tx-uppercase tx-medium tx-spacing-1">Confrim password</label>
                                <input type="password" onChange={(e) => this.handleInput(e)} value={this.state.password_confirmation} name="password_confirmation" className="form-control" id="password_confirmation" placeholder="Confrim password" />
                            </div>

                            <div className="form-group tx-12">By clicking the Sign Up button below, you agreed to our privacy policy and terms of use of our website.</div>
                            <button type="submit" className="btn btn-info btn-block">Sign Up</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        base_url: state.base_url,
    }
}
export default connect(mapStatetoProps, null)(Registration);
