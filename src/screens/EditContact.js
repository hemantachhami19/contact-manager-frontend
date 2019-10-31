import React, {Component} from 'react';
import ContactService from '../helpers/ContactService';

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  }

  componentDidMount() {
    ContactService.getApi('/' + this.props.match.params.id)
      .then(response => {
        console.log(response, 'response------');
        this.setState({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
          phoneNumber: response.data.data.phoneNumber
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  editContact = () => {
    console.log(this.props.match.params.id, '--id');
    ContactService.putApi('/' + this.props.match.params.id, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    })
      .then(json => {
        console.log(json, 'response on edit request!!!!!');
        if (json.status === 200) {
          alert('Record updated successfully!!');
          this.props.history.push('/index')
        } else {
          alert('something went wrong!!');
          this.props.history.push('/index')
        }
      }).catch((error) => {
      console.log("error-----------", error)
    })
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
                <input name="firstName" type="text" className="form-control" onChange={this.handleChange}
                       value={this.state.firstName}/>
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input name="lastName" type="text" className="form-control" onChange={this.handleChange}
                       value={this.state.lastName}/>
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input name="email" type="text" className="form-control" onChange={this.handleChange}
                       value={this.state.email}/>
              </div>

              <div className="form-group">
                <label>Phone Number:</label>
                <input name="phoneNumber" type="text" className="form-control" onChange={this.handleChange}
                       value={this.state.phoneNumber}/>
              </div>
              <button type="button" onClick={this.editContact} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default EditContact;