import React from 'react';
import { Provider } from '@rollbar/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'; // React-Router required correct version of history -> no need to add history to package
import AppRouter from './config/routes';

const App = () => {
  const history = createBrowserHistory();

  return (
    <Provider>
      <AppRouter history={history}/>
    </Provider>
  );
};

export default App;
