import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Layout from '../components/Layout';

describe('Testing the Layout Component', () => {
  let layout;

  beforeEach(() => {
    layout = render(
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>,
    );
  });

  it('Component should render correctly', () => {
    expect(layout.container).toBeInTheDocument();
  });

  it('It should match its snapshot', () => {
    expect(layout).toMatchSnapshot();
  });
});
