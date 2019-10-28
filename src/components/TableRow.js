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
      this.props.history.push('/')
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
              <Link to={"/edit-contact/"+this.props.obj.id} className="btn btn-primary btn-xl mr-2"><i className="fa fa-fw fa-edit"/>Edit</Link>
          <button type="button" onClick={this.deleteDocument} className="btn btn-danger"><i
              className="fa fa-fw fa-edit"/>Delete</button>
          </td>
        </tr>
    );
  }
}

export default withRouter(TableRow);
