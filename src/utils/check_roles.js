export const role = `/role/admin`

export const checkRole = () => {
    const auth = Boolean(JSON.parse(sessionStorage.getItem("isOdin")))
    if(auth){
        return auth
    }else{
        return auth
    }
}

export const GetText = (text) => {
  return text.trim().toLowerCase()
}
//list restaurant
