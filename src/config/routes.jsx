import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import PropTypes from 'prop-types';
import GroupInformation from '../pages/GroupInformation';

const buildRoutes = history => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/*"
          render={props => {
            return (<Router history={history}>
                <Switch>
                  <Route exact path="/" component={GroupInformation}/>
                </Switch>
              </Router>
            );
          }
          }/>
      </Switch>
    </Router>
  );
};

const RouterWrapper = ({ history }) => {
  return <div className="router-wrapper">{buildRoutes(history)}</div>;
};

RouterWrapper.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterWrapper;
