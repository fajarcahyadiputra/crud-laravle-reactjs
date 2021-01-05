import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Create from './components/Create';
import Edit from './components/Edit';
import Home from './components/Home';

function Index() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/add" exact component={Create}></Route>
            <Route path="/:id/edit" exact component={Edit}></Route>
        </Switch>
      </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('app')) {
  ReactDOM.render(<Index />, document.getElementById('app'));
}
