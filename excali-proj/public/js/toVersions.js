var val;
var val2;
var input = document.getElementById("searchElement");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submitElement").click();
  }
});
function myfunction(){
    var all = document.getElementsByTagName("a")
    var i =0;
    while(i<all.length){
        all[i].style.color = "inherit";
        i++;
    }
    val = document.getElementById("searchElement").value;
    console.log(val);
    if(val === null){
        window.alert("In valid File")
        console.log("in if")
    }
    else{
        val2 = document.getElementById(val)
        if(val2===null){
            window.alert("No such File")
        }
        else{
            val2.style.color = "red";
        }
    }
}