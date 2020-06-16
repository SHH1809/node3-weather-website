
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'
// messageTwo.textContent = 'xxx'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    const urlSearch = 'http://localhost:3000/weather?address='+location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch( urlSearch).then ((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })


})