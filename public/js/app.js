
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Forecast'
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    const URL = 'http://localhost:3000/weather?address='+location

    fetch(URL).then((response) => {
        messageTwo.textContent = "Loading.."
    response.json().then((data) => {
        if(data.error){
            messageTwo.textContent = data.error
        }else{
            messageTwo.textContent = 'Sää '+data.location+":ssa on tällä hetkellä."+
            data.description+" ja lämpötila on "+data.temperature+"C astetta."
            console.log(data.location)
            console.log(data.temperature)
            console.log(data.description)
        }
    })
})

})

