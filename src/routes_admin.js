import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';
import { role } from './utils/check_roles';

function Loading() {
  return <div>Loading...</div>;
}

const Charts = Loadable({
  loader: () => import('./view_admin/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./view_admin/Dashboard'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./view_admin/Users'),
  loading: Loading
})
const EditUsers = Loadable({
  loader: () => import('./view_admin/Users/EditUsers'),
  loading: Loading
})
//categories
const Categories = Loadable({
  loader : () => import('./view_admin/Categories'),
  loading: Loading
})
//create categories
const CreateCategories = Loadable({
  loader : () => import('./view_admin/Categories/CreateCategories'),
  loading: Loading
})
//edit categories
const EditCategories = Loadable({
  loader : () => import('./view_admin/Categories/EditCategories'),
  loading: Loading
})

//orders
const Orders = Loadable({
  loader : () => import('./PublicViews/Orders'),
  loading: Loading
})
const OrderDetails = Loadable({
  loader : () => import('./PublicViews/Orders/OrderDetails'),
  loading: Loading
})

//Payment
const Payments = Loadable({
  loader : () => import('./PublicViews/Payments'),
  loading: Loading
})

const CreatePayments = Loadable({
  loader : () => import('./PublicViews/Payments/CreatePayments'),
  loading: Loading
})

const EditPayments = Loadable({
  loader : () => import('./PublicViews/Payments/EditPayments'),
  loading: Loading
})

//Restaurants
const Restaurants = Loadable({
  loader : () => import('./view_admin/Restaurants'),
  loading: Loading
})

//----Restaurant users ---//
//Restaurants
const RestaurantUsers = Loadable({
  loader : () => import('./view_admin/RestaurantUsers'),
  loading: Loading
})

//----Restaurant email ---//
//Restaurants
const RestaurantEmails = Loadable({
  loader : () => import('./view_admin/RestaurantEmails'),
  loading: Loading
})
const CreateRestaurantEmails = Loadable({
  loader : () => import('./view_admin/RestaurantEmails/CreateRestaurantEmails'),
  loading: Loading
})
const EditRestaurantEmails = Loadable({
  loader : () => import('./view_admin/RestaurantEmails/EditRestaurantEmails'),
  loading: Loading
})


//----foods----///
//Foods
const Foods = Loadable({
  loader : () => import('./view_admin/Foods'),
  loading: Loading
})

const CreateFoods = Loadable({
  loader : () => import('./view_admin/Foods/CreateFoods'),
  loading: Loading
})

const EditFoods = Loadable({
  loader : () => import('./view_admin/Foods/EditFoods'),
  loading: Loading
})

//food option
const FoodOptions = Loadable({
  loader : () => import('./view_admin/Foods/FoodOptions/FoodOptions'),
  loading: Loading
})
const CreateFoodOptions = Loadable({
  loader : () => import('./view_admin/Foods/FoodOptions/CreateFoodOptions'),
  loading: Loading
})
const EditFoodOptions = Loadable({
  loader : () => import('./view_admin/Foods/FoodOptions/EditFoodOptions'),
  loading: Loading
})

///

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: `/`, exact: true, name: 'Home', component: DefaultLayout },
  { path: `/dashboard`, name: 'Dashboard', component: Dashboard },
  { path: `/payments`, exact: true, name: 'Payments', component: Payments },
  { path: `/payments/create`, exact: true, name: 'Add new card', component: CreatePayments },
  { path: `/payments/edit/:id`, exact: true, name: 'Add new card', component: EditPayments },
  { path: `/orders`, exact: true, name: 'Orders', component: Orders },
  { path: `/orders/:id`, exact: true, name: 'Order details', component: OrderDetails },
  { path: `${role}/users`, exact: true, name: 'Users', component: Users },
  { path: `${role}/users/edit/:id`, exact: true, name: 'Edit user', component: EditUsers },
  { path: `${role}/categories`, exact: true, name: 'Categories', component: Categories },
  { path: `${role}/categories/create`, exact: true, name: 'Create category', component: CreateCategories },
  { path: `${role}/categories/edit/:id`, exact: true, name: 'Create category', component: EditCategories },
  { path: `${role}/restaurants`, exact: true, name: 'Restaurants', component: Restaurants },
  { path: `${role}/restaurant_users`, exact: true, name: 'Restaurant users', component: RestaurantUsers },
  { path: `${role}/restaurant_emails`, exact: true, name: 'Restaurant emails', component: RestaurantEmails },
  { path: `${role}/restaurant_emails/create`, exact: true, name: 'Add restaurant emails', component: CreateRestaurantEmails },
  { path: `${role}/restaurant_emails/edit/:id`, exact: true, name: 'Edit restaurant emails', component: EditRestaurantEmails },
  { path: `${role}/foods`, exact: true, name: 'Foods', component: Foods },
  { path: `${role}/foods/create`, exact: true, name: 'Add new food', component: CreateFoods },
  { path: `${role}/foods/edit/:id`, exact: true, name: 'Edit food', component: EditFoods },
  { path: `${role}/foods/:food_id/options`, exact: true, name: 'Food Options', component: FoodOptions },
  { path: `${role}/foods/:food_id/options/create`, exact: true, name: 'Add food options', component: CreateFoodOptions },
  { path: `${role}/foods/:food_id/options/edit/:option_id`, exact: true, name: 'Edit food option', component: EditFoodOptions },
  { path: `${role}/charts`,name: 'Charts', component: Charts },
];

export default routes;
