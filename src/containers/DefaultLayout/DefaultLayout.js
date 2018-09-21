import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import {nav_admin,nav_super_admin} from '../../_nav';
// routes config
import route_super from '../../routes';
import route_admin from '../../routes_admin';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import PrivateRoute from '../PrivateRoute';
import  {connect} from 'react-redux'
import {checkRole} from "../../utils/check_roles";
class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={checkRole() ? nav_super_admin : nav_admin} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={checkRole() ? route_super : route_admin}/>
            <Container fluid>
              {/* Check roles admin or super admin */}
              {checkRole() ?
              <Switch>
                {route_super.map((route, idx) => {
                    return route.component ? (<PrivateRoute key={idx} path={route.path} exact={route.exact} name={route.name} Component={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/notifications" />
              </Switch> : 
              <Switch>
                {route_admin.map((route, idx) => {
                    return route.component ? (<PrivateRoute key={idx} path={route.path} exact={route.exact} name={route.name} Component={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/notifications" />
              </Switch>
              }
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roles : state.roles
  }
}
export default connect(mapStateToProps)(DefaultLayout);
