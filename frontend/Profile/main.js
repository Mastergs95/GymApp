function displayNavStudents(){
  const role = checkRole()
  if(role=="Trainer"){
      try{
          document.getElementById("Students").href="../Students/ViewStudents.html"
          document.getElementById("Students").style.display="block"
          }catch(error){
          }
  }else{

  }
}

async function checkLogin(){
  var token = "";
  var name="";
  var id="";
  var status="";
  id = sessionStorage.getItem('id')
  token = sessionStorage.getItem('token');
  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');
  displayNavStudents()

  if(String(token).length>30){
      status="logged"
      document.getElementById("login").textContent=name
      document.getElementById("login").style.animationName
      await loadDetails()
      await takeTrainers()
  }
  else{
      window.location.replace("../Login/index.html")
  }
  return status;
}

  function checkRole(){
    let id = sessionStorage.getItem('id')
    let role="";
    try{
        data = doGet("https://rest-api-gym.herokuapp.com/api/students/getByUser/" + id)
        const user = JSON.parse(data)
        role="Student"

        if(user.msg=="User not found!"){
            try{
            data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/getByUser/" + id)
            const user = JSON.parse(data)
            role="Trainer"

            }catch(error){
                console.log(error)
            }
        }
    } catch(error){
        console.log(error)
    }
    return role;
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
                    document.getElementById('age').value=user.age
                    document.getElementById('height').value=user.height
                    document.getElementById('weight').value=user.weight
                    
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
        document.getElementById('ega').style.display="none"
        document.getElementById('cmkg').style.display="none"
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
      let age = document.getElementById("age").value;
      let height = document.getElementById("height").value;
      let weight = document.getElementById("weight").value; 
      let trainer = document.getElementById('ptrainer').value
      let id = sessionStorage.getItem('id')
      data = doGet("https://rest-api-gym.herokuapp.com/api/students/getByUser/" + id)
      const user = JSON.parse(data)

//Update Personal Trainer in table Students
      fetch("https://rest-api-gym.herokuapp.com/api/students/update/" + user._id,{
    
    method: 'PATCH',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      PersonalTrainers:trainer,
      height:height,
      weight:weight,
      age:age
    })
  })
  .then(response=>{
    if(!response.ok){
      throw Error ("Error")
    }

///Update Student in Table PersonalTrainers
    fetch("https://rest-api-gym.herokuapp.com/api/pTrainers/update/" + trainer,{
    
      method: 'PATCH',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Students:user._id,
      })
    }).then(response=>{
      if(!response.ok){
        throw Error ("Error")
      }
      return response.json()

    }).then(data=>{

      alert(data.message)

    }).catch(error=>{

      console.log(error)

    })
///
    return response.json()
  })
  .then(data=>{

    alert(data.message)

  })
  .catch(error=>{
    console.log(error)
  })
  //
  }