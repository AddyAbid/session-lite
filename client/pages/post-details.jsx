import React from 'react';
import ShowModal from '../components/offer-modal';
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      modal: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/sessions/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
  }

  handleClick(event) {
    this.setState({ modal: !this.state.modal });
  }

  render() {

    if (!this.state.post) return null;
    const { title, description, price, imgUrl } = this.state.post;
    return (

      <div className='container'>
        {this.state.modal && <ShowModal/>}
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

                    <div className='submit-button text-align-center mt-1rem hide-mobile'>
                     <button onClick={this.handleClick} className='mobile-width-100 raleway-500 pd-btn'>Send Offer</button>
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
                <a href='#send-offer'> <button className='mobile-width-100 raleway-500 pd-btn'>Send Offer</button> </a>
                </div>

            </div>
          </div>
        </div>

    );
  }
}

export default Details;
