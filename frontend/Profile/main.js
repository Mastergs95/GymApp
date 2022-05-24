async function checkLogin(){

    var token = "";
    var name="";
    var id="";
    id = sessionStorage.getItem('id')
    token = sessionStorage.getItem('token');
    name = sessionStorage.getItem('name');
    role = sessionStorage.getItem('role');

    if(token){
        if(id=="627e98d6dfe3636ae9d10d28"){
            document.getElementById("trainers").style.display="block"
            document.getElementById("students").style.display="block"
        }
        //document.getElementById("trainers").href="./trainer.html"
        document.getElementById("login").href=""
        document.getElementById("login").textContent=name
        document.getElementById("login").style.animationName
        await loadDetails()
        await takeTrainers()
    }
    else{
        window.location.replace("../Login/index.html")
    }
  }


function doGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function logout(){
    var checkStatus= document.getElementById("login").textContent
    var name = sessionStorage.getItem('name')

    if(checkStatus==name){
        if (confirm("Are you sure you want logout?")) {
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('token')
            window.location.replace="../Login/index.html"
            window.location.reload()
          } else {
            alert("Welcome again")
          }
          
    }
}


//Load Details of Profile
function loadDetails(){
    const id = sessionStorage.getItem('id')

    let data="";
    data = doGet("https://rest-api-gym.herokuapp.com/api/users/get/" + id)
    data = data.trim();
    const user = JSON.parse(data)
    

    document.getElementById('nameUser').textContent=user.name + " " + user.lastName
    document.getElementById('emailUser').textContent=user.email
    document.getElementById('fname').value=user.name
    document.getElementById('lname').value=user.lastName
    document.getElementById('email').value=user.email

    lastcaracter=user.name.slice(-1);

    if(lastcaracter=="o"){
        document.getElementById('avatar').src="../resources/men.png";
    } else if(lastcaracter=="a"){
        document.getElementById('avatar').src="../resources/women.png";
    }else{
        
    }



    try{
        data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/getByUser/" + id)
        const user = JSON.parse(data)

        if(user.msg=="User not found!"){

            try{
                data = doGet("https://rest-api-gym.herokuapp.com/api/students/getByUser/" + id)
                const user = JSON.parse(data)

                if(user.msg=="User not found!"){

                }else{
                    document.getElementById('role').value="Student"
                }
            }catch (error){
                
            }
            
        }else{
            document.getElementById('role').value="Personal Trainer"
        }

    }catch(error){
        
    }
}

async function takeTrainers(){
    let role = document.getElementById('role').value
    
    if(role=="Student"){
        let data="";
        data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/get")
        data = data.trim();
        const users = JSON.parse(data)
  
        users.forEach(element => {
        createLineTrainer(element)
        });

    }else{
        document.getElementById('ptrainer').style.display="none"
        document.getElementById('save').style.display="none"
        document.getElementById('pts').style.display="none"
    }

    
  }
  
  function createLineTrainer(trainer){
  
    let line=document.getElementById("ptrainer")
    let optName= document.createElement("option")
  
    optName.innerHTML=trainer.name 
    optName.value=trainer._id
  
    line.appendChild(optName)
  }

  function saveProfile(){
      let trainer = document.getElementById('ptrainer').value
      let id = sessionStorage.getItem('id')
      data = doGet("https://rest-api-gym.herokuapp.com/api/students/getByUser/" + id)
      const user = JSON.parse(data)

      fetch("https://rest-api-gym.herokuapp.com/api/students/update/" + user._id,{
    
    method: 'PATCH',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      personaltrainers:trainer,
    })
  })
  .then(response=>{
    if(!response.ok){
      throw Error ("Error")
    }
    return response.json()
  })
  .then(data=>{

    console.log(data)

  })
  .catch(error=>{
    console.log(error)
  })
  }