import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      incorrectPassword: false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
  }

  handleSubmit(event) {
    const formData = this.state;
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resolve => resolve.json())
      .then(res => {
        const token = res.token;
        if (token) {
          window.location.hash = 'marketplace';
          this.props.signIn(res);

        } else {
          window.location.hash = 'sign-in';
          this.setState({ incorrectPassword: true });
        }
      })
      .catch(err => console.error(err));
  }

  handleDemoSubmit(event) {
    const formData = {
      username: 'admin',
      password: 'admin1'
    };
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

      .then(resolve => resolve.json())
      .then(res => {
        const token = res.token;
        if (token) {
          window.location.hash = 'marketplace';
          this.props.signIn(res);

        } else {
          window.location.hash = 'sign-in';
          this.setState({ incorrectPassword: true });
        }
      })
      .catch(err => console.error(err));
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {

    return (
      <div className='container'>
        <div className='sign-in-form'>
          <div className='sign-in-row mt-15'>
            <div className='column-form text-align-center'>
              <form className='mt-8rem' onSubmit={this.handleSubmit}>
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
                  className='width-100 mb-2rem sign-in-input'
                  type='password'
                  id='password'
                  name='username'
                  value={this.state.password}
                  onChange={this.handlePassword}
                  placeholder='password'
                />
                <p className='margin-0 roboto-4'>{this.state.incorrectPassword ? 'incorrect username or password' : ''}</p>
                <button type='submit' className='mobile-width-100 raleway-500 width-100 mb-half mb-2rem'>Sign in</button>
              </form>
              <form onSubmit={this.handleDemoSubmit}>
                <button type='submit' className='mobile-width-100 raleway-500-white width-100 pd-btn-98 mb-2rem'>Demo</button>

              </form>
              <p className='roboto-4 font-size-9'>
                Don&apos;t have an account yet?
                <a href='#sign-up' className='cursor-pointer inbox-anchor border-bottom-black'>
                  &nbsp;Sign up here!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
