var val;
var val2;
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