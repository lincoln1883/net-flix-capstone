import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('component match the snapshot', () => {
    const navbar = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );
    expect(navbar).toMatchSnapshot();
  });
});
