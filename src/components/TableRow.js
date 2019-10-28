import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ContactService from './ContactService';
import { withRouter } from 'react-router';
class TableRow extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  deleteDocument= () =>{
    ContactService.deleteApi(this.props.obj.id)
    .then(json => {
    if(json.status===200){
      alert('Record deleted successfully!!');
      this.props.history.push('/index')
    }
    else{
      alert('something went wrong!!');
    this.props.history.push('/index')
    }
    }).catch((error)=>{
    console.log("error-----------",error)
    })
  }
  render() {
      console.log(this.props);
    return (
        <tr>
          <td>
            {this.props.obj.firstName}
          </td>
          <td>
            {this.props.obj.lastName}
          </td>
          <td>
            {this.props.obj.email}
          </td>
          <td>
            {this.props.obj.phoneNumber}
          </td>
          <td>
          <Link to={"/edit-contact/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
        </td>
          <td>
            <form >
              <button type="button" onClick={this.deleteDocument} className="btn btn-danger">Delete</button>
            </form>
          </td>
        </tr>
    );
  }
}

export default withRouter(TableRow);
