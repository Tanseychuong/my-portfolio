const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            document.getElementById("error").textContent =
                data.message || "Login failed";
            return;
        }

        localStorage.setItem("token", data.token);

        window.location.href = "dashboard.html";

    } catch (err) {

        document.getElementById("error").textContent =
            "Cannot connect to server.";

        console.error(err);
    }

});

//End of the login code