var email_exists = document.cookie.indexOf('email=')
var password_exists = document.cookie.indexOf('password=')

alert('if any1 uses firefox, is broken af in firefox u cant even get to auhentification page, dont use firefox w this for now')

if (email_exists != -1 && password_exists != -1) {
    document.querySelector('#page').src = 'chat.html'
}
else {
    document.querySelector('#page').src = 'auth.html'
}
