import React from 'react';
import parseRoute from './lib/parse-route';
import MarketPlace from './pages/market';
import FormPage from './pages/create-form';
import AppDrawer from './components/drawer';
import Icons from './components/icons';
import Details from './pages/post-details';
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
    if (route.path === 'posts') {
      const postId = route.params.get('postId');
      return <Details postId={postId}/>;
    }
  }

  render() {
    return (
    <>

    <AppDrawer />
        {this.renderPage()}
     <Icons route={this.state.route}/>

    </>
    );
  }
}
