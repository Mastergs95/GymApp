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
            txt = "Bye!";
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('token')
            window.location.replace="./Login/index.html"
          } else {
            alert("Welcome again")
          }
          
    }
}

function checkLogin(){
    var token = "";
    var name="";
    var id="";
    id = sessionStorage.getItem('id')
    token = sessionStorage.getItem('token');
    name = sessionStorage.getItem('name');
    role = sessionStorage.getItem('role');

    console.log(token);

    if(token){
        if(id=="627e98d6dfe3636ae9d10d28"){
            document.getElementById("trainers").style.display="block"
            document.getElementById("students").style.display="block"
        }
        //document.getElementById("trainers").href="./trainer.html"
        document.getElementById("login").href=""
        document.getElementById("login").textContent=name
        document.getElementById("login").style.animationName

        
    }
    else{
        window.location.replace("./Login/index.html")
    }
  }



function createLineSt(user){

    let line=document.getElementById("last")
    let tdName= document.createElement("td")
    let tdlastName= document.createElement("td")
    let tdAge= document.createElement("td")
    let tdheight= document.createElement("td")
    let tdweight= document.createElement("td")
    let tdDelete= document.createElement("td")
    let tdEdit= document.createElement("td")

    let aDelete = document.createElement('a')
    let aEdit = document.createElement('a')

    aDelete.href=("http://localhost:3000/api/pTrainers/delete/" + user._id)
    aDelete.innerHTML="delete"

    aEdit.href=("http://localhost:3000/api/pTrainers/update/" + user._id)
    aEdit.innerHTML="edit"

    tdName.innerHTML = user.name
    tdlastName.innerHTML = user.lastName
    tdAge.innerHTML = user.age
    tdheight.innerHTML = user.height
    tdweight.innerHTML = user.weight


    line.appendChild(tdName)
    line.appendChild(tdlastName)
    line.appendChild(tdAge)
    line.appendChild(tdheight)
    line.appendChild(tdweight)
    line.appendChild(tdDelete)
    line.appendChild(tdEdit)
    tdDelete.appendChild(aDelete)
    tdEdit.appendChild(aEdit)

    return line;
}

var student;

function createLine(user){

    
    let line=document.createElement("tr")
    let tdid= document.createElement("a")
    let tdName= document.createElement("td")
    let tdlastName= document.createElement("td")
    let tdAge= document.createElement("td")
    tdid.innerHTML = user._id
    tdName.innerHTML = user.name
    tdlastName.innerHTML = user.lastName
    tdAge.innerHTML = user.age
    line.setAttribute("id","last")
    

    student = doGet('http://127.0.0.1:3000/api/students/get/' + user.students)


    line.appendChild(tdid)
    line.appendChild(tdName)
    line.appendChild(tdlastName)
    line.appendChild(tdAge)

    
    return line;
}




function main(){
    let data="";
    data = doGet("http://127.0.0.1:3000/api/pTrainers/get")
    data = data.trim();
    const users = JSON.parse(data)
    
    
    let table = document.getElementById("table")

    users.forEach(element => {
        let line = createLine(element);
        table.appendChild(line)
    });


//Get Students of Trainers
    student.trim()
    console.log(student)
    const usersSt = JSON.parse(student)

    table = document.getElementById("table")

    usersSt.forEach(element => {
        let line = createLineSt(element);
        table.appendChild(line)
    });
}

function testes(){
    let data="";
    data = doGet("http://127.0.0.1:3000/api/pTrainers/get")
    data = data.trim();
    const users = JSON.parse(data)
    
    let line
    users.forEach(element => {

        console.log(element.name)
        let names="";
        names=element.name
        line = document.createElement("a")
        line.setAttribute("id",element._id)
        line.setAttribute("class","ab")

        line.innerHTML=names
      //  line.href=("http://localhost:3000/api/pTrainers/get/" + element._id)
        
        var element = document.getElementById("dropdown");
        element.appendChild(line);
        console.log(line)

        

        return line;
        
    });
    
}

function testesSt(){
    let data="";
    data = doGet("http://127.0.0.1:3000/api/pTrainers/get")
    data = data.trim();
    const users = JSON.parse(data)

    let table = document.getElementById("table")

    users.forEach(element => {
        let line = createLine(element);
        table.appendChild(line)
    });
    
    
    let username = document.getElementById("name")
    let line


    
    users.forEach(element => {

        console.log(element.name)
       
        
        line = document.createElement("a")
        line.setAttribute("id",element._id)
        line.setAttribute("class","ab")

        username.innerHTML=element.name
        line.innerHTML=element._id

        
        var element = document.getElementById("infoUser");

        element.appendChild(username);

        console.log(username)

        

        return line;
        
    });
    
}


/* let idTrainer 
let users
window.onclick = function(e) {
        
        console.log(e.target.id)
        idTrainer=e.target.id

        let data="";
        data = doGet("http://127.0.0.1:3000/api/pTrainers/get/" + idTrainer)
        data = data.trim();
        users = JSON.parse(data)
        let name=document.getElementById("name")

}  */
    


/*function testesCp(){
    
    let data="";
    data = doGet("http://127.0.0.1:3000/api/pTrainers/get/" + id)
    data = data.trim();
    const users = JSON.parse(data)

    let table = document.getElementById("table")


        let line = createLine(users);
        table.appendChild(line)  
   
    
}*/



