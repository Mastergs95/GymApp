
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

  const response= await fetch("http://localhost:3000/api/pTrainers/get")
  const data = await response.json()
}


//Login and Create user by role
function create(){

  let username=document.getElementById("user").value
  let password= document.getElementById("password-field").value
  let role = document.getElementById("roles").value

  fetch("http://localhost:3000/api/users/login",{
    
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      email: username,
      password: password,
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
      sessionStorage.setItem('role', role);
      alert()
      //window.location.replace("../index.html");
      alert(data.message)
      

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


