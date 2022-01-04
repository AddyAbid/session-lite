
import React from 'react';
import io from 'socket.io-client';

class OfferThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIn: null,
      reply: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
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
        this.setState({ messageIn: offerThread[0] });
      });
    const socket = io('/', {
      transports: ['websocket'],
      reconnectionDelayMax: 1000,
      query: {
        postId: this.props.postId,
        userToken: window.localStorage.getItem('user-jwt'),
        recipientId: window.localStorage.getItem('userId')
      }
    });
    socket.on('connect', () => {
      // console.log('client connected');
    });
  }

  handleMessage(event) {
    this.setState({ reply: event.target.value });
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('user-jwt');
    const replyObj = {
      reply: this.state.reply,
      recipient: this.props.senderId,
      postId: this.props.postId
    };

    event.preventDefault();
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(replyObj)
    })
      .then(response => response.json())
      .then(reply => {

      })
      .catch(err => console.error(err));
    this.setState({ reply: '' });
  }

  render() {
    if (!this.state.messageIn) return null;
    const { message, imgUrl, title, username, price, postId } = this.state.messageIn;
    // console.log('this.state.messageIn:', this.state.messageIn);
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
            <div className='modal-row border-top-2px-desktop-mobile'>
              <div className='column-100'>
                <div className='text-align-center mt'>
                  <form onSubmit={this.handleSubmit}>
                    <input
                    className='message-input roboto-3 '
                    type='text'
                    required
                    autoFocus
                    name='reply'
                    id='reply'
                    onChange={this.handleMessage}
                    value={this.state.reply}
                    />
                    <button type='submit' className='send-message-button ml-2'>Send</button>
                  </form>
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
