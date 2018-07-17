import React from 'react';
import { Route } from 'react-router-dom';
import ManageBrands from './ManageBrands';
import ManageCategories from './ManageCategories';
import ManageOrders from './ManageOrders';
import ManageProducts from './ManageProducts';
import ManageShoppingCompanies from './ManageShoppingCompanies';
import ManageShops from './ManageShops';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../constants/USER_ROLES';

class Shopping extends React.Component {

  state = {};

  componentWillMount() {
    this.getUserRole();
  }

  async getUserRole() {
    let user = await Auth.currentAuthenticatedUser();
    let userAttributes = await Auth.userAttributes(user);
    let userRole = null;
    userAttributes.map(attr => {
        if (attr.Name === 'custom:role') {
          userRole = attr.Value;
        }
    });

    const currentState = this.state;
    currentState.userRole = userRole || 'SUPERADMIN';
    this.setState(currentState);
  }

  render() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.shopping_team && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const match = this.props.match;
    return (
      <div className="content">
        <Route exact path="/" component={ManageOrders} />
        <Route path={`${match.url}/manage-brands`} component={ManageBrands} />
        <Route path={`${match.url}/manage-categories`} component={ManageCategories} />
        <Route path={`${match.url}/manage-orders`} component={ManageOrders} />
        <Route path={`${match.url}/manage-products`} component={ManageProducts} />
        <Route path={`${match.url}/manage-shops`} component={ManageShops} />
        <Route path={`${match.url}/manage-shopping-companies`} component={ManageShoppingCompanies} />
      </div>
    );
  }
}

export default Shopping;