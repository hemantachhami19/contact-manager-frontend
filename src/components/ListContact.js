import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';

class ListContact extends Component {
  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
    }

    componentDidMount(){
      axios.get('http://localhost:8000/api/v1/contacts')
      .then(response => {
        this.setState({ items: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    tabRow(){
      if(this.state.items instanceof Array){
        return this.state.items.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        })
      }
    }
   

    render() {
      return (
        <div className="container" >
        <h3>List of Contacts</h3>
        <Link to={"/add-contact/"} >Add New Contact</Link>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone no</th>
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
