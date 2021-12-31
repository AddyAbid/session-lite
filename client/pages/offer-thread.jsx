import React from 'react';

class OfferThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/messages/${this.props.postId}/${this.props.senderId}`, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(offerThread => {
        this.setState({ message: offerThread[0] });
      });
  }

  render() {
    if (!this.state.message) return null;
    // const { message, imgUrl, title, username } = this.state.message;
    return (
      <div className='container'>
        <div className='modal-row'>
          <div className='col-half'>
            <h3 className='roboto-4'>tomm</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferThread;
