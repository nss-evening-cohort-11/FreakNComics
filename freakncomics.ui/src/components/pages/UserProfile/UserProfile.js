import React from 'react';
import './UserProfile.scss';
import UserData from '../../../helpers/data/UserData';
import Orders from '../../shared/Orders/Orders';

class UserProfile extends React.Component {
  state = {
    user: {},
    orderHistory: [],
  }

  getUserForProfile = () => {
    const userId = 3;
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user', err));
  }

  getUserOrderHistory = () => {
    const userId = 3;
    UserData.getCompletedOrdersByUserId(userId)
      .then((resp) => this.setState({ orderHistory: resp }))
      .catch((err) => console.error('could not get completed orders for user', err));
  }

  componentDidMount() {
    this.getUserForProfile();
    this.getUserOrderHistory();
  }

  render() {
    const { user, orderHistory } = this.state;

    const buildOrderHistory = orderHistory.map((order, index) => <Orders key={index} order={order} user={user}/>);

    return (
      <div className="UserProfile text-center col-6 offset-3">
        <div className="user-profile-container">
          <h2> User Profile </h2>
          <h4> {user.firstName} {user.lastName}  </h4>
          <p> {user.email} </p>
          <p> {user.phone} </p>
          <p> {user.streetAddress} </p>
          <p> {user.city}, {user.state}, {user.zipCode} </p>
        </div>
        <h2 className="my-3">Order History</h2>
        {buildOrderHistory}
      </div>
    );
  }
}
export default UserProfile;
