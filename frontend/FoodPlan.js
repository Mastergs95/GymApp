function startPlan(){
    var first_click = true;
    var day = 1;
    document.getElementById("startPlan").onclick = function() {
        if (first_click) {
            //document.getElementById("calendar").style.display="block";
            document.getElementById("startPlan").textContent="Close"
            document.getElementById("myDiv").style.opacity=1 
            first_click = false;
            if(day>31){
                day=1
            }
            createRows(day)
            day+=1
        } else {
            //document.getElementById("calendar").style.display="none";
            document.getElementById("startPlan").textContent="Start"
            first_click = true;

        }
    }
}

function savePlan(){
    document.getElementById('startPlan').style.display="none"
    document.getElementById('savePlan').style.display="none"
    document.getElementById('plan').style.display="none"
    window.print()

    let text = "You need to reload the page! Confirm that you have saved your data";
    if (confirm(text) == true) {
    window.location.reload()
     } else {
        document.getElementById('startPlan').style.display="initial"
        document.getElementById('savePlan').style.display="initial"
        document.getElementById('plan').style.display="initial"
    }

}



function createRows(day){

    if(day==31){
        document.getElementById('startPlan').style.display="none"
        document.getElementById('savePlan').style.display="none"
        document.getElementById('plan').style.display="none"
        window.print()
        window.location.reload()
    }
    
    let table = document.getElementById('table')
    let line = document.createElement('tr')

    
    let days = document.createElement('td')
    let row = document.createElement('td')
    let row1 = document.createElement('td')
    let row2 = document.createElement('td')
    let row3 = document.createElement('td')
    let row4 = document.createElement('td')
    let row5 = document.createElement('td')

    days.innerHTML=day
    row.innerHTML=document.getElementById('br').value
    row1.innerHTML=document.getElementById('mm').value
    row2.innerHTML=document.getElementById('lc').value
    row3.innerHTML=document.getElementById('aft').value
    row4.innerHTML=document.getElementById('ma').value
    row5.innerHTML=document.getElementById('dn').value


    line.appendChild(days)
    line.appendChild(row)
    line.appendChild(row1)
    line.appendChild(row2)
    line.appendChild(row3)
    line.appendChild(row4)
    line.appendChild(row5)
    table.appendChild(line)
    
    
}
