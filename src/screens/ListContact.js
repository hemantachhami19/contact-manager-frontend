import React, {Component} from 'react';
import TableRow from '../components/TableRow';
import {Link} from 'react-router-dom';
import ContactService from '../helpers/ContactService';
import Header from "../components/Header";
import config from '../helpers/config'

class ListContact extends Component {

  constructor(props) {
    super(props);
    this.state = {user: {}, items: [], authenticated: false};
  }

  async componentDidMount() {
    try {
      //Making api call to check
      const response = await fetch(config.checkAuthUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        mode: 'cors',
      });
      const json = await response.json();
      if (json.success === true) {
        await this.setState({
          authenticated: true,
          user: json.user
        });
        const res = await ContactService.getApi('/contacts');
        if (res.data.status === 'success') {
          this.setState({items: res.data.data});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  tabRow() {
    if (typeof this.state.items !== 'undefined' || this.state.items.length > 0) {
      return this.state.items.map((item, i) => {
        return <TableRow data={item} key={i}/>;
      })
    }
  }

  render() {
    const {authenticated} = this.state;
    console.log("authentication status ==", authenticated);
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        {authenticated ?
          (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Link to={"/add-contact/"} className="float-right btn btn-dark btn-sm mb-1">< i
                    className="fa fa-fw fa-plus-circle"/>Add New Contact</Link>
                </div>
              </div>
              <div className="row">
                <table className="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.tabRow()}
                  </tbody>
                </table>
              </div>

            </div>)
          : (
            <div className="container">
              <h1 className="display-4">simple Contact Manger</h1>
              <p className="lead">Simple app to manage contacts</p>
              <p onClick={this._handleSignInClick}> Login with <i className="fab fa-facebook-square"/>  Facebook</p>
            </div>
          )

        }
      </div>
    );
  }

  _handleSignInClick = () => {
    console.log(config.loginUrl);
    // Authenticate using via passport api in the backend
    // Open facebook login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(config.loginUrl, "_self");
  }

}

export default ListContact;
