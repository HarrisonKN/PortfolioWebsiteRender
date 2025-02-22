document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Project One',
            description: 'Description of project one.',
            link: 'https://link-to-project-one.com',
            image: 'images/project-one.png'
        },
        {
            title: 'Project Two',
            description: 'Description of project two.',
            link: 'https://link-to-project-two.com',
            image: 'images/project-two.png'
        },
        {
            title: 'Project Three',
            description: 'Description of project three.',
            link: 'https://link-to-project-three.com',
            image: 'images/project-three.png'
        }
    ];

    const projectContainer = document.getElementById('project-container');

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;

        projectContainer.appendChild(projectElement);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Show the first section by default
    document.querySelector('.content-section').classList.add('active');

    // Modal functionality
    const settingsButton = document.getElementById('settings-button');
    const modal = document.getElementById('settings-modal');
    const closeButton = document.querySelector('.close-button');
    const themeSelect = document.getElementById('theme-select');
    const colorSelect = document.getElementById('color-select');

    settingsButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    themeSelect.addEventListener('change', (event) => {
        document.body.className = event.target.value;
    });

    colorSelect.addEventListener('input', (event) => {
        const color = event.target.value;
        document.querySelector('header').style.backgroundColor = color;
        document.querySelector('footer').style.backgroundColor = color;
    });
});