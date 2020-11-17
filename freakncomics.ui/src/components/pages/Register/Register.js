import React from 'react';
import './Register.scss';

class Register extends React.Component {
  state = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    StreetAddress: '',
    City: '',
    State: '',
    ZipCode: 0,
    states: 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY',
  }

  clickEvent = (e) => {
    e.preventDefault();
    if (this.state.Email === '') {
      document.getElementById('userEmail').classList.add('not-valid');
    } else {
      document.getElementById('userEmail').classList.remove('not-valid');
    }
  }

  onStateChange = (e) => {
    e.preventDefault();
    this.setState({ State: e.currentTarget.value });
  }

  onEmailChange = (e) => {
    e.preventDefault();
    this.setState({ Email: e.currentTarget.value });
  }

  render() {
    const { states } = this.state;

    const makeStates = () => states.split(' ').map((abbState) => (<option key={abbState}>{abbState}</option>));

    return (
      <div className="Register">
        <h1>Register Page</h1>
        <div class="form-group">
          <label htmlFor="userFirstName">First Name</label>
          <input type="text" className="form-control col-6" id="userFirstName" placeholder="John"/>
        </div>
        <div class="form-group">
          <label htmlFor="userLastName">Last Name</label>
          <input type="text" className="form-control col-6" id="userLastName" placeholder="Doe"/>
        </div>
        <div class="form-group">
          <label htmlFor="userEmail">Email address</label>
          <input onChange={this.onEmailChange} type="email" className="form-control col-6" id="userEmail" placeholder="johnDoe@yahoo.com" required/>
        </div>
        <div className="form-group">
          <label htmlFor="chosenState">Select your State</label>
          <select onChange={this.onStateChange} className="form-control col-3" id="chosenState">
          {makeStates()}
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.clickEvent}>Submit</button>
      </div>
    );
  }
}

export default Register;
