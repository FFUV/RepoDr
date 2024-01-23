let activeFilter = 'desc'; // Set the initial filter to 'desc' for most popular

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            applyFilters(filter);
            searchProjects(); // Trigger a search when a filter button is clicked
        });
    });

    // Initial search on page load
    searchProjects();
});

async function searchProjects() {
    const query = document.getElementById('query').value;
    const filter = activeFilter ? `&sort=stars&order=${activeFilter}` : '';

    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `query=${query}${filter}`
    });

    const data = await response.json();
    displayProjects(data);
}

function applyFilters(filter) {
    activeFilter = filter;
    updateFilterButtons();
}

function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        const filter = button.dataset.filter;
        button.classList.toggle('active', filter === activeFilter);
    });
}

function displayProjects(data) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = '';

    data.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p>Forks: ${project.forks}</p>
            <p>Stars: ${project.stargazers_count}</p>
            <p>Watchers: ${project.watchers}</p>
            <a href="${project.html_url}" target="_blank">View on GitHub</a>
        `;
        projectsContainer.appendChild(projectCard);
    });
}
