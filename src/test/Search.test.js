import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../redux/store';
import Search from '../components/Search';

describe('Search component', () => {
  it('Renders Search component', () => {
    const tree = render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Search />
          </Router>
        </Provider>
      </React.StrictMode>,
    );
    expect(tree).toMatchSnapshot();
  });
});
