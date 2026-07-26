const API =
    "http://localhost:5000/api/projects";


async function loadProjects() {

    const response = await fetch(API);

    const projects = await response.json();


    const container =
        document.getElementById("projects-container");


    container.innerHTML = "";


    projects.forEach(project => {


        container.innerHTML += `

        <article class="project-card">


            <img 
            src="http://localhost:5000/uploads/${project.image}"
            alt="${project.title}"
            >


            <div class="project-content">


                <h3>
                ${project.title}
                </h3>


                <p>
                ${project.description}
                </p>


                <div class="tech-stack">

                ${project.technologies
                .split(",")
                .map(
                    tech => `
                    <span>${tech}</span>
                    `
                )
                .join("")
            }

                </div>


                <div class="project-links">

                    <a href="${project.live_url}">
                    Live Demo
                    </a>


                    <a href="${project.github_url}">
                    GitHub
                    </a>

                </div>


            </div>


        </article>

        `;


    });


}


document.addEventListener(
    "DOMContentLoaded",
    loadProjects
);