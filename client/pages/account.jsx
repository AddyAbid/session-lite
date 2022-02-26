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
      <div className='container height-80'>
        <div className='modal-row border-bottom border-top-mobile hover-highlight mb-desktop'>
          <div className='col-50 pd-l-3rem'>
            <h3 className='roboto-4'>My Posts</h3>
          </div>
          <div className='col-50 pd-r-3rem'>
            <i className="fas fa-solid fa-chevron-right fa-2x float-right"></i>
          </div>
        </div>
          <div className='modal-row justify-content-center align-items-end height80-percent hide-desktop'>
          <a href='#sign-in' className='width-80'>
            <button className='width-100 font-1-quarter border-5 sign-out-mobile' onClick={this.handleClick}>Sign out</button>
          </a>
          </div>
      </div>
    );
  }
}
export default Account;
