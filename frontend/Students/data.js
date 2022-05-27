
function doGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function loadDetails(){
    const stId=localStorage.getItem('stId')
    const stIdTrainer = localStorage.getItem('stIdTrainer')

    dataStudent = doGet("https://rest-api-gym.herokuapp.com/api/students/get/"+ stId)
    dataTrainer = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/get/"+ stIdTrainer)

    const infoStudent = JSON.parse(dataStudent)
    const infoTrainer = JSON.parse(dataTrainer)

    document.querySelector("#name").textContent=infoStudent.name
}
loadDetails()