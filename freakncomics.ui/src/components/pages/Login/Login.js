import React from 'react';

class Login extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();
    console.error('clicked the login button');
  }

  render() {
    return (
      <div className="Login container mt-5">
        <form className="col-4 offset-4">
        <h2 className="text-center mb-5">FREAK 'N COMICS</h2>
          <div className="form-group">
            <label htmlFor="emailInput">Email Address</label>
            <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp"/>
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" className="form-control" id="passwordInput"/>
          </div>
          <button className="btn btn-outline-dark col-12 mt-3" onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
