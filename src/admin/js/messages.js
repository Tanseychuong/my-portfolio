const API_BASE = "http://localhost:5000";

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}


function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}


async function loadMessages() {

    const table = document.getElementById("messageTable");

    try {

        const response = await fetch(`${API_BASE}/api/contact`, {
            headers: {
                Authorization: token
            }
        });

        if (!response.ok) {

            table.innerHTML = `<tr><td colspan="5">Unable to load messages.</td></tr>`;
            return;

        }

        const messages = await response.json();

        table.innerHTML = "";

        if (!messages.length) {

            table.innerHTML = `<tr><td colspan="5">No messages yet.</td></tr>`;
            return;

        }

        messages.forEach(msg => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${msg.name}</td>

                <td>${msg.email}</td>

                <td style="text-align:left; max-width:320px;">${msg.message}</td>

                <td>${formatDate(msg.created_at)}</td>

                <td>

                    <button class="deleteBtn" data-id="${msg.id}">Delete</button>

                </td>

            `;

            table.appendChild(row);

        });

        document.querySelectorAll(".deleteBtn").forEach(btn => {

            btn.onclick = () => handleDelete(btn.dataset.id);

        });

    } catch (error) {

        console.error(error);
        table.innerHTML = `<tr><td colspan="5">Cannot connect to server.</td></tr>`;

    }

}

loadMessages();


async function handleDelete(id) {

    const confirmed = confirm("Delete this message?");

    if (!confirmed) return;

    try {

        const response = await fetch(`${API_BASE}/api/contact/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token
            }
        });

        if (!response.ok) {

            const data = await response.json();
            alert(data.message || "Delete failed.");
            return;

        }

        await loadMessages();

    } catch (err) {

        console.error(err);
        alert("Cannot connect to server.");

    }

}


document.getElementById("logout").onclick = () => {

    localStorage.removeItem("token");
    location.href = "login.html";

};


//End of the code
