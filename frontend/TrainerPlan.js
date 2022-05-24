function verifyInput(){

    let input = document.getElementById("numberOfWeeks").value
    console.log(input)

    if(input>52){
        alert("Invalid value")
    } else{
        
    }
}

function displayCalendar(){

    var first_click = true;
    document.getElementById("startPlan").onclick = function() {
        if (first_click) {
            document.getElementById("calendar").style.display="block";
            document.getElementById("startPlan").textContent="Close"
            first_click = false;
        } else {
            document.getElementById("calendar").style.display="none";
            document.getElementById("startPlan").textContent="Start"
            first_click = true;
        }
    }






    
        
}