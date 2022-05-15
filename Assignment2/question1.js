

 function getData(uId) {
     return new Promise((resolve,reject)=>
    setTimeout(() => {
    console.log("Fetched the data!");
    resolve( "skc@gmail.com");
    reject("unable to fetch");
    }, 4000));
}
    
async function getDetails(){    
    console.log("start");
    var email =await getData("skc").catch((error)=>
        console.log(error));
    console.log("Email id of the user id is: " + email);
    console.log("end");
}

getDetails();