let buttons = Array.from(document.querySelectorAll(".button"))
function handleInput(input){
    let targetButton = buttons.find(button => button.innerHTML === input );
    if(targetButton ){
        simulateClick(targetButton);
    }
}

function simulateClick(button){
    button.click();
}

document.addEventListener("keydown",(event)=>{
    let key = event.key;
    const validKeys = /^\d$|\+|\-|\*|\/|\.|\^|Backspace|Enter|C|c/; // Combined valid keys

    if (validKeys.test(key)) {
    // if (/^\d$/.test(key) || ['+', '-', '*', '^2', '.', '/', 'c', 'Backspace', 'Enter'].includes(key)) {
        if (key === 'Backspace') {
            key = 'Back<br>space';
        }
        else if (key === 'Enter') {
            key = 'Calculate';
        } 
        
        else if (key === 'c') {
            key = 'CE'; // Convert 'c' to 'C'
        }
        else if(key=== '*' || key ==='x'){
            key = 'X';
        }

        handleInput(key);
    }
})       


let express = [];
let result = [];
let string = '';
buttons.forEach(button => {
    button.addEventListener("click",(e)=>{
        if(e.target.innerHTML==='Calculate' || e.target.innerHTML ==='CALCULATE' || e.target.innerHTML==='calculate'){
            let exp = string.toString();
            document.querySelector(".info").innerHTML = string;
            express.push(exp);
            console.log(express);
            try{
                string = eval(string);
                result.push(string);
                console.log(result);
            }
            catch{
                string = 'ERROR'
            }
            document.querySelector(".numbers").value=string;
            addHistory(express, result);
        }
        else if(e.target.innerHTML === 'X'){
            string += '*'
            document.querySelector(".numbers").value=string;
        }
        else if( e.target.innerHTML === 'CE' ) {
            string='';
            document.querySelector(".numbers").value = string;
            document.querySelector(".info").innerHTML = string;
        }
        else if(e.target.innerHTML==='C'||e.target.innerHTML==='c'){
            string = ''
            document.querySelector(".numbers").value = string;
        }
        else if (e.target.innerHTML === 'Back<br>space') {
            string = string.slice(0,-1)
            document.querySelector(".numbers").value = string;
        }
        else if(e.target.innerHTML==='^2'){
            string +='**2'
            string = eval(string);
            document.querySelector(".numbers").value = string;
            result.push(string);
        }
        else if(e.target.innerHTML==="1/x"){
            string = 1/string;
            document.querySelector(".info").innerHTML = string;
            string = eval(string)
            document.querySelector(".numbers").value = string;
            result.push(string);
        }
        else if(e.target.innerHTML==="+/-"){
            if (string.startsWith('-')) {
                string = string.replace(/^-/, ''); 
              } else {
                string = '-' + string; 
              }
            document.querySelector(".numbers").value = string;
        }
        else if(e.target.innerHTML==="2√x"){
            document.querySelector(".info").innerHTML = '2√' + string ;
            string = Math.sqrt(string)
            string = eval(string)
            document.querySelector(".numbers").value = string;
            result.push(string);
        }
        else{
            string = string + e.target.innerHTML;
            document.querySelector(".numbers").value = string;
            expressions = document.querySelector(".numbers").value;
        }
    })
})

let memory = null;

function memoryStore() {
    memoryValue = parseFloat(document.querySelector(".numbers").value); // Store the parsed number
}
  
function memoryAdd() {
    if (memoryValue !== null) {
      memoryValue += parseFloat(document.querySelector(".numbers").value);
    }
}
  
function memorySubtract() {
    if (memoryValue !== null) {
      memoryValue -= parseFloat(document.querySelector(".numbers").value);
    }
}
  
function memoryRecall() {
    if (memoryValue !== null) {
    document.querySelector(".numbers").value = memoryValue;
    }
}
  
function memoryClear() {
    memoryValue = null;
}

function addHistory(express, result) {
    const historyList = document.querySelector(".hist");
    historyList.innerHTML = ""; // Clear existing content

    express.forEach((exp, index) => {
        const historyItem = document.createElement("li");
        historyItem.innerText = `${exp} = ${result[index]}`; // Access corresponding result
        historyList.appendChild(historyItem);
    });
}
  



document.querySelector(".target").addEventListener("click",()=>{
    let overlay = document.querySelector(".overlay");
    if(overlay.style.bottom>='5px'){
        overlay.style.bottom = '-250px';
        overlay.style.display = 'none';
    }
    else{
        overlay.style.bottom="5px";
        overlay.style.display = "block";
    }
})
