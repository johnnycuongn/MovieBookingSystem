export let user1 = {
  id: 1,
  name: 'Johnny'
}

export let user2 = {
  id: 2,
  name: 'Surya'
}

export let user3 = {
  id: 3,
  name: 'Ojas'
}

export let user4 = {
  id: 4,
  name: 'Noussayba'
}

export let user5 = {
  id: 5,
  name: 'Mikael'
}


let savedUsers = [user1, user2, user3, user4, user5]

const CURRENT_USER_DB_KEY = "current_user"

function login(username) {
    let user = savedUsers.filter((user) => {
      return user.name.toLowerCase() === username
    })[0]

    if (user) {
        sessionStorage.setItem(CURRENT_USER_DB_KEY, JSON.stringify(user))
        return true
    } 

   

    return false
}

function logout() {
  sessionStorage.setItem(CURRENT_USER_DB_KEY, JSON.stringify({}))
  return true
}

function getCurrentUser() {
  if (!isUserActive()) return null
  const userString = sessionStorage.getItem(CURRENT_USER_DB_KEY)
  const currentUser = JSON.parse(userString)
  return currentUser
}

function isUserActive() {
  const userString = sessionStorage.getItem(CURRENT_USER_DB_KEY)
  const currentUser = JSON.parse(userString)
  return currentUser && currentUser.name
}

export {login, logout, getCurrentUser, isUserActive}