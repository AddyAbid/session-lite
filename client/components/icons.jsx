import React from 'react';
class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIcon: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ currentIcon: Number(event.target.id) });
  }

  render() {
    return (
      <div className='row hide-desktop absolute-bottom-icons margin-0 text-align-center'>
        <div className='column-fifth'>
          <a href='#marketplace'>
            <i onClick={this.handleClick} className={this.state.currentIcon === 1 ? 'fas fa-store-alt fa-2x orange' : 'fas fa-store-alt fa-2x '} id='1'></i>
          </a>
        </div>
        <div className='column-fifth'>
          <i className="far fa-comment fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <a href='#form'>
            <i onClick={this.handleClick} className={this.state.currentIcon === 3 ? 'far fa-edit fa-2x orange' : 'far fa-edit fa-2x '} id='3'></i>
          </a>
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
