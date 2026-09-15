function getProjects() {
    const urlGitHub = 'https://api.github.com/users/lleonardo4m/repos';
    const loadingElement = document.getElementById('loading');

    fetch(urlGitHub)
        .then((response) => {
            if (!response.ok) throw new Error(`GitHub respondeu com ${response.status}`);
            return response.json();
        })
        .then((response) => {
            showProjects(response);
            loadingElement.style.display = 'none';
        })
        .catch((error) => {
            console.error(`Erro ao carregar projetos: ${error}`);
            loadingElement.textContent = 'Não foi possível carregar os projetos no momento.';
        });
}

function showProjects(data) {
    const listElement = document.getElementById('my-projects-list');

    if (!data.length) {
        listElement.innerHTML = '<p class="text-center text-muted">Nenhum projeto público encontrado.</p>';
        return;
    }

    data.forEach((project) => {
        const column = document.createElement('div');
        column.className = 'col-sm-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'project-card';

        const link = document.createElement('a');
        link.href = project.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = project.description || 'Abrir projeto no GitHub';
        link.textContent = project.name;

        const description = document.createElement('p');
        description.className = 'small text-muted mt-2 mb-0';
        description.textContent = project.description || 'Projeto no GitHub.';

        card.appendChild(link);
        card.appendChild(description);
        column.appendChild(card);
        listElement.appendChild(column);
    });
}

getProjects();
