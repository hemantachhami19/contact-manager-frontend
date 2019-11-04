import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ContactService from '../helpers/ContactService';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

class TableRow extends Component {
  deleteDocument = () => {
    ContactService.deleteApi('/contacts/' + this.props.data.id).then(json => {
        if (json.status === 200) {
          alert('Record deleted successfully!!');
          this.props.history.push('/')
        } else {
          alert('something went wrong!!');
          this.props.history.push('/index')
        }
      }).catch((error) => {
        alert('contacts cannot be deleted now. try again later!');
        this.props.history.push('/index')
    })
  };

  render() {
    return (

      <tr>
        <td>
          {this.props.data.firstName}
        </td>
        <td>
          {this.props.data.lastName}
        </td>
        <td>
          {this.props.data.email}
        </td>
        <td>
          {this.props.data.phoneNumber}
        </td>
        <td>
          <Link to={"/edit-contact/" + this.props.data.id} className="btn btn-success btn-sm mr-2"><i
            className="fa fa-fw fa-edit"/>Edit</Link>
          <button type="button" onClick={this.deleteDocument} className="btn btn-danger btn-sm"><i
            className="fa fa-fw fa-trash"/>Delete
          </button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(TableRow);
