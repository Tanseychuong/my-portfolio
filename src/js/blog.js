const API = `${API_BASE}/api/blogs`;


function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


function excerpt(text, length = 140) {

    if (!text) return "";

    return text.length > length
        ? text.slice(0, length).trim() + "…"
        : text;

}


async function loadBlogs() {

    const container = document.getElementById("blog-container");

    if (!container) return;

    try {

        const response = await fetch(API);

        const blogs = await response.json();

        container.innerHTML = "";

        if (!blogs.length) {

            container.innerHTML = `
                <p class="blog-empty">
                    No blog posts yet. Check back soon.
                </p>
            `;

            return;

        }

        const limit = container.dataset.limit === "all" ? blogs.length : 3;

        blogs.slice(0, limit).forEach((blog, index) => {

            container.innerHTML += `

            <article class="blog-card">

                ${blog.image
                    ? `<img src="${blog.image}" alt="${blog.title}">`
                    : `<div class="thumb one" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>`
                }

                <div class="blog-card-content">

                    <span class="blog-date">
                        ${formatDate(blog.created_at)}
                    </span>

                    <h3>${blog.title}</h3>

                    <p class="blog-excerpt">
                        ${excerpt(blog.content)}
                    </p>

                    <a class="blog-read-more" href="blog-post.html?id=${blog.id}">
                        Read More →
                    </a>

                </div>

            </article>

            `;

        });

        const count = document.getElementById("blog-count");

        if (count) {
            count.textContent = `${blogs.length} ${blogs.length === 1 ? "article" : "articles"}`;
        }

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="blog-empty">
                Unable to load blog posts right now.
            </p>
        `;

    }

}


document.addEventListener("DOMContentLoaded", loadBlogs);