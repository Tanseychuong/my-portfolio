
const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

let blogsCache = [];

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const blogForm = document.getElementById("blogForm");
const formError = document.getElementById("formError");

const blogIdField = document.getElementById("blogId");
const titleField = document.getElementById("title");
const contentField = document.getElementById("content");
const imageField = document.getElementById("image");


function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

}


async function loadBlogs() {

    const response = await fetch(`${API_BASE}/api/blogs`);

    const blogs = await response.json();

    blogsCache = blogs;

    const table = document.getElementById("blogTable");

    table.innerHTML = "";

    blogs.forEach(blog => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                ${blog.image
                ? `<img src="${blog.image}" width="80">`
                : "—"
            }
            </td>

            <td>${blog.title}</td>

            <td>${formatDate(blog.created_at)}</td>

            <td>

                <button class="editBtn" data-id="${blog.id}">Edit</button>

                <button class="deleteBtn" data-id="${blog.id}">Delete</button>

            </td>

        `;

        table.appendChild(row);

    });

    document.querySelectorAll(".editBtn").forEach(btn => {

        btn.onclick = () => openEditModal(btn.dataset.id);

    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {

        btn.onclick = () => handleDelete(btn.dataset.id);

    });

}

loadBlogs();


function resetForm() {

    blogForm.reset();
    blogIdField.value = "";
    formError.textContent = "";

}

function openAddModal() {

    resetForm();
    modalTitle.textContent = "Add Blog";
    modalOverlay.classList.add("open");

}

function openEditModal(id) {

    const blog = blogsCache.find(b => String(b.id) === String(id));

    if (!blog) return;

    resetForm();

    modalTitle.textContent = "Edit Blog";

    blogIdField.value = blog.id;
    titleField.value = blog.title || "";
    contentField.value = blog.content || "";

    modalOverlay.classList.add("open");

}

function closeModal() {

    modalOverlay.classList.remove("open");

}

document.getElementById("addBlog").onclick = openAddModal;
document.getElementById("cancelModal").onclick = closeModal;

modalOverlay.addEventListener("click", (e) => {

    if (e.target === modalOverlay) closeModal();

});


async function handleDelete(id) {

    const confirmed = confirm("Delete this blog post? This cannot be undone.");

    if (!confirmed) return;

    try {

        const response = await fetch(`${API_BASE}/api/blogs/${id}`, {
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

        await loadBlogs();

    } catch (err) {

        console.error(err);
        alert("Cannot connect to server.");

    }

}


blogForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    formError.textContent = "";

    const id = blogIdField.value;

    const formData = new FormData();

    formData.append("title", titleField.value);
    formData.append("content", contentField.value);

    if (imageField.files[0]) {
        formData.append("image", imageField.files[0]);
    }

    const url = id
        ? `${API_BASE}/api/blogs/${id}`
        : `${API_BASE}/api/blogs`;

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

            formError.textContent = data.message || data.error || "Save failed.";
            return;

        }

        closeModal();
        await loadBlogs();

    } catch (err) {

        console.error(err);
        formError.textContent = "Cannot connect to server.";

    }

});


document.getElementById("logout").onclick = () => {

    localStorage.removeItem("token");
    location.href = "login.html";

};
