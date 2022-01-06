
import React from 'react';
import io from 'socket.io-client';
let buyerId = null;
let sellerId = null;

class OfferThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageIn: null,
      user: null,
      post: null,
      reply: '',
      socketThread: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/messages/${this.props.postId}/${this.props.senderId}`, {
      headers: {
        'X-Access-Token': token
      }
    }

    )
      .then(response => response.json())
      .then(offerThread => {
        this.setState({
          messageIn: offerThread.messages,
          user: offerThread.user,
          post: offerThread.post
        });
        buyerId = offerThread.user.userId;
        sellerId = offerThread.post.userId;
        const socket = io.connect('/', {
          transports: ['websocket'],
          reconnectionDelayMax: 1000,
          query: {
            postId: this.props.postId,
            userToken: window.localStorage.getItem('user-jwt'),
            seller: sellerId,
            buyer: buyerId
          }
        });
        socket.on('connect', () => {
          // eslint-disable-next-line no-console
          console.log('client connected');
        });

        socket.on('message', arg => {
          const copyArray = [...this.state.messageIn];
          const newMessageArray = copyArray.concat(arg);
          this.setState({ messageIn: newMessageArray });
        });
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    if (!this.state.messageIn) return null;
    const username = this.state.user.username;
    const { postId, title, price, imgUrl } = this.state.post;
    return (
      <div className='container'>
                <div className='modal-row'>
                  <div className='col-half ml-desktop mt-desktop-2rem '>
                    <h3 className='roboto-4 display-inline pdl-mobile'>{username}</h3>
                    <div className='border-bottom-2px'></div>
                    <div className='modal-row height-align-bottom'>
              <div className='column-100' >
                <div className="chat" >
                  {this.state.messageIn.map(
                    (message, index) => {
                      return (
                        <div key={index}>
                          <div className={message.userId === this.props.userId ? 'mine messages' : 'yours messages'}>
                            <div className={message.userId === this.props.userId ? 'message out' : 'message in last'}>
                              <p className='roboto-4'>{message.message}</p>
                              </div>
                            </div>
                            </div>
                      );
                    }
                  )
                      }
                  <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={el => { this.messagesEnd = el; }}>
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
