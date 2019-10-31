import React from 'react';
import ContactService from '../helpers/ContactService';

class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        }
    }

    addContact = () => {
        const {firstName, email,lastName, phoneNumber} = this.state;
        ContactService.postApi('/', { firstName, email, lastName, phoneNumber})
            .then(json => {
                if (json.data.status === 'success') {
                    this.props.history.push('/index')
                } else {
                    alert('something went wrong!!');
                    this.props.history.push('/index')
                }
            }).catch((error) => {
            console.log("error-----------", error)
        })
    };


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div>
                <h2 className="text-center">Contact Form</h2>
                <div className="row justify-content-md-center">
                    <div className="col-md-6 col-md-offset-3">
                        <form>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input name="firstName" type="text" className="form-control" onChange={this.handleChange} value={this.state.firstName}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input name="lastName" type="text" className="form-control" onChange={this.handleChange} value={this.state.lastName}/>
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input name="email" type="text" className="form-control" onChange={this.handleChange} value={this.state.email}/>
                            </div>

                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input name="phoneNumber" type="text" className="form-control" onChange={this.handleChange} value={this.state.phoneNumber}/>
                            </div>
                            <button type="button" onClick={this.addContact} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default AddContact;
