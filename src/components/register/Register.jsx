import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../login/loginActions';

const initialState = {
  name: '',
  email: '',
  password: ''
}

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    auth: PropTypes.bool,
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

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

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

  render() {
    const {error} = this.props;

    return(
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
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated,
})

const mDTP = {registerUser};

export default connect(mSTP, mDTP)(Register);
