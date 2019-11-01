import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddContact from './screens/AddContact';
import ListContact from './screens/ListContact';
import EditContact from './screens/EditContact';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={ListContact}/>
      <Route path='/add-contact' component={AddContact}/>
      <Route path='/index' component={ListContact}/>
      <Route path='/edit-contact/:id' component={EditContact}/>
    </div>
  </Router>,
  document.getElementById('root')
);

