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
import SignUp from './pages/sign-up';
import Account from './pages/account';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('user-jwt');
    this.setState({ user: null });
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
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'inbox') {
      return <Inbox />;
    }
    if (route.path === 'account') {
      return (
          <Account signOut={this.handleSignOut} user={this.state.user} />
      );
    }
    if (route.path === 'thread') {
      const postId = route.params.get('postId');
      const senderId = route.params.get('userId');
      return <OfferThread postId={postId} senderId={senderId} />;
    }
  }

  render() {
    if (!navigator.onLine) {
      return (
        <h1 className='modal-row justify-content-center margin-top-15 roboto-medium'>Uh oh, something went wrong</h1>
      );
    }
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
            <AppDrawer signOut={this.handleSignOut} signIn={this.handleSignIn} isAuthorizing={this.state.isAuthorizing} user={this.state.user} />
            {this.renderPage()}
            {
              user &&
            <Icons route={this.state.route} />
          }
          </>
    </AppContext.Provider>
    );
  }
}
App.contextType = AppContext;
