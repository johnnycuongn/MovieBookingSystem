export let user1 = {
  username: 'johnny',
}

let savedUsers = [user1]

const CURRENT_USER_DB_KEY = "current_user"

function login(username) {
    let user = savedUsers.filter((user) => {
      return user.username === username
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
  return currentUser && currentUser.username
}

export {login, logout, getCurrentUser, isUserActive}