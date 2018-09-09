import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users'),
  loading: Loading
})

//create user
const CreateUser = Loadable({
  loader: () => import('./views/Users/CreateUser'),
  loading: Loading
})
const EditUsers = Loadable({
  loader: () => import('./views/Users/EditUsers'),
  loading: Loading
})
//categories
const Categories = Loadable({
  loader : () => import('./views/Categories'),
  loading: Loading
})
//create categories
const CreateCategories = Loadable({
  loader : () => import('./views/Categories/CreateCategories'),
  loading: Loading
})
//edit categories
const EditCategories = Loadable({
  loader : () => import('./views/Categories/EditCategories'),
  loading: Loading
})

//Restaurants
const Restaurants = Loadable({
  loader : () => import('./views/Restaurants'),
  loading: Loading
})
const CreateRestaurants = Loadable({
  loader : () => import('./views/Restaurants/CreateRestaurants'),
  loading: Loading
})
const EditRestaurants = Loadable({
  loader : () => import('./views/Restaurants/EditRestaurants'),
  loading: Loading
})

//----Restaurant users ---//
//Restaurants
const RestaurantUsers = Loadable({
  loader : () => import('./views/RestaurantUsers'),
  loading: Loading
})
const CreateRestaurantUsers = Loadable({
  loader : () => import('./views/RestaurantUsers/CreateRestauranUsers'),
  loading: Loading
})
const EditRestaurantUsers = Loadable({
  loader : () => import('./views/RestaurantUsers/EditRestaurantUsers'),
  loading: Loading
})

//----Restaurant email ---//
//Restaurants
const RestaurantEmails = Loadable({
  loader : () => import('./views/RestaurantEmails'),
  loading: Loading
})
const CreateRestaurantEmails = Loadable({
  loader : () => import('./views/RestaurantEmails/CreateRestaurantEmails'),
  loading: Loading
})
const EditRestaurantEmails = Loadable({
  loader : () => import('./views/RestaurantEmails/EditRestaurantEmails'),
  loading: Loading
})


//----foods----///
//Foods
const Foods = Loadable({
  loader : () => import('./views/Foods'),
  loading: Loading
})

const CreateFoods = Loadable({
  loader : () => import('./views/Foods/CreateFoods'),
  loading: Loading
})

const EditFoods = Loadable({
  loader : () => import('./views/Foods/EditFoods'),
  loading: Loading
})

//food option
const FoodOptions = Loadable({
  loader : () => import('./views/Foods/FoodOptions/FoodOptions'),
  loading: Loading
})
const CreateFoodOptions = Loadable({
  loader : () => import('./views/Foods/FoodOptions/CreateFoodOptions'),
  loading: Loading
})
const EditFoodOptions = Loadable({
  loader : () => import('./views/Foods/FoodOptions/EditFoodOptions'),
  loading: Loading
})

///

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: `/`, exact: true, name: 'Home', component: DefaultLayout },
  { path: `/dashboard`, name: 'Dashboard', component: Dashboard },
  { path: `/users`, exact: true, name: 'Users', component: Users },
  { path: `/users/create`, exact: true, name: 'Create user', component: CreateUser },
  { path: `/users/edit/:id`, exact: true, name: 'Edit user', component: EditUsers },
  { path: `/users/create`, exact: true, name: 'Create users', component: CreateUser },
  { path: `/categories`, exact: true, name: 'Categories', component: Categories },
  { path: `/categories/create`, exact: true, name: 'Create category', component: CreateCategories },
  { path: `/categories/edit/:id`, exact: true, name: 'Create category', component: EditCategories },
  { path: `/restaurants`, exact: true, name: 'Restaurants', component: Restaurants },
  { path: `/restaurants/create`, exact: true, name: 'Add new Restaurants', component: CreateRestaurants },
  { path: `/restaurants/edit/:id`, exact: true, name: 'Edit Restaurants', component: EditRestaurants },
  { path: `/restaurant_users`, exact: true, name: 'Restaurant users', component: RestaurantUsers },
  { path: `/restaurant_users/create`, exact: true, name: 'Add restaurant users', component: CreateRestaurantUsers },
  { path: `/restaurant_users/edit/:id`, exact: true, name: 'Edit restaurant users', component: EditRestaurantUsers },
  { path: `/restaurant_emails`, exact: true, name: 'Restaurant emails', component: RestaurantEmails },
  { path: `/restaurant_emails/create`, exact: true, name: 'Add restaurant emails', component: CreateRestaurantEmails },
  { path: `/restaurant_emails/edit/:id`, exact: true, name: 'Edit restaurant emails', component: EditRestaurantEmails },
  { path: `/foods`, exact: true, name: 'Foods', component: Foods },
  { path: `/foods/create`, exact: true, name: 'Add new food', component: CreateFoods },
  { path: `/foods/edit/:id`, exact: true, name: 'Edit food', component: EditFoods },
  { path: `/foods/:food_id/options`, exact: true, name: 'Food Options', component: FoodOptions },
  { path: `/foods/:food_id/options/create`, exact: true, name: 'Add food options', component: CreateFoodOptions },
  { path: `/foods/:food_id/options/edit/:option_id`, exact: true, name: 'Edit food option', component: EditFoodOptions },
  { path: `/charts`,name: 'Charts', component: Charts },
];

export default routes;
