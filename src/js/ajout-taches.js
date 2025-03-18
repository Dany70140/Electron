const todoForm = document.querySelector('#todoForm')


todoForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const titre = document.querySelector('#titre').value
        await TodosAPI.add({titre})
        todoForm.reset()

})