import React from 'react';
import ShowModal from '../components/offer-modal';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      modal: false,
      postId: null,
      isSaved: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/sessions/${this.props.postId}`, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())

      .then(post => {
        this.setState({ post: post, postId: this.props.postId });
        if (this.state.post.isSaved) {
          this.setState({ isSaved: true });
        }
      })
      .catch(err => console.error(err));

  }

  closeModal(event) {
    this.setState({ modal: !this.state.modal });
  }

  toggleSave(event) {
    const token = window.localStorage.getItem('user-jwt');
    const postObj = {
      postId: this.state.postId
    };
    if (!this.state.isSaved) {
      this.setState({
        isSaved: true
      });
      fetch('/api/saved', {
        method: 'PUT',
        body: JSON.stringify(postObj),
        headers: {
          'X-Access-Token': token,
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .catch(err => console.error(err));
    } else {
      this.setState({
        isSaved: false
      });
      fetch('/api/saved/remove', {
        method: 'DELETE',
        body: JSON.stringify(postObj),
        headers: {
          'X-Access-Token': token,
          'Content-Type': 'application/json'
        }
      });
    }
  }

  render() {
    if (!this.state.post) return null;
    const { title, description, price, imgUrl, userId } = this.state.post;
    return (
      <div className='container'>
        {this.state.modal && <ShowModal close={this.closeModal} post={this.state.post} postId={this.state.postId}/>}
          <div className='row mt-3rem'>
            <div className='col-half'>
              <div className='img-upload'>
                <img
                  className='object-fit'
                  src={imgUrl} />
              </div>
            </div>

            <div className='col-half pd-left-2rem mt-mobile'>
              <div className='row-details'>
                <div className='col-full'>
                  <div className='border-top'></div>
                  <h3 className='raleway-800'>{title}</h3>
                  <h4 className='raleway-300'>${price}/hour</h4>
                {
                  !this.state.isSaved &&
                  <div className='modal-row align-items-center roboto-4-save'>
                      <i className="far fa-heart ml-0" onClick={this.toggleSave}></i>
                  <p>Save</p>
                  </div>
                }
                {
                  this.state.isSaved &&
                  <div className='modal-row align-items-center roboto-4-save '>
                      <i className="fas fa-heart heart-red ml-0" onClick={this.toggleSave}></i>
                  <p>Saved</p>
                  </div>
                }

               </div>
              </div>
              <div className='row-details'>
                <div className='col-full'>
                  <div className='border-top'></div>

                    <div className='submit-button text-align-center mt-1rem hide-mobile'>
                     <a href={`#thread?postId=${this.state.postId}&userId=${userId}`}><button className='mobile-width-100 raleway-500-white pd-btn-98 mb-2rem'>Message Artist</button></a>
                     <button onClick={this.closeModal} className='mobile-width-100 raleway-500 pd-btn'>Send Offer</button>
                    </div>

                </div>
              </div>
            </div>
          <div className='border-top'></div>
          </div>
          <div className='row mt-2rem'>
            <div className='col-full'>
              <div className='border-top hide-mobile'></div>
                <div>
                  <h3 className='raleway-800'>Description</h3>
                </div>
                <h4 className='raleway-400-sm'>{description}</h4>
              </div>
            <div className='col-full'>

                <div className='submit-button text-align-center mt-1rem hide-desktop'>
              <a href={`#thread?postId=${this.state.postId}&userId=${userId}`}> <button className='mobile-width-100 raleway-500-white pd-btn-98 mb-2rem'>Message Artist</button></a>
              <button onClick={this.closeModal} className='mobile-width-100 raleway-500 pd-btn'>Send Offer</button>
                </div>

            </div>
          </div>
        </div>
    );
  }
}

export default Details;
