let menuItemList = [
    {
        id : 1,
        name : "Chicken biryani",
        price : 250,
        category : "biryani"
    },
    {
        id : 2,
        name : "Gulab Jamun",
        price : 150,
        category : "starters"

    },
    {
        id : 3,
        name :  "Bacon rings",
        price : 180,
        category : "starters"
    },
    {
        id : 4,
        name : "Butter Naan",
        price : 60,
        category : "main"
    },
    {
        id : 5,
        name : "Veg Biryani",
        price : 300,
        category : "biryani"
    },
    {
        id : 6,
        name : "Pizza",
        price : 200,
        category : "main"    
    },
    {
        id : 7,
        name : "Paneer biryani",
        price : 250,
        category : "biryani"
    }
    
];

console.log(document.getElementsByClassName('menu-items'));

for(let i=0;i<menuItemList.length;i++){
    let menuList = document.getElementsByClassName('menu-items')[0];
    menuList.insertAdjacentHTML("beforeend",`
            <div class="item-body" id="item${menuItemList[i]['id']}" draggable=true 
            ondragstart="handleDragStart(event,${menuItemList[i]['id']})"">
                <h2 class="itemName">${menuItemList[i]['name']}</h2>
                <p class="itemPrice">${menuItemList[i]['price']}</p>
                <p class = "itemCat"><h6>${menuItemList[i]['category']}</h5></p>
            </div>`);

            console.log(document.getElementById('item1'));

}

//-- search for Menu-Items

let menuSearchTxt = document.getElementById('menuSearchTxt');
menuSearchTxt.addEventListener('input',function(){
    let inputVal = menuSearchTxt.value.toLowerCase();

    let noteCard = document.getElementsByClassName('item-body');
    let i = 0;

    Array.from(noteCard).forEach(function(e){
        let txtCard = e.getElementsByTagName('h2')[0].innerText.toLowerCase();
        if(txtCard.includes(inputVal)||menuItemList[i]['category'].toLowerCase().indexOf(inputVal)>-1){
            e.style.display="block";
        }
        else{
            e.style.display="none";
            
        }
        i++;
    
    })
})


const table = [
    {
        id : 1,
        name : "Table-1",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 2,
        name : "Table-2",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 3,
        name : "Table-3",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 4,
        name : "Table-4",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    }
    
];

for(let i=0;i<table.length;i++){
    let tableList = document.getElementsByClassName('table')[0];
    tableList.insertAdjacentHTML("beforeBegin",
            `<div class="table-body" id="table${table[i].id}"  
            onclick="orderDetails(event)">
                <h2 class="tableName">${table[i]['name']}</h2>
                <p id="table-totalPrice${table[i].id}">Total :&nbsp ${table[i]['price']}&nbsp Rs</p>
                <p id="table-totalItems${table[i].id}">No of items : ${table[i]['quantity']} </p>
            </div>`

    );
}
//----Search for Table
let tableSearchTxt = document.getElementById('tableSearchTxt');
tableSearchTxt.addEventListener('input',function(){
    let inputVal = tableSearchTxt.value.toLowerCase();

    let noteCard = document.getElementsByClassName('table-body');
    

    Array.from(noteCard).forEach(function(e){
        console.log(e);
        let txtCard = e.getElementsByTagName('h2')[0].innerText.toLowerCase();
        if(txtCard.includes(inputVal)){
            e.style.display="block";
        }
        else{
            e.style.display="none";
            
        }
    
    })

})
let tabId;
// myLocalStorageFunction();
function orderDetails(ev){
    

    document.querySelector(".table-details").style.visibility = "visible";
    document.querySelector('body').style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.getElementById(ev.target.id).style.backgroundColor="rgb(255, 204, 0,0.5)";
    document.querySelector('.tables').className += " child-events";
    let tableId = ev.target.id.match(/\d+/g); 
    console.log('this is table'+tableId);
    let header = document.getElementById('order-header');
    header.textContent = `Table-${tableId} | Order Details`;
    renderOrderItems(tableId);
    tabId = tableId;
}
//------------- Order Details-------------------

function renderOrderItems(tableId){
    console.log("this is table id "+tableId);
    if(localStorage.getItem('Table'+tabId) !== null && table[tableId-1].quantity>0){
        let htmlString = "";
        htmlString += 
            `<tr>
                <th>S.No</th>
                <th>Item</th>
                <th>Price</th>
                <th>No of servings</th>
            </tr>`;
        let i = 1;
        let a =[];

        for (const [key, value] of table[tableId-1].itemList.entries()) {
            if(i<=table[tableId-1]['itemList'].size){

                htmlString +=`
                <tr>
                    <td>${i}</td>
                    <td>${menuItemList[key-1]['name']}</td>
                    <td>${menuItemList[key-1]['price']}</td>
                    <td><input type=number id=quantity${key} class="quantity${key}" min=0  value="${value}" onchange="updateQuantity(${tableId},${key})"></td> 
                    <td><img class="trashicon" id="trashicon${key}" onclick="deleteItem('${tableId-1}',${key})" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/></td>
                </tr>`; 
                i++;


                
            }
 //------- Adding value form the Local storage -------

            var localstorage = {
                id :i-1,
                item: menuItemList[key-1]['name'],
                price: menuItemList[key-1]['price'],
                quantity : value,
                key :key
            }

            a.push(localstorage);

            localStorage.setItem('Table'+tableId, JSON.stringify(a));

            var retrievedObject = localStorage.getItem('Table'+tableId);
            var abc = JSON.parse(retrievedObject);
            console.log('retrievedObject: ', abc.length);
            console.log(abc[0].price);
            // console.log(abc[1].price);
            // console.log(abc[1].price);
            // console.log(abc[0][1]);
            // console.log(abc[0][2]);

            


           
            document.getElementById("table-items").innerHTML = htmlString;
        }
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }
    else if (localStorage.getItem('Table'+tabId) !== null){
        myLocalStorageFunction();
    }else{
        document.getElementById("table-items").innerHTML = `<div style="margin : 22px 159px;font-size:25px">Order&nbsp;list&nbsp;is&nbsp;empty</div>`;
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }
    document.querySelector('.closeButton').id = tableId;
}
function closeTableDetails(ev){
    document.querySelector(".table-details").style.visibility = "hidden";
    document.querySelector('.tables').className = "tables";
    document.querySelector('body').style.backgroundColor = "white";
    document.getElementById(`table${ev.target.id}`).style.backgroundColor="inherit";
}






// -------------------------------------------------Drag&DropFunction-----------------------------------------


//document.body.addEventListener('dragstart', handleDragStart);
document.body.addEventListener('drop', handleDrop);
document.body.addEventListener('dragover', handleOver);


var selectedItemId;
function handleDragStart(ev,id){
    selectedItemId = id;
    let obj = ev.target;
    if(!obj.closest('draggable')) return;
    ev.dataTransfer.setData("text", ev.target.id);
    ev.preventDefault();
}

function handleOver(ev){
    ev.preventDefault();
}

function handleDrop(ev){

 let drop = ev.target;
ev.preventDefault();
let tableId = ev.target.id.match(/\d+/g);
let items = table[tableId-1].itemList;
console.log(table[tableId-1].itemList.size);
if(items.size > 0 && items.get(selectedItemId)!=undefined){
    items.set(selectedItemId,items.get(selectedItemId)+parseInt(1));
}else{
    items.set(selectedItemId,1);
}
table[tableId-1]['price'] += menuItemList[selectedItemId-1]['price'];
table[tableId-1]['quantity']++
document.getElementById(ev.target.id).style.backgroundColor="inherit";
document.getElementById("table-totalPrice"+tableId).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
document.getElementById("table-totalItems"+tableId).textContent = "No of items :" +table[tableId-1]['quantity'];
}

function deleteItem(tableId,itemId){
    var count = table[tableId].itemList.get(itemId);
    price = menuItemList[itemId-1].price;
    table[tableId].price -= price * count;
    table[tableId].quantity -= count;
    table[tableId].itemList.delete(itemId);
    document.getElementById("table-totalPrice"+(parseInt(tableId)+1)).textContent = "Total : " + table[tableId]['price']+" Rs "; 
    document.getElementById("table-totalItems"+(parseInt(tableId)+1)).textContent = "No of items :" +table[tableId]['quantity'];
    renderOrderItems(parseInt(tableId)+1);
}

function updateQuantity(tableId,itemId){
    let newQuantity = document.querySelector(".quantity"+itemId).value;
    if(newQuantity==0){
        if (confirm("Want to remove from the list")) {
            deleteItem(tableId-1,itemId);
          } else {
            return;
          }
        
    }
    else{
        let oldQuantity = table[tableId-1].itemList.get(itemId);
        let price = menuItemList[itemId-1].price;
        let oldPrice = (oldQuantity*price);
        let newPrice = (newQuantity*price);
        table[tableId-1].price += (newPrice-oldPrice);
        table[tableId-1].quantity += (newQuantity - oldQuantity);
        table[tableId-1].itemList.set(itemId,newQuantity);
        

    }

    document.getElementById("table-totalPrice"+(parseInt(tableId))).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
    document.getElementById("table-totalItems"+(parseInt(tableId))).textContent = "No of items :" +table[tableId-1]['quantity'];
    renderOrderItems(parseInt(tableId));
    
}

function generateBill(){
    // let idv = ev.target.id;
    console.log("this is Table"+tabId);
    // 
    
    let bill = document.getElementById("total-price").textContent;
    alert(`Total Bill : ${bill}`);

     var retrievedObject = localStorage.getItem('Table'+tabId);
     var contentList = JSON.parse(retrievedObject);
    for(let a = 0;a<contentList.length;a++){
         deleteItem(tabId-1,contentList[a].key);
    }
    localStorage.removeItem('Table'+tabId);
    
    
}


function myLocalStorageFunction(){

    console.log("myLocalStorageFunction");
    for(let i = 0; i<4;i++){
        var tid;
        var retrievedObject = localStorage.getItem('Table'+(i+1));
        var contentList = JSON.parse(retrievedObject);
        let htmlString = "";
        if(localStorage.getItem('Table'+(i+1)) !== null){
            console.log("inside asd");
            htmlString += 
                `<tr>
                    <th>S.No</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>No of servings</th>
                </tr>`;
            
            for(let a = 0;a<contentList.length;a++){
                    htmlString +=
                    `
                    <tr>
                        <td>${contentList[a].id}</td>
                        <td>${contentList[a].item}</td>
                        <td>${contentList[a].price}</td>
                        <td><input type=number id=quantity${contentList[a].key} class="quantity${contentList[a].key}" min=0  value="${contentList[a].quantity}" onchange="updateQuantity(${i+1},${contentList[a].key})"></td> 
                        <td><img class="trashicon" id="trashicon${contentList[a].key}" onclick="deleteItem('${i}',${contentList[a].key})" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/></td>
                    </tr>`; 
                     

                document.getElementById("table-items").innerHTML = htmlString;
            }
            document.querySelector('#total-price').textContent = table[i].price;
           
        }
        
        document.querySelector('.closeButton').id = i;
    }
}

