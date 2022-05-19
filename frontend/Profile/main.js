function checkLogin(){
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
        loadDetails()
        
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
                    document.getElementById('nameRole').value=user.name
                    document.getElementById('role').value="Student"
                }
            }catch (error){
                
            }
            
        }else{
            document.getElementById('nameRole').value=user.name
            document.getElementById('role').value="Personal Trainer"
        }

    }catch(error){
        
    }
}