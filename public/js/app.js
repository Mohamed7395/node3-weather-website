const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
const weatherByLocation = document.querySelector('#weatherByLocation')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("/weather?address=" + location).then((response) => {
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

weatherByLocation.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {

        const longitude = position.coords.latitude
        const latitude = position.coords.longitude
        const msg = positionError.message
        if (msg) {
            console.log(msg);
            
        }

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
       fetch(`/weatherbyloc?latitude=${latitude}&longitude=${longitude}`).then((response => {
           response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else { 
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
               console.log(data);
               
           })
       }))
    })
    // console.log(location);
    
})