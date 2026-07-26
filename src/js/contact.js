const API = "http://localhost:5000/api/contact";


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");

    if (!form) return;

    const status = document.getElementById("contact-status");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        status.textContent = "";
        status.className = "form-status";

        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const message = document.getElementById("contact-message").value;

        try {

            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            const data = await response.json();

            if (!response.ok) {

                status.textContent = data.error || "Failed to send message.";
                status.classList.add("error");
                return;

            }

            status.textContent = "Message sent! I'll get back to you soon.";
            status.classList.add("success");

            form.reset();

        } catch (error) {

            console.error(error);

            status.textContent = "Cannot connect to server.";
            status.classList.add("error");

        }

    });

});
