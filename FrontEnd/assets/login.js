const loginForm = document.querySelector('#loginForm');
const errorMessage = document.querySelector('#errorMessage');


async function fetchUserLogin(email, password) {
    try {
        const data = {
            email: email,
            password: password
        };

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations d'utilisateur :", error);
        return null;
    }
}
console.log(fetchUserLogin);

   
function login() {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const userData = await fetchUserLogin(email, password);

        if (userData && userData.token) {
            localStorage.setItem("token", userData.token);
            window.location.href = "index.html"; 
        } else {
            errorMessage.textContent = "Identifiants invalides.";
        }
    });
}
login();
console.log(localStorage);