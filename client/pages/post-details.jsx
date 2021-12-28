import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };

  }

  componentDidMount() {
    fetch(`/api/sessions/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
  }

  render() {
    if (!this.state.post) return null;
    const { title, description, price, imgUrl } = this.state.post;
    return (
      <div className='container'>

          <div className='row mt-3rem'>
            <div className='col-half'>
              <div className='img-upload'>
                <img
                  className='placeholder-img'

                  src={imgUrl} />

              </div>
            </div>
            <div className='col-half pd-left-2rem mt-mobile'>
              <h3>{title}</h3>
              <h5>{price}</h5>
            </div>
          </div>
          <div className='row mt-2rem'>
            <div className='col-full'>
              <h4>{description}</h4>
            </div>
            <div className='col-full'>
              <div className='submit-button text-align-right-center mt-1rem'>
                <button type='submit' className='mobile-width-100 raleway-500'>Message Artist</button>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Details;
