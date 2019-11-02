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
        headers: {Accept: "application/json"}
      });
      const json = await response.json();
      if (json.success === true) {
        this.setState({
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
    if (this.state.items.length > 0) {
      return this.state.items.map((item, i) => {
        return <TableRow data={item} key={i}/>;
      })
    }
  }

  render() {
    const {authenticated} = this.state;
    return (
      <div className="container">
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <h3 className="text-center">Contact List</h3>
        <Link to={"/add-contact/"} className="float-right btn btn-dark btn-sm mb-1">< i
          className="fa fa-fw fa-plus-circle"/>Add New Contact</Link>
        <table className="table table-striped">
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
    );
  }

}

export default ListContact;
