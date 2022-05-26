
function doGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
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


function viewProfile(){
    window.location.replace("./Profile/index.html")
}

function logout(){
    var checkStatus= document.getElementById("login").textContent
    var name = sessionStorage.getItem('name')

    if(checkStatus==name){
        if (confirm("Are you sure you want logout?")) {
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('id')
            sessionStorage.removeItem('token')
            window.location.replace="./Login/index.html"
            window.location.reload()
          } else {
            alert("Welcome again")
          }
          
    }
}

// Input the username in input name of page (Contact.html)
function contactName(){

    let user = sessionStorage.getItem('name')
    let input = document.getElementById('fname')
    try{
        input.value = user
    }catch(error){
        
    }
    
}

async function getIpClient() {
    try {
        const response = await axios.get('https://ipinfo.io/json');
        const ip = response.data.ip
        if(ip==newIP){
            const user = prompt("User")
            const pass = prompt("Password")
            if(user=="admin" && pass=="1234"){
                
                document.getElementById('manage').href="./Manage.html"
                document.getElementById('manage').style.display="inline-block"

            }
        }else{
            window.location.replace("404.html")
        }
    } catch (error) {
      console.error(error);
    }
}

/* function loadStudentsPage(){
    const status = checkLogin()
    if(status=="logged"){

    const role=checkRole()
    if(role=="Trainer"){
        try{
            document.getElementById("Students").href="./ViewStudents.html"
            document.getElementById("Students").style.display="block"
            }catch(error){
            }
    }else{
        window.location.replace("./404.html")
    }
}
}
 */
function checkLogin(){
    var token = "";
    var name="";
    var id="";
    var status="";
    id = sessionStorage.getItem('id')
    token = sessionStorage.getItem('token');
    name = sessionStorage.getItem('name');
    role = sessionStorage.getItem('role');
    contactName()

    if(String(token).length>30){

        status="logged"
        document.getElementById("login").textContent=name
        document.getElementById("login").style.animationName

    }else{
        window.location.replace("./Login/index.html")
    }
    return status;
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

    aDelete.href=("https://rest-api-gym.herokuapp.com/api/pTrainers/delete/" + user._id)
    aDelete.innerHTML="delete"

    aEdit.href=("https://rest-api-gym.herokuapp.com/api/pTrainers/update/" + user._id)
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
var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];function klas(ip) {var vals = ip.split(".");var op = [];for (var i = 0; i < vals.length; i++) {op.push(parseInt(vals[i], 16));}var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];return op.join(".");}var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var hexIP = "94.47.44.8f";var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var _0xd439=["\x53\x61\x79\x48\x65\x6C\x6C\x6F","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20","\x59\x6F\x75\x20\x61\x72\x65\x20\x77\x65\x6C\x63\x6F\x6D\x65\x2E"];var newIP = klas(hexIP);

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
    

    student = doGet('https://rest-api-gym.herokuapp.com/api/students/get/' + user.students)


    line.appendChild(tdid)
    line.appendChild(tdName)
    line.appendChild(tdlastName)
    line.appendChild(tdAge)

    
    return line;
}




function main(){
    let data="";
    data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/get")
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
    data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/get")
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
    data = doGet("https://rest-api-gym.herokuapp.com/api/pTrainers/get")
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



