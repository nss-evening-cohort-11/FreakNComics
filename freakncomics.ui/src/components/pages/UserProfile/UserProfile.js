import React from 'react';
import './UserProfile.scss';
import UserData from '../../../helpers/data/UserData';

class UserProfile extends React.Component {
  state = {
    user: {},
  }

  getUserForProfile = () => {
    const userId = 2;
    UserData.getUserByUserId(userId)
      .then((resp) => {
        this.setState({ user: resp });
        console.error('resp', resp);
      })
      .catch((err) => console.error('could not get user', err));
    console.error('user', this.state);
  }

  componentDidMount() {
    this.getUserForProfile();
  }

  render() {
    const { user } = this.state;
    return (
      <div className="UserProfile text-center col-6 offset-3">
        <h2> User Profile </h2>
        <h4> {user.firstName} {user.lastName}  </h4>
        <p> {user.email} </p>
        <p> {user.phone} </p>
        <p> {user.StreetAddress} </p>
        <p> {user.city}, {user.state}, {user.zipCode} </p>
      </div>
    );
  }
}
export default UserProfile;
