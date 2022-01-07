import React from 'react';
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.signOut();
  }

  render() {
    return (
      <div className='height-100'>
        <div className='modal-row justify-content-center align-items-start height100-percent'>
         <a href='#sign-in' className='width-80'>
           <button className='width-100 font-1-quarter border-5 sign-out-mobile' onClick={this.handleClick}>Sign out</button>
         </a>
        </div>
      </div>
    );
  }
}
export default Account;
