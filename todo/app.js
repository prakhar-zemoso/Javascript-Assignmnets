var dragItem = document.getElementById("dragElement");
var dropLoc = document.getElementById("dropLocation");

//This event will be fired when the user starts dragging the item 
dragItem.ondragstart = function(evt){
    // .ondragstart = function(evt) and ondrop = function(evt) there sholu be link between the two events it
    //is possible between the html drag and 
//html API. (html5index.org - 1)DATAtRANSFER 2 DataTransferItem, DataTransferItemList, DragEvent

    //linking the ondragSart by labeling it  as key and selecting the id given in the Htlm tag which is select
    evt.dataTransfer.setData('key','dragElemnt');
   // we can also use this as this will follow the 
    evt.dataTransfer.setData('key',evt.target.id);



    console.log('its draging');
}


//this event will be fired when an element selection is been dragged over to the valid drop location
dropLoc.ondragover= function(evt){
    //remove the default setting 
    evt.preventDefault();

}

//This will be fired when u drop the dragged item on the drop location.
// also ir will not bt by default added to the file so we have to add this manually in HTML 


//all the ondrop event methods and properties will be transfered to the 'evt' prarameter presnt in function as a variable   

dropLoc.ondrop = function(evt){
    evt.preventDefault();

    //linking the ondrop by labeling it  as key

    var dropItem = evt.dataTransfer.getData('key');
    console.log(evt);
    var myevent = document.getElementsById(dropItem);
    console.log(myevent);
    var newElement = document.createElement('img');
    newElement.src = myevent.src;
    dropLoc.appendChild(newElement);

}



//-------------------------------------------------------------------------------------------------------------

