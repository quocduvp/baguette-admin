import axios from 'axios'
import {decryptedString, encryptedString} from '../encrypt.config'

export const url = 'http://tastebagdev.herokuapp.com'
const corsURL = "https://cors-anywhere.herokuapp.com/";

export const authLogin = (form) => {
  return new Promise((resolve, rejects) => {
    const fd = new FormData()
    fd.append("email", form.email)
    fd.append("password", form.password)
    Api(fd, '/auth/sign_in')
      .then(r => {
        sessionStorage.setItem('HEADERS', encryptedString(JSON.stringify(r.headers)))
        sessionStorage.setItem('auth', encryptedString(JSON.stringify(r.data)))
        return r.data
      })
      .then(data =>
        resolve(data)
      )
      .catch(err => rejects(err))
  })
}

//add category
export const createCategories = (form) => {
  return new Promise((resolve, rejects) => {
    let fd = new FormData()
    fd.append("category[name]", form.name);
    fd.append("category[category_type]", form.category_type);
    fd.append("category[restaurant_id]", Number(form.restaurant_id));
    fd.append("category[photo_attributes][photo]", form.photo);
    ApiAuth(fd, '/categories', 'POST')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const updateCategories = (id, form) => {
  return new Promise((resolve, rejects) => {
    let fd = new FormData()
    fd.append("category[name]", form.name);
    fd.append("category[category_type]", form.category_type);
    fd.append("category[restaurant_id]", Number(form.restaurant_id));
    ApiAuth(fd, `/categories/${id}`, 'PATCH')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const deleteCategories = (id) => {
  return new Promise((resolve, rejects) => {
    ApiAuth('', `/categories/${id}`, 'DELETE')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
//

//users fetch
export const fetchListUsers = () => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/users?all=true`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => rejects(err))
  })
}
export const fetchUsersDetails = (id) => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/users/${id}`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => rejects(err))
  })
}
export const createUsers = (data) => {
  return new Promise((resolve, rejects) => {
    let form = new FormData();
    form.append("user[nickname]", data.nickname);
    form.append("user[name]", data.name);
    form.append("user[phone]", data.phone);
    form.append("user[address_attributes][address]", data.address);
    form.append("user[restaurant_users_attributes][0][role]", data.role);
    form.append("user[restaurant_users_attributes][0][restaurant_id]", Number(data.restaurant_id));
    form.append("user[email]", data.email);
    form.append("user[password]", data.password);
    ApiAuth(form, '/users', 'POST')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const editUsers = ({id}, data) => {
  return new Promise((resolve, rejects) => {
    let form = new FormData();
    form.append("user[nickname]", data.nickname);
    form.append("user[name]", data.name);
    form.append("user[phone]", data.phone);
    form.append("user[address_attributes][id]", data.address_id);
    form.append("user[address_attributes][address]", data.address);
    ApiAuth(form, `/users/${id}`, 'PATCH')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}

//restaurants
export const createRestaurants = (data) => {
  return new Promise((resolve, rejects) => {
    let form = new FormData();
    const {
      facebook_url,
      instagram_url,
      youtube_url,
      address,
      name,
      phone,
      photo,
      icon
    } = data
    console.log(data)
    form.append("restaurant[name]", name);
    form.append("restaurant[facebook_url]", facebook_url);
    form.append("restaurant[youtube_url]", youtube_url);
    form.append("restaurant[instagram_url]", instagram_url);
    form.append("restaurant[restaurant_users_attributes][0][role]", "super_admin");
    form.append("restaurant[restaurant_users_attributes][0][user_id]", "1");
    form.append("restaurant[address_attributes][address]", address);
    form.append("restaurant[phone]", phone);
    form.append("restaurant[bg_photo_attributes][photo]", photo);
    form.append("restaurant[icon_attributes][photo]", icon);

    ApiAuth(form, `/restaurants`, 'POST')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const editRestaurants = ({id}, data) => {
  return new Promise((resolve, rejects) => {
    let form = new FormData();
    const {
      facebook_url,
      instagram_url,
      youtube_url,
      address_id,
      address,
      name,
      phone,
      photo_id,
      photo,
      icon_id,
      icon
    } = data
    if (data.restaurant_user) {
      const {
        restaurant_users_id,
      } = data.restaurant_user
      form.append("restaurant[name]", name);
      form.append("restaurant[facebook_url]", facebook_url);
      form.append("restaurant[youtube_url]", youtube_url);
      form.append("restaurant[instagram_url]", instagram_url);
      form.append("restaurant[restaurant_users_attributes][0][id]", restaurant_users_id);
      form.append("restaurant[restaurant_users_attributes][0][user_id]", "1");
      form.append("restaurant[restaurant_users_attributes][0][role]", "super_admin");
      form.append("restaurant[address_attributes][id]", address_id);
      form.append("restaurant[address_attributes][address]", address);
      form.append("restaurant[phone]", phone);
      form.append("restaurant[bg_photo_attributes][id]", photo_id);
      form.append("restaurant[bg_photo_attributes][photo]", photo);
      form.append("restaurant[icon_attributes][id]", icon_id);
      form.append("restaurant[icon_attributes][photo]", icon);
    } else {
      form.append("restaurant[name]", name);
      form.append("restaurant[facebook_url]", facebook_url);
      form.append("restaurant[youtube_url]", youtube_url);
      form.append("restaurant[instagram_url]", instagram_url);
      form.append("restaurant[restaurant_users_attributes][0][id]", 38);
      form.append("restaurant[restaurant_users_attributes][0][user_id]", "1");
      form.append("restaurant[restaurant_users_attributes][0][role]", "super_admin");
      form.append("restaurant[address_attributes][id]", address_id);
      form.append("restaurant[address_attributes][address]", address);
      form.append("restaurant[phone]", phone);
      form.append("restaurant[bg_photo_attributes][id]", photo_id);
      form.append("restaurant[bg_photo_attributes][photo]", photo);
      form.append("restaurant[icon_attributes][id]", icon_id);
      form.append("restaurant[icon_attributes][photo]", icon);
    }
    ApiAuth(data, `/restaurants/${id}`, 'PATCH')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const deleteRestaurant = (id) => {
  return new Promise((resolve, rejects) => {
    ApiAuth('', `/restaurants/${id}`, 'DELETE')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}

//restaurant user
export const fetchListRestaurantUsers = () => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/restaurant_users?all=true`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => rejects(err))
  })
}
export const fetchRestaurantUsersDetails = async (id) => {
  try {
    const api = await ApiAuth('', `/restaurant_users/${id}`, 'GET')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const editRestaurantUsers = async (data,{id}) => {
  try {
    const fd = new FormData()
    fd.append("restaurant_user[user_id]", data.user_id);
    fd.append("restaurant_user[restaurant_id]", data.restaurant_id);
    fd.append("restaurant_user[role]", data.role)
    const api = await ApiAuth(fd, `/restaurant_users/${id}`, 'PATCH')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const deleteRestaurantUsers = async (id) => {
  try {
    const api = await ApiAuth('', `/restaurant_users/${id}`, 'DELETE')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const createRestaurantUsers = async (data) => {
  try {
    const fd = new FormData()
    fd.append("restaurant_user[user_id]", data.user_id);
    fd.append("restaurant_user[restaurant_id]", data.restaurant_id);
    fd.append("restaurant_user[role]", data.role)
    const api = await ApiAuth(fd, `/restaurant_users`, 'POST')
    return api
  } catch (e) {
    throw new Error(e)
  }
}

//restaurant email
export const fetchListRestaurantEmails = (restaurant_name) => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/restaurant_emails?q[restaurant_name_eq]=${restaurant_name}&all=true`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => rejects(err))
  })
}
export const fetchRestaurantEmailsDetails = async (id) => {
  try {
    const api = await ApiAuth('', `/restaurant_emails/${id}`, 'GET')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const editRestaurantEmails = async (data,{id}) => {
  try {
    const fd = new FormData()
    fd.append("restaurant_email[email]", data.email);
    fd.append("restaurant_email[restaurant_id]", data.restaurant_id);
    const api = await ApiAuth(fd, `/restaurant_emails/${id}`, 'PATCH')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const deleteRestaurantEmails = async (id) => {
  try {
    const api = await ApiAuth('', `/restaurant_emails/${id}`, 'DELETE')
    return api
  } catch (e) {
    throw new Error(e)
  }
}
export const createRestaurantEmails = async (data) => {
  try {
    const fd = new FormData()
    fd.append("restaurant_email[email]", data.email);
    fd.append("restaurant_email[restaurant_id]", data.restaurant_id);
    const api = await ApiAuth(fd, `/restaurant_emails`, 'POST')
    return api
  } catch (e) {
    throw new Error(e)
  }
}


//---Foods--//
//restaurant user
export const fetchListFoods = (restaurant_id) => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/foods?q[category_restaurant_id_eq]=${restaurant_id}&all=true`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => rejects(err))
  })
}
export const fetchFoodDatails = ({id}) => {
  return new Promise((resolve, rejects) => {
    ApiAuth('', `/foods/${id}`, 'GET')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const createFoods = (data) => {
  return new Promise((resolve, rejects) => {
    const {category_id, name, description, price, photo} = data
    let form = new FormData();
    form.append("food[category_id]", category_id);
    form.append("food[name]", name);
    form.append("food[description]", description);
    form.append("food[price]", price);
    form.append("food[photo_attributes][photo]", photo);
    ApiAuth(form, '/foods', 'POST')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const editFoods = (data, {id}) => {
  return new Promise((resolve, rejects) => {
    const {category_id, name, description, price, photo_id, photo} = data
    let form = new FormData();
    form.append("food[category_id]", category_id);
    form.append("food[name]", name);
    form.append("food[description]", description);
    form.append("food[price]", price);
    form.append("food[photo_attributes][id]", photo_id);
    form.append("food[photo_attributes][photo]", photo);
    ApiAuth(form, `/foods/${id}`, 'PATCH')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}
export const deleteFoods = ({id}) => {
  return new Promise((resolve, rejects) => {
    ApiAuth('', `/foods/${id}`, 'DELETE')
      .then(r => resolve(r))
      .catch(err => rejects(err))
  })
}

//Foods option
export const fetchFoodOptions = (restaurant_id) => {
  return new Promise((resolve, reject) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/food_options?q[food_category_restaurant_id_eq]=${restaurant_id}&all=true`,
      "method": 'GET',
      "headers": Headers(),
    }
    axios(settings)
      .then(r => {
        resolve(r.data)
      })
      .catch(err => reject(err))
  })
}
export const fetchFoodOptionDetails = (id) => {
  return new Promise((resolve, reject) => {
    ApiAuth('', `/food_options/${id}`, 'GET')
      .then(r => resolve(r))
      .catch(err => reject(err))
  })
}
export const createFoodOptions = (data) => {
  return new Promise((resolve, reject) => {
    const {food_id, name, price} = data
    let form = new FormData();
    form.append("food_option[food_id]", food_id);
    form.append("food_option[name]", name);
    form.append("food_option[price]", price);
    ApiAuth(form, '/food_options', 'POST')
      .then(r => resolve(r))
      .catch(err => reject(err))
  })
}
export const editFoodOptions = (data, {id}) => {
  return new Promise((resolve, reject) => {
    const {food_id, name, price} = data
    let form = new FormData();
    form.append("food_option[food_id]", food_id);
    form.append("food_option[name]", name);
    form.append("food_option[price]", price);
    ApiAuth(form, `/food_options/${id}`, 'PATCH')
      .then(r => resolve(r))
      .catch(err => reject(err))
  })
}
export const deleteFoodOptions = (id) => {
  return new Promise((resolve, reject) => {
    ApiAuth('', `/food_options/${id}`, 'DELETE')
      .then(r => resolve(r))
      .catch(err => reject(err))
  })
}

//Orders
export const fetchOrders = (restaurant_name) => {
  return new Promise((resolve,rejects)=>{
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}/orders?q[restaurant_name_eq]=${restaurant_name}&all=true`,
      "method": "GET",
      "headers": Headers()
    }
    axios(settings)
    .then(r=>{
      resolve(r.data)
    }).catch(err=>{
      rejects(err)
    })
  })
}
export const deleteOrder = (id) => {
  return new Promise((resolve,rejects)=>{
    ApiAuth('',`/orders/${id}`,'DELETE')
    .then(r=>{
      resolve(r)
    }).catch(err=>rejects(err))
  })
}


///api
const Api = (data, path) => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": `${corsURL}${url}${path}`,
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "mimeType": "multipart/form-data",
      "data": data
    }
    axios(settings)
      .then(r => {
        resolve(r)
      })
      .catch(err => rejects(err))
  })
}
///api
const ApiAuth = (data, path, method) => {
  return new Promise((resolve, rejects) => {
    let settings = {
      "url": `${corsURL}${url}${path}`,
      "method": method,
      "headers": Headers(),
      "mimeType": "multipart/form-data",
      "data": data
    }
    axios(settings)
      .then(r => {
        resolve(r)
      })
      .catch(err => rejects(err))
  })
}

///api with authentication
const Headers = () => {
  const header = JSON.parse(decryptedString(sessionStorage.getItem('HEADERS')))
  if (header) {
    const access_token = header['access-token']
    const client = header['client']
    const expiry = header['expiry']
    const token_type = header['token-type']
    const uid = header['uid']
    return {
      "Access-Token": access_token,
      "Client": client,
      "Expiry": expiry,
      "Token-Type": token_type,
      "Uid": uid,
    }
  } else return null
}
