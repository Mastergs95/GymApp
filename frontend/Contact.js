async function sendEmail(){
    var name= await document.getElementById('fname').value
    var subject= await document.getElementById('subject').value
    var body= await document.getElementById('message').value



    var fsubject= await name + " - " + await subject

    //window.open(`mailto:test@example.com?subject=${subject}&body=${body}`);
    window.open(`mailto:test@example.com?subject=${fsubject}&body=${body}`);
}