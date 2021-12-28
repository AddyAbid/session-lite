import React from 'react';
class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  render() {
    return (
      <div className='row hide-desktop absolute-bottom-icons margin-0 text-align-center'>
        <div className='column-fifth'>
          <i className="fas fa-store-alt fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <i className="far fa-comment fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <i className="far fa-edit fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <i className="far fa-heart fa-2x"></i>
        </div>
      </div>
    );
  }
}

export default Icons;
