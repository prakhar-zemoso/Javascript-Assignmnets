
function updateScore(){
    let value= 0;
    let value2= 0;

    if(localStorage.getItem('local')== null){

        localStorage.setItem('local',1);
        value=1;
    }
    else{
     value = parseInt(localStorage.getItem('local'))+1;
       localStorage.setItem('local',value);
    }

    if(sessionStorage.getItem('session')== null){

        sessionStorage.setItem('session',1);
        value2=1;
    }
    else{
     value2 = parseInt(sessionStorage.getItem('session'))+1;
       sessionStorage.setItem('session',value2);
    }

    displayLocalScore();



}

function displayLocalScore(){
    let value = 0;
    let value2 = 0;
if(localStorage.getItem('local')== null){
      document.getElementById('localScore').innerHTML = 0;
}else{
    value = parseInt(localStorage.getItem('local'));
      document.getElementById('localScore').innerHTML = value;
   }
//-------------
if(sessionStorage.getItem('session')== null){
    document.getElementById('sessionScore').innerHTML = 0;
}else{
  value2 = parseInt(sessionStorage.getItem('session'));
    document.getElementById('sessionScore').innerHTML = value2;
 }
}

displayLocalScore();

function resetscore(){
    localStorage.removeItem('local');
    sessionStorage.removeItem('session');
    displayLocalScore();
}

const goCounterButton = document.getElementById('go');
const resetCounterButton = document.getElementById('reset');

goCounterButton.addEventListener('click',updateScore);
resetCounterButton.addEventListener('click',resetscore);


