document.addEventListener('DOMContentLoaded', () => {
    // Handle section navigation
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
        const theme = event.target.value;
        document.body.className = theme;
        if (theme === 'light') {
            document.documentElement.style.setProperty('--header-bg-color', '#333');
            document.documentElement.style.setProperty('--sidebar-bg-color', '#555');
        } else {
            document.documentElement.style.setProperty('--header-bg-color', '#111');
            document.documentElement.style.setProperty('--sidebar-bg-color', '#333');
        }
    });

    colorSelect.addEventListener('input', (event) => {
        const color = event.target.value;
        document.documentElement.style.setProperty('--header-bg-color', color);
        document.documentElement.style.setProperty('--sidebar-bg-color', lightenColor(color, 20));
    });

    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1).toUpperCase();
    }

    // Load project content
    const projectLinks = document.querySelectorAll('#project-list a');
    const projectContent = document.getElementById('project-content');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const file = this.getAttribute('data-file');
            console.log(`Fetching file: ${file}`); // Debugging line
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    projectContent.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error loading project content:', error); // Debugging line
                    projectContent.innerHTML = '<p>Error loading project content.</p>';
                });
        });
    });
});