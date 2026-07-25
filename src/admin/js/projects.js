const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

async function loadProjects() {

    const response =
        await fetch(
            "http://localhost:5000/api/projects"
        );

    const projects =
        await response.json();

    const table =
        document.getElementById(
            "projectTable"
        );

    table.innerHTML = "";

    projects.forEach(project => {

        table.innerHTML += `

        <tr>

            <td>

                <img
                src="http://localhost:5000/uploads/${project.image}"
                width="80">

            </td>

            <td>

                ${project.title}

            </td>

            <td>

                ${project.tech}

            </td>

            <td>

                ${project.featured ? "Yes" : "No"}

            </td>

            <td>

                <button>Edit</button>

                <button>Delete</button>

            </td>

        </tr>

        `;

    });

}

loadProjects();

document
    .getElementById("logout")
    .onclick = () => {

        localStorage.removeItem("token");

        location.href =
            "login.html";

    };