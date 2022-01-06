import React from 'react';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const formData = this.state;
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resolve => resolve.json())
      .then(res => {
        window.location.hash = 'sign-in';
      })
      .catch(err => console.error(err));
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {

    return (
      <div className='container'>
        <div className='sign-in-form'>
          <div className='sign-in-row mt-15'>
            <div className='column-form text-align-center'>
              <form className='mt-8rem' onSubmit={this.handleSubmit}>
                <label htmlFor='email'></label>
                <input
                  required
                  className='mb-3rem width-100 sign-in-input'
                  type='email'
                  id='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleEmail}
                  placeholder='email'
                />
                <br></br>
                <label htmlFor='username'></label>
                <input
                  required
                  className='mb-3rem width-100 sign-in-input'
                  type='text'
                  id='username'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleUsername}
                  placeholder='username'
                />
                <br></br>
                <label htmlFor='password'></label>
                <input
                  required
                  className='width-100 mb-3rem sign-in-input'
                  type='password'
                  id='password'
                  name='username'
                  value={this.state.password}
                  onChange={this.handlePassword}
                  placeholder='password'
                />
                <button type='submit' className='mobile-width-100 raleway-500 width-100 mb-half'>Sign up</button>
                <p className='roboto-4 font-size-9'>
                  Already have an account?
                  <a href='#sign-in' className='cursor-pointer inbox-anchor border-bottom-black'>
                    &nbsp;Sign in here!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
