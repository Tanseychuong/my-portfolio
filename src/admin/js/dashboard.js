const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

async function loadDashboard() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/dashboard",
                {

                    headers: {

                        Authorization:
                            token

                    }

                }
            );

        const data =
            await response.json();

        document.getElementById(
            "projectCount"
        ).textContent =
            data.projects;

        document.getElementById(
            "blogCount"
        ).textContent =
            data.blogs;

        document.getElementById(
            "messageCount"
        ).textContent =
            data.messages;

        document.getElementById(
            "visitorCount"
        ).textContent =
            data.visitors;

    }

    catch (error) {

        console.log(error);

    }

}

loadDashboard();

document
    .getElementById("logout")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href =
            "login.html";

    });