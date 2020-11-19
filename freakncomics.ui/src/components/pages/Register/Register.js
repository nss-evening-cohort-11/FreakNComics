import React from 'react';
import './Register.scss';

import AuthData from '../../../helpers/data/AuthData';

class Register extends React.Component {
  state = {
    User: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      Phone: '',
      StreetAddress: '',
      City: '',
      State: '',
      ZipCode: '',
      DateCreated: '',
    },
    states: 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY',
  }

  componentDidMount() {
    const temp = { ...this.state.User };
    const d = new Date();
    temp.DateCreated = d.toISOString().slice(0, 19).replace('T', ' ');
    this.setState({ User: temp });
  }

  validation = (stateVariable, id) => {
    if (stateVariable === '') {
      document.getElementById(id).classList.add('not-valid');
      document.getElementById(id).classList.remove('valid');
    } else {
      document.getElementById(id).classList.remove('not-valid');
      document.getElementById(id).classList.add('valid');
    }
  }

  clickEvent = (e) => {
    const { User } = this.state;
    e.preventDefault();
    this.validation(User.Email, 'userEmail');
    this.validation(User.Password, 'userPassword');
    this.validation(User.Phone, 'userPhone');
    this.validation(User.FirstName, 'userFirstName');
    this.validation(User.LastName, 'userLastName');
    this.validation(User.state, 'chosenState');
    this.validation(User.StreetAddress, 'inputAddress');
    this.validation(User.City, 'inputCity');
    this.validation(User.ZipCode, 'inputZip');

    if (document.getElementById('userEmail').classList.contains('valid')
     && document.getElementById('userPassword').classList.contains('valid')
     && document.getElementById('userPhone').classList.contains('valid')
     && document.getElementById('userFirstName').classList.contains('valid')
     && document.getElementById('userLastName').classList.contains('valid')
     && document.getElementById('chosenState').classList.contains('valid')
     && document.getElementById('inputAddress').classList.contains('valid')
     && document.getElementById('inputCity').classList.contains('valid')
     && document.getElementById('inputZip').classList.contains('valid')) {
      AuthData.registerUser(User)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch((err) => console.error('could not register user', err));
    } else {
      // not ready
    }
  }

  onFirstNameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.FirstName = e.target.value;
    this.setState({ User: temp });
  }

  onLastNameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.LastName = e.target.value;
    this.setState({ User: temp });
  }

  onPhoneNumberChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.Phone = e.target.value;
    this.setState({ User: temp });
  }

  onPasswordChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.Password = e.target.value;
    this.setState({ User: temp });
  }

  onAddressChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.StreetAddress = e.target.value;
    this.setState({ User: temp });
  }

  onCityChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.City = e.target.value;
    this.setState({ User: temp });
  }

  onZipcodeChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      temp.ZipCode = e.target.value;
      this.setState({ User: temp });
    }
  }

  onStateChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.State = e.target.value;
    this.setState({ User: temp });
  }

  onEmailChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.User };
    temp.Email = e.target.value;
    this.setState({ User: temp });
  }

  render() {
    const { states } = this.state;

    const makeStates = () => states.split(' ').map((abbState) => (<option key={abbState}>{abbState}</option>));

    return (
      <div className="Register p-3 d-flex flex-column justify-content-center">
        <div className="mx-auto">
          <h1>Register Page</h1>
        </div>
        <div className="form-group">
          <label htmlFor="userFirstName">First Name</label>
          <input type="text" onChange={this.onFirstNameChange} className="form-control col-6" id="userFirstName" placeholder="John"/>
        </div>
        <div className="form-group">
          <label htmlFor="userLastName">Last Name</label>
          <input type="text" onChange={this.onLastNameChange} className="form-control col-6" id="userLastName" placeholder="Doe"/>
        </div>
        <div className="form-group d-flex flex-column">
          <label className="m-1">Phone Number</label>
          <input type="text" maxLength="10" onChange={this.onPhoneNumberChange} id="userPhone" className="form-control col-6"/>
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email address</label>
          <input onChange={this.onEmailChange} type="email" className="form-control col-6" id="userEmail" placeholder="johnDoe@yahoo.com"/>
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Create Password</label>
          <input onChange={this.onPasswordChange} type="password" className="form-control col-6" id="userPassword" placeholder="Password"/>
        </div>
        <div>
          <label htmlFor="inputAddress">Address</label>
          <input type="text" onChange={this.onAddressChange} className="form-control" id="inputAddress"/>
        </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" onChange={this.onCityChange} className="form-control" id="inputCity"/>
            </div>
            <div className="form-group">
              <label htmlFor="chosenState">State</label>
              <select onChange={this.onStateChange} className="form-control col" id="chosenState">
              {makeStates()}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" maxLength="5" pattern="\d{5}" onChange={this.onZipcodeChange} className="form-control" id="inputZip"/>
            </div>
          </div>
          <div>
            <button className="btn btn-primary btn" onClick={this.clickEvent}>Submit</button>
          </div>
      </div>
    );
  }
}

export default Register;
