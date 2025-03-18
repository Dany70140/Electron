const listeTaches = document.querySelector("#liste-taches")

async function lesTaches() {
    const t = await todosAPI.getAll()
    listeTaches.innerHTML = t.map(todos => {
        // Formatter la date
        const date = new Date(todos.created_at).toLocaleDateString("fr-FR")
        return `<div class="col-md-6 col-lg-4 me-3 ms-3 my-3" id="book-${todos.id}">
     <div class="card h-100 bg-black">
        <div class="card-body ">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0 text-white">${todos.titre}</h5>
                <span class="badge ${todos.termine ? 'bg-success' : 'bg-secondary'} toggle-read-btn data-id="${todos.id}" 
                        style="cursor: pointer;" >
                    ${todos.termine ? '<i class="bi bi-check-circle me-1"></i>Fait' : '<i class="bi bi-circle me-1"></i>Non fait'}
                </span>
                </div>
                 <small class=" text-white">
                    <i class="bi bi-calendar3 me-1"></i>${date}
                </small>
                <button class="btn btn-outline-danger btn-sm delete-btn ms-3" data-id="${todos.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> Supprimer
                </button>
            </div>
        </div>
    </div>
</div>`
    }).join('')
}

lesTaches()