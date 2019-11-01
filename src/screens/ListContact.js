import React, {Component} from 'react';
import TableRow from '../components/TableRow';
import {Link} from 'react-router-dom';
import ContactService from '../helpers/ContactService';
import Header from "../components/Header";
class ListContact extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', items: [],authenticated: false};
  }

  componentDidMount() {
      // Fetch does not send cookies. So you should add credentials: 'include'
    ContactService.getApi('/').then(response => {
      this.setState({items: response.data.data});
    }).catch(function (error) {
      console.log(error);
    })
  }

  tabRow() {
    console.log("tab",this.state);
    if (this.state.items.length > 0) {
      return this.state.items.map((item, i) => {
        return <TableRow data={item} key={i}/>;
      })
    }
  }


  render() {
      const {authenticated } = this.state;
      return (
      <div>
      <div className="container">
        <div>
            <Header
              authenticated={authenticated}
              handleNotAuthenticated={this._handleNotAuthenticated}
            />

            <h3 className="text-center">Contact List</h3>
          <Link to={"/add-contact/"} className="float-right btn btn-dark btn-sm mb-1">< i
            className="fa fa-fw fa-plus-circle"/>Add New Contact</Link>
        </div>

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
      </div>
    );
  }
}

export default ListContact;
