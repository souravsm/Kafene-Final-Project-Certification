const form = document.getElementById('login');
const logout_button = document.getElementById('logout');

form.addEventListener("submit", function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username == password) {
        localStorage.setItem('login_status', 1);
        alert('Login Successful');
        logout_button.style.display = 'block';
        window.location = "orders.html";
    } else {
        alert('Please enter valid credentials!')
    }
})

function logout() {
    localStorage.setItem('login_status', 0);
    // window.location = "login.html";
    window.location.href = 'login.html'; 
}
