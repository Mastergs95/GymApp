
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



//Login and Create user by role
function signup(){

  let name=document.getElementById("name").value
  let lastname=document.getElementById("lastname").value
  let username=document.getElementById("user").value
  let password= document.getElementById("password-field").value


  fetch("http://localhost:3000/api/users/register",{
    
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name:name,
      lastname:lastname,
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
      alert("Email is required!")
    }
    if(!response.ok){
      throw Error ("Error")
    }

    return response.json()
  })
  .then(data=>{

    console.log(data)

    if(data.message=="User added successfully!"){
      
      sessionStorage.setItem('name', data.user.name);


      alert()
      //window.location.replace("../index.html");
      alert(data.message)
      

    }else if(data.message=="An error occurred!"){

      alert(data.message+" Try with another email")

    }else{
      alert(data.message)
    }
  })
  .catch(error=>{
    console.log(error)
  })


}


