import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { registerUser } from '../login/loginActions';
import config from '../../config.json';
// google account than working with localhost:3000
// clientID="614607739990-0s5ak41hfht9f7o7p4h9m7qirab4jnht.apps.googleusercontent.com"

const initialState = {
  name: '',
  email: '',
  password: ''
}

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    error: null,
    auth: false,
    history: null,
  }

  state = {...initialState};

  resetState = () => {
    this.setState(initialState);
  }

    handleInputChange = (e) => {
    const {value, name} = e.target;

    this.setState({
      [name]: value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, name} = this.state;

    /* eslint-disable-next-line */
    if (email === '' || password === '' || name === '') return;

    this.props.registerUser({...this.state});
    this.resetState();
  }

  responseGoogle = (res) => {
    console.log(res);
  }

  responseFacebook = (res) => {
    console.log(res);
  }

  render() {
    const {error} = this.props;

    return(
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Имя </label>
            <input
              type="name"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="email">Почта </label>
            <input
              type="email"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor="password">Пароль </label>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          <div>
            <input type="submit" value="Register"/>
          </div>
          {error ? (<div>{error}</div>) : null}
        </form>
        <GoogleLogin
          clientId="614607739990-0s5ak41hfht9f7o7p4h9m7qirab4jnht.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <FacebookLogin
          appId={config.FACEBOOK_APP_ID}
          autoLoad
          fields="name,email,picture"
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      </Fragment>
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated,
})

const mDTP = {registerUser};

export default connect(mSTP, mDTP)(Register);
