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
               </div>
              </div>
              <div className='row-details'>
                <div className='col-full'>
                <div className='border-top'></div>
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

            </div>
          </div>

      </div>
    );
  }
}

export default Details;
