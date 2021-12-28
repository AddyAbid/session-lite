import React from 'react';
import parseRoute from './lib/parse-route';
import MarketPlace from './pages/market';
import FormPage from './pages/create-form';
import AppDrawer from './pages/drawer';
import Icons from './pages/icons';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {

    window.addEventListener('hashchange', () => {

      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === '' || route.path === 'marketplace') {
      return <MarketPlace />;
    }
    if (route.path === 'form') {

      return <FormPage />;
    }

  }

  render() {
    return (
    <>

    <AppDrawer />
        {this.renderPage()}
     <Icons />

    </>
    );
  }
}
