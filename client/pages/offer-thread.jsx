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
    const { message, imgUrl, title, username, price, postId } = this.state.message;
    return (
      <div className='container'>
        <div className='modal-row'>
          <div className='col-half ml-desktop mt-desktop-2rem '>
            <h3 className='roboto-4 display-inline pdl-mobile'>{username}</h3>
            <div className='border-bottom-2px'></div>
            <div className='modal-row height-align-bottom'>
              <div className='column-100'>
                  <div className="chat">
                    <div className="yours messages">
                      <div className="message in last">
                        <p className='roboto-4'>{message}</p>
                      </div>
                    </div>
                    <div className="mine messages">
                      <div className="message out">
                        <p className='roboto-4'>No, thanks that&apos;s a little to much</p>
                      </div>
                      <div className="message out last">
                        <p className='roboto-4'>Maybe another time home boy</p>
                      </div>
                    </div>
                    <div className="yours messages">
                      <div className="message in last">
                        <p className='roboto-4'>messed up dude</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='modal-row border-top-2px'>
              <div className='column-100'>
                <div className='text-align-end mt'>
                  <input className='message-input roboto-3 '></input>
                <button className='send-message-button ml-2'>Send</button>
                </div>
              </div>
            </div>
          </div>

          <div className='col-half text-align-center mt-3 hide-mobile'>
            <img src={imgUrl} className='object-fit-inbox'></img>
            <div className='border-top-2px margin-auto mt-1rem'>
              <h3 className='roboto-7 text-align-left'>{title}</h3>
              <h4 className='raleway-300 text-align-left'>${price}/hour</h4>
              <a href={`#posts?postId=${postId}`}>
                <button className='mobile-width-100 raleway-500-white pd-btn'>View Post</button>
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferThread;
