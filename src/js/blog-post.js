const API_BASE = "http://localhost:5000";

const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");


function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


async function loadPost() {

    const container = document.getElementById("blog-post-container");

    if (!blogId) {

        container.innerHTML = "<p>No blog post specified.</p>";
        return;

    }

    try {

        const response = await fetch(`${API_BASE}/api/blogs/${blogId}`);

        if (!response.ok) {

            container.innerHTML = "<p>Blog post not found.</p>";
            return;

        }

        const blog = await response.json();

        document.title = `${blog.title} | Chuong Tiutiu`;

        container.innerHTML = `

            ${blog.image
                ? `<img src="${API_BASE}/uploads/${blog.image}" alt="${blog.title}">`
                : ""
            }

            <span class="blog-date">${formatDate(blog.created_at)}</span>

            <h1>${blog.title}</h1>

            <div class="blog-post-body">
                ${blog.content
                    .split("\n")
                    .filter(p => p.trim())
                    .map(p => `<p>${p}</p>`)
                    .join("")
                }
            </div>

        `;

        document.getElementById("comment-blog-id").value = blog.id;

    } catch (error) {

        console.error(error);
        container.innerHTML = "<p>Unable to load this post right now.</p>";

    }

}


async function loadComments() {

    const list = document.getElementById("comment-list");

    if (!blogId) return;

    try {

        const response = await fetch(`${API_BASE}/api/comments/${blogId}`);

        const comments = await response.json();

        list.innerHTML = "";

        if (!comments.length) {

            list.innerHTML = "<p>No comments yet. Be the first!</p>";
            return;

        }

        comments.forEach(comment => {

            list.innerHTML += `

            <div class="comment-item">

                <span class="comment-name">${comment.name}</span>

                <span class="comment-date">${formatDate(comment.created_at)}</span>

                <p>${comment.comment}</p>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);
        list.innerHTML = "<p>Unable to load comments right now.</p>";

    }

}


document.addEventListener("DOMContentLoaded", () => {

    loadPost();
    loadComments();

    const form = document.getElementById("comment-form");
    const status = document.getElementById("comment-status");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        status.textContent = "";
        status.className = "form-status";

        const name = document.getElementById("comment-name").value;
        const comment = document.getElementById("comment-text").value;

        try {

            const response = await fetch(`${API_BASE}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    blog_id: blogId,
                    name,
                    comment
                })
            });

            const data = await response.json();

            if (!response.ok) {

                status.textContent = data.message || "Failed to post comment.";
                status.classList.add("error");
                return;

            }

            form.reset();
            document.getElementById("comment-blog-id").value = blogId;

            status.textContent = "Comment posted!";
            status.classList.add("success");

            await loadComments();

        } catch (error) {

            console.error(error);

            status.textContent = "Cannot connect to server.";
            status.classList.add("error");

        }

    });

});
