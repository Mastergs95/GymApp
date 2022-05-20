
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

function doGet(url){
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}





//Login and Create user by role
function signup(){

  let name=document.getElementById("name").value
  let lastname=document.getElementById("lastname").value
  let username=document.getElementById("user").value
  let password= document.getElementById("password-field").value
  

  fetch("https://rest-api-gym.herokuapp.com/api/users/register",{
    
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name:name,
      lastName:lastname,
      email: username,
      password: password,
    })

  })
  .then(response=>{
    if(!name){
      alert("Name is required!")
    }
    if(!lastname){
      alert("Last Name is required!")
    }
    if(!username){
      alert("Email is required!")
    }
    if(!password){
      alert("Password is required!")
    }
    if(!response.ok){
      throw Error ("Try with another email")
      
    }

    return response.json()
  })
  .then(data=>{

    console.log(data)

    if(data.message=="User added successfully!"){
      
      sessionStorage.setItem('name', data.user.name);

      alert(data.message)

      window.location.replace("../index.html");
      

    }else if(data.message=="An error occurred!"){

      alert(data.message + " Try with another email")

    }else{
      alert(data.message)
    }
  })
  .catch(error=>{
    console.log(error)
  })


}


