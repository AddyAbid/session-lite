import React from 'react';
import parseRoute from './lib/parse-route';
import MarketPlace from './pages/market';
import FormPage from './pages/create-form';
import AppDrawer from './components/drawer';
import Icons from './components/icons';
import Details from './pages/post-details';
import SignIn from './pages/sign-in';
import decodeToken from './lib/decode-token';
import Inbox from './pages/inbox';
import OfferThread from './pages/offer-thread';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {

    window.addEventListener('hashchange', () => {

      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('user-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-jwt', token);
    window.localStorage.setItem('userId', user.userId);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <SignIn signIn={this.handleSignIn}/>;
    }
    if (route.path === 'marketplace') {
      return <MarketPlace />;
    }
    if (route.path === 'form') {
      return <FormPage />;
    }
    if (route.path === 'posts') {
      const postId = route.params.get('postId');

      return <Details postId={postId} />;
    }
    if (route.path === 'sign-in') {
      return <SignIn signIn={this.handleSignIn}/>;
    }
    if (route.path === 'inbox') {
      return <Inbox />;
    }
    if (route.path === 'thread') {
      const userId = Number(window.localStorage.getItem('userId'));
      const postId = route.params.get('postId');
      const senderId = route.params.get('userId');
      return <OfferThread postId={postId} senderId={senderId} userId={userId}/>;
    }
  }

  render() {
    return (
    <>

    <AppDrawer signIn={this.handleSignIn}/>
        {this.renderPage()}
     <Icons route={this.state.route}/>

    </>
    );
  }
}
