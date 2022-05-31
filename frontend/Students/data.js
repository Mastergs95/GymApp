
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
    let height=infoStudent.height
    let weight = infoStudent.weight


    document.querySelector(".labelPtdata").textContent+=infoTrainer.name

    document.querySelector("#name").textContent=infoStudent.name
    document.querySelector("#tdName").textContent=infoStudent.name
    document.querySelector("#tdAge").textContent=infoStudent.age
    document.querySelector("#tdHeight").textContent=height + " cm"
    document.querySelector("#tdWeight").textContent=weight + " kg"
    
    let heightInMetrers = height/100
    let imc = weight/(heightInMetrers*heightInMetrers)
    imcClassification(imc)
    document.querySelector("#tdIMC").textContent=imc.toFixed(2)
    

}
loadDetails()

function imcClassification(imc){
    if(imc<=18.5){
        document.getElementById("tdIMC").style.background="#b3d7ff"
    } else if(imc>18.5 && imc<=24.9){
        document.getElementById("tdIMC").style.background="green"
    } else if(imc>=25.0 && imc<=29.9){
        document.getElementById("tdIMC").style.background="yellow"
        document.getElementById("tdIMC").style.color="black"
    }else if(imc>30.0 && imc<=34.9){
        document.getElementById("tdIMC").style.background="orange"
    }else if(imc>=35.0 && imc<=39.9){
        document.getElementById("tdIMC").style.background="red"
    }else{
        document.getElementById("tdIMC").style.background="purple"
    }
}

function logout2(){
    var checkStatus= document.getElementById("login").textContent
    var name = sessionStorage.getItem('name')

    if(checkStatus==name){
        if (confirm("Are you sure you want logout?")) {
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('id')
            sessionStorage.removeItem('token')
            window.location="../Login/index.html"
            window.location.reload()
          } else {
            alert("Welcome again")
          }
          
    }
}