
const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

let projectsCache = [];

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const projectForm = document.getElementById("projectForm");
const formError = document.getElementById("formError");

const projectIdField = document.getElementById("projectId");
const titleField = document.getElementById("title");
const descriptionField = document.getElementById("description");
const githubField = document.getElementById("github_url");
const liveField = document.getElementById("live_url");
const technologiesField = document.getElementById("technologies");
const featuredField = document.getElementById("featured");
const imageField = document.getElementById("image");


async function loadProjects() {

    const response =
        await fetch(
            `${API_BASE}/api/projects`
        );

    const projects =
        await response.json();

    projectsCache = projects;

    const table =
        document.getElementById(
            "projectTable"
        );

    table.innerHTML = "";

    projects.forEach(project => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                <img
                src="${project.image}"
                width="80">

            </td>

            <td>

                ${project.title}

            </td>

            <td>

                ${project.technologies || ""}

            </td>

            <td>

                ${project.featured ? "Yes" : "No"}

            </td>

            <td>

                <button class="editBtn" data-id="${project.id}">Edit</button>

                <button class="deleteBtn" data-id="${project.id}">Delete</button>

            </td>

        `;

        table.appendChild(row);

    });

    document
        .querySelectorAll(".editBtn")
        .forEach(btn => {

            btn.onclick = () =>
                openEditModal(btn.dataset.id);

        });

    document
        .querySelectorAll(".deleteBtn")
        .forEach(btn => {

            btn.onclick = () =>
                handleDelete(btn.dataset.id);

        });

}

loadProjects();


function resetForm() {

    projectForm.reset();
    projectIdField.value = "";
    formError.textContent = "";

}

function openAddModal() {

    resetForm();
    modalTitle.textContent = "Add Project";
    modalOverlay.classList.add("open");

}

function openEditModal(id) {

    const project = projectsCache.find(
        p => String(p.id) === String(id)
    );

    if (!project) return;

    resetForm();

    modalTitle.textContent = "Edit Project";

    projectIdField.value = project.id;
    titleField.value = project.title || "";
    descriptionField.value = project.description || "";
    githubField.value = project.github_url || "";
    liveField.value = project.live_url || "";
    technologiesField.value = project.technologies || "";
    featuredField.checked = !!project.featured;

    modalOverlay.classList.add("open");

}

function closeModal() {

    modalOverlay.classList.remove("open");

}

document
    .getElementById("addProject")
    .onclick = openAddModal;

document
    .getElementById("cancelModal")
    .onclick = closeModal;

modalOverlay.addEventListener("click", (e) => {

    if (e.target === modalOverlay) {
        closeModal();
    }

});


async function handleDelete(id) {

    const confirmed = confirm(
        "Delete this project? This cannot be undone."
    );

    if (!confirmed) return;

    try {

        const response = await fetch(
            `${API_BASE}/api/projects/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            }
        );

        if (!response.ok) {

            const data = await response.json();
            alert(data.message || "Delete failed.");
            return;

        }

        await loadProjects();

    } catch (err) {

        console.error(err);
        alert("Cannot connect to server.");

    }

}


projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    formError.textContent = "";

    const id = projectIdField.value;

    const formData = new FormData();

    formData.append("title", titleField.value);
    formData.append("description", descriptionField.value);
    formData.append("github_url", githubField.value);
    formData.append("live_url", liveField.value);
    formData.append("technologies", technologiesField.value);
    formData.append("featured", featuredField.checked);

    if (imageField.files[0]) {
        formData.append("image", imageField.files[0]);
    }

    const url = id
        ? `${API_BASE}/api/projects/${id}`
        : `${API_BASE}/api/projects`;

    const method = id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
            method,
            headers: {
                Authorization: token
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            formError.textContent = data.message || "Save failed.";
            return;
        }

        closeModal();
        await loadProjects();

    } catch (err) {

        console.error(err);
        formError.textContent = "Cannot connect to server.";

    }

});


document
    .getElementById("logout")
    .onclick = () => {

        localStorage.removeItem("token");

        location.href =
            "login.html";

    };

//End of the code