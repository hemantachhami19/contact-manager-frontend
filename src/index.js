import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import App from './App';

import AddContact from './components/AddContact';
import ListContact from './components/ListContact';
import EditContact from './components/EditContact';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={ListContact} />
            <Route path='/add-contact' component={AddContact} />
            <Route path='/index' component={ListContact} />
            <Route path='/edit-contact/:id' component={EditContact} />
        </div>
    </Router>,
    document.getElementById('root')
);

