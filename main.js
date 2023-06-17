document.getElementById('submitForm').addEventListener('submit', getErasTourTicket)
function getErasTourTicket(event){
    event.preventDefault()
    console.log('trying...')
    window.location.href = '/download/shut-down'
}
