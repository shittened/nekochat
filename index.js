var email_exists = document.cookie.indexOf('email=')
var password_exists = document.cookie.indexOf('password=')

if (email_exists != -1 && password_exists != -1) {
    document.querySelector('#page').src = 'chat.html'
}
else {
    document.querySelector('#page').src = 'auth.html'
}
