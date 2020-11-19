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
      <div className="UserProfile col-10 offset-1">
        <h2 class="my-3">User Profile</h2>
          <div className="user-profile-container">
            <h4 class="col-12 user-name">{user.firstName} {user.lastName}</h4>
            <div className="user-contact-info d-flex flex-row">
              <div className="user-details col-6">
              <p><strong>Contact Info:</strong></p>
                <p><strong>Phone:</strong> {user.email}</p>
                <p><strong>Email:</strong> {user.phone}</p>
              </div>
              <div className="user-address col-6">
                <p><strong>Address:</strong></p>
                <p>{user.streetAddress}</p>
                <p>{user.city}, {user.state}, {user.zipCode}</p>
              </div>
            </div>
          </div>
        <h2 className="my-3">Order History</h2>
        {buildOrderHistory}
      </div>
    );
  }
}
export default UserProfile;
