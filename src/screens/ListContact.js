import React, { Component } from 'react';
import TableRow from '../components/TableRow';
import {Link} from 'react-router-dom';
import ContactService from '../helpers/ContactService';

class ListContact extends Component {
  constructor(props) {
      super(props);
      this.state = {value: '', items: []};
    }
    componentDidMount(){
      ContactService.getApi('/')
      .then(response => {
        this.setState({ items: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    tabRow(){
      if(this.state.items.length > 0){
        return this.state.items.map((item, i) => {
           return <TableRow data={item} key={i} />;
        })
      }
    }


    render() {
      return (
        <div className="container" >
            <div>
              <h3 className="text-center">Contact List</h3>
              <Link to={"/add-contact/"} className="float-right btn btn-dark btn-sm mb-1">< i className ="fa fa-fw fa-plus-circle"/>Add New Contact</Link>
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
      );
    }
  }

export default ListContact;
