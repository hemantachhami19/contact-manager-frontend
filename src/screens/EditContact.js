import React, {Component} from 'react';
import ContactService from '../helpers/ContactService';
import TextInputGroup from "../components/TextInputGroup";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      errors: {}
    }
  }

  componentDidMount() {
    ContactService.getApi('/contacts/' + this.props.match.params.id)
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

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  editContact = () => {
    const {firstName, email, lastName, phoneNumber} = this.state;
    if (firstName === "") {
      this.setState({errors: {firstName: "First Name is required"}});
      return;
    }
    if (lastName === "") {
      this.setState({errors: {lastName: "Last Name is required"}});
      return;
    }
    if (email === "") {
      this.setState({errors: {email: "Email is required"}});
      return;
    }
    if (phoneNumber === "") {
      this.setState({errors: {phoneNumber: "PhoneNumber is required"}});
      return;
    }

    ContactService.putApi('/contacts/' + this.props.match.params.id, {
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
    const {firstName, email, lastName, phoneNumber, errors} = this.state;
    return (
      <div className="container mt-4">
      <div className="card">
        <div className="card-header">Edit Contacts</div>
        <div className="card-body">
          <form>
            <TextInputGroup
              label="First Name"
              name="firstName"
              value={firstName}
              placeholder="enter first name "
              onChange={this.onChange}
              error={errors.firstName}
            />

            <TextInputGroup
              label="Last Name"
              name="lastName"
              value={lastName}
              placeholder="enter last name"
              onChange={this.onChange}
              error={errors.lastName}
            />

            <TextInputGroup
              label="Email"
              name="email"
              value={email}
              placeholder="enter email"
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone Number:"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="enter phone number"
              onChange={this.onChange}
              error={errors.phoneNumber}
            />
            <button type="button" onClick={this.editContact} className="btn  btn-primary">Update Contact</button>
          </form>
        </div>
      </div>
      </div>

    );
  }
}

export default EditContact;