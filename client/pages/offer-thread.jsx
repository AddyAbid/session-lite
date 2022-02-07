
import React from 'react';
import io from 'socket.io-client';

class OfferThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIn: null,
      user: null,
      post: null,
      reply: '',
      userId: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.chatDivRef = React.createRef();
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
        this.setState({
          messageIn: offerThread.messages,
          user: offerThread.user,
          post: offerThread.post,
          userId: offerThread.user.userId
        });
        const buyerId = offerThread.user.userId;
        const sellerId = offerThread.post.userId;
        this.socket = io.connect('/', {
          transports: ['websocket'],
          reconnectionDelayMax: 1000,
          query: {
            postId: this.props.postId,
            userToken: window.localStorage.getItem('user-jwt'),
            seller: sellerId,
            buyer: buyerId
          }
        });
        this.socket.on('message', arg => {
          const copyArray = [...this.state.messageIn];
          const newMessageArray = copyArray.concat(arg);
          this.setState({ messageIn: newMessageArray });
        });
      })
      .catch(err => console.error(err));
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

  componentDidUpdate(prevProps, prevState) {
    if (this.chatDivRef.current && this.state.messageIn !== prevState.messageIn) {
      this.chatDivRef.current.scrollTop = this.chatDivRef.current.scrollHeight;
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    if (!this.state.messageIn) return null;
    const username = this.state.user.username;
    const { postId, title, price, imgUrl } = this.state.post;
    return (
      <div className='container'>
        <div className='modal-row'>
          <div className='col-half ml-desktop pt-desktop-2rem offer-thread'>
            <h3 className='roboto-4 offer-thread-heading pdl-mobile border-bottom-2px'>{username}</h3>
              <div className="chat" ref={this.chatDivRef}>
                {this.state.messageIn.map(
                  (message, index) => {
                    return (
                      <div key={index}>
                        <div className={message.userId !== this.state.userId ? 'mine messages' : 'yours messages'}>
                          <div className={message.userId !== this.state.userId ? 'message out' : 'message in last'}>
                            <p className='roboto-4'>{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
            </div>
            <form className="chat-box text-align-center pt-desktop-1rem border-top-2px-desktop-mobile" onSubmit={this.handleSubmit}>
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
