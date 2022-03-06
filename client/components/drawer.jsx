import React from 'react';
import AppContext from '../lib/app-context';
class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.handleClickDrawer = this.handleClickDrawer.bind(this);
  }

  handleClickDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {
    const { user, handleSignOut } = this.context;
    return (
     <div className='modal-row align-items-center shadow-border mt-1rem-header nav-modal nav-bar'>
       <div className='column-15 text-align-center'>
          <div className='hide-mobile '>
            {
              user !== null &&
              <i className="fas fa-bars fa-2x hamburger-menu-orange" onClick={this.handleClickDrawer} id={this.state.drawerOpen ? '' : 'open'}></i>
            }
         </div>
        </div>
         <div className='column-70 text-align-center '>
          <h1 className=' raleway-400-header'>sessionLite</h1>
        </div>
        <div className='column-15 text-align-center'>
        {user !== null &&
           <a href='#sign-in'><button className='sign-in-button hide-mobile' onClick={handleSignOut}>Sign out</button></a>
        }
        { user === null &&
           <a href='#sign-in'><button className='sign-in-button hide-mobile'>Sign in</button></a>
        }
        </div>
        <div className={this.state.drawerOpen ? 'row margin-0 nav-open' : 'hidden'}>
          <div className="column-25">
            <h1 className='raleway-500-menu'>Menu</h1>
            <a href='#marketplace' className="block mb raleway-size" onClick={this.handleClickDrawer}>Marketplace</a>
            <a href='#form' className="block mb raleway-size" onClick={this.handleClickDrawer}>Post a Session</a>
            <a href='#inbox' className="block mb raleway-size" onClick={this.handleClickDrawer}>Inbox</a>
            <a href='#saved' className="block mb raleway-size" onClick={this.handleClickDrawer}>Saved</a>
            <a href='#account' className="block mb raleway-size" onClick={this.handleClickDrawer}>My Account</a>
          </div>
          <div className="column-75 overlay" onClick={this.handleClickDrawer}>
          </div>
        </div>
       </div>
    );
  }
}

export default AppDrawer;
AppDrawer.contextType = AppContext;
