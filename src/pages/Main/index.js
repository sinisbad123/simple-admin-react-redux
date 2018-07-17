import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import SideBar from '../../components/SideBar';
/**
 * Pages
 */
import Shopping from '../Shopping';
import Billing from '../Billing';
import Company from '../Company';
import Employee from '../Employee';
import Reports from '../Reports';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsWeb from './aws-exports';
Amplify.configure(awsWeb);


const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar />

        <div className="main-panel">
          <Route exact path="/" component={Shopping} />
          <Route path="/employee" component={Employee} />
          <Route path="/company" component={Company} />
          <Route path="/shopping" component={Shopping} />
          <Route path="/billing" component={Billing} />
          <Route path="/reports" component={Reports} />
          <Footer />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withAuthenticator(withRouter(connect(mapStateToProp, mapDispatchToProps)(Main)));