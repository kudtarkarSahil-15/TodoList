

// let myAdd = document.getElementById('addBtn');
let myTableBody = document.getElementById('tBodyId');
let myShowModel = document.getElementById('showModelId'); 
// let myClearList = document.getElementById('clearListId');
let myShowDesModel = document.getElementById('showDesModelId');

let myModelTit = document.getElementById('modelTitleId');
let myModelDesc = document.getElementById('modelDescriptionId');



//Add item into a Todo 
function addItemFn() 
{
        console.log('add Fn.....');
        myTit = document.getElementById('titleId').value;
        myDes = document.getElementById('descriptionId').value;
        
        if(localStorage.getItem('myItem') == null)
        {
            itemArray = [];
            itemArray.push([myTit, myDes]);
            localStorage.setItem('myItem', JSON.stringify(itemArray));
        } 
        else 
        {
            itemArrayStr = localStorage.getItem('myItem');
            itemArray = JSON.parse(itemArrayStr);
            itemArray.push([myTit, myDes]);
            localStorage.setItem('myItem', JSON.stringify(itemArray));
        }

        reActivity();
}

//refresh
function reActivity()
{
    console.log("refresh activity call");
    // calling back todoitems activity
    if(localStorage.getItem('myItem') == null) 
    {
        itemArray = [];
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    else 
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);
    }

    rowStr();
}

// row structure
function rowStr() 
{
    console.log("row structure call");
    let str="";
    itemArray.forEach((element,index) => {
        str += `
        <tr>
        <th scope="row">${index +1}</th>
        <td><center>${element[0]}</center></td>
       
        <td><center>
           <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#showDesModelId" onclick="viewDescFn(${index})">View</button>

          <button class="btn btn-sm btn-primary" onclick= "deleteFn(${index})" >Done</button>
        </center></td>
        </tr>
        `;
    });

    myTableBody.innerHTML = str;
}

// on click add Fn 
// myAdd.addEventListener('click', function() {
//     addItemFn();
// });

// refresh activity call
reActivity();


//on click delete Fn
function deleteFn(itemIndex) {
    console.log("item Deleted");
    if(confirm("Task completed.."))
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);

        itemArray.splice(itemIndex, 1);
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    reActivity();
}

function clearListFn(itemIndex) {
    console.log("clearing list");
    if(confirm("Do u really want to clear a whole list..?"))
    {
        itemArrayStr = localStorage.getItem('myItem');
        itemArray = JSON.parse(itemArrayStr);
        itemArray.splice(itemIndex, itemArray.length);
        localStorage.setItem('myItem', JSON.stringify(itemArray));
    }
    reActivity();
}


function viewDescFn(myViewIndex)
{
    console.log("view desc call");
    let strTit="";
    let strDesc="";
    itemArray.forEach((element,index) => {
        
        if(index == myViewIndex) 
        {
            strTit += ` 
            <h3></h3><center>${element[0]}</center></h3>  `;
            
            strDesc += `          
            <ul>${element[1]}</ul>
            `;
        }
        
    });
    
    myModelTit.innerHTML = strTit;
    myModelDesc.innerHTML = strDesc;
}



