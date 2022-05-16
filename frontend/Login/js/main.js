
function rdsignup(){
  window.location.replace="../Register/index.html"
}

function eyePass(){
  var first_click = true;

  document.getElementById("eye").onclick = function() {
      if (first_click) {
          document.getElementById("password-field").setAttribute("type","text")
          document.getElementById("eye").style.color="#01d28e",

          first_click = false;
      } else {
        document.getElementById("password-field").setAttribute("type","password")
        document.getElementById("eye").style.color="gray",

          first_click = true;
      }
  }
}

async function login(){

  const response= await fetch("http://35.180.234.134:3000/api/pTrainers/get")
  const data = await response.json()
}


//Login and Create user by role
function create(){

  let username=document.getElementById("user").value
  let password= document.getElementById("password-field").value
  let role = document.getElementById("roles").value
  let name = sessionStorage.getItem('name')

  fetch("http://35.180.234.134:3000/api/users/login",{
    
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      email: username,
      password: password,
      role:role,
      name:name
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

    if(data.message=="Login successful!"){
      
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('name', data.name);
      sessionStorage.setItem('id', data.id);
      alert(data.message)
      window.location.replace("../index.html");

    }else if(data.message=="No user found!"){
      alert(data.message)
    }else{
      alert(data.message)
    
    }
  })
  .catch(error=>{
    console.log(error)
  })


}


