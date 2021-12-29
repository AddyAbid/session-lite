import React from 'react';

class ShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offerAmount: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event) {
    this.props.close();
  }

  handleChange(event) {
    this.setState({ offerAmount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const offerObj = {};
    offerObj.offerAmount = this.state.offerAmount;
    fetch('/api/sessions/2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerObj)
      })
      .then(response => response.json())
      .then(res => {
      })
      .catch(err => console.error(err));
    this.props.close();
  }

  render() {

    return (
    <form onSubmit={this.handleSubmit}>
      <div className="modal">
        <div className='modal-row'>
          <div className='col-full'>
            <div className='text-box'>
              <div className='modal-row mt-2rem-modal'>
                <div className='col-full text-align-center'>
                  <label className='roboto-5 text-align-center'>Please enter an offer amount: </label>
                  <input
                    type='text'
                    className='modal-input'
                    placeholder='$'
                    required
                    id='offer'
                    name='offer'
                    value={this.state.offerAmount}
                    onChange={this.handleChange}
                    />
                </div>
              </div>
              <div className='modal-row mt-2rem-modal'>
                <div className='col-50 ta-r pd-r-3rem'>
                  <button type='button' onClick={this.handleClick} className='cancel-button'>Cancel</button>
                </div>
                <div className='col-50 ta-l pd-l-3rem'>
                  <button type='submit' className='submit-offer-button'>Send Offer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    );
  }
}

export default ShowModal;
