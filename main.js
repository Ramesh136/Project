
// MANIPULATING THE DOM
// const ul = document.querySelector('.items');
// // ul.remove();
// // ul.lastElementChild.remove();
// ul.firstElementChild.textContent = "HELLO"
// ul.firstElementChild.style.color = 'green';
// ul.children[1].style.color = 'red';
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>';
const btn = document.querySelector('.btn');

// // btn.style.background = 'red';


// // EVENTS

//Mouse Event
// btn.addEventListener('mouseover', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = 'yellow';
//   //document.querySelector('body').classList.add('bg-dark');
//   //ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });


// btn.addEventListener('mouseover', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = '#ccc';
//   document.querySelector('body').classList.add('bg-dark');
//  // ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });

// btn.addEventListener('mouseout', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = 'black';
//   document.querySelector('body').classList.add('bg-dark');
//  // ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });




// // Keyboard Event
// const nameInput = document.querySelector('#name');
// nameInput.addEventListener('input', e => {
//   document.querySelector('.container').append(nameInput.value);
// });


// // USER FORM SCRIPT

// // Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
var i = 1 ;
// // Listen for form submit
myForm.addEventListener('submit', onSubmit);
userList.addEventListener('click', removeItem);

window.addEventListener("DOMContentLoaded" , loaData)

function loaData(){
  axios.get("https://crudcrud.com/api/19713b2a350d4081a4a905163161f8c1/userList")
  .then((response)=>{
    response.data.forEach(element => {
      var li = document.createElement('li');
      var text = element.name+","+element.email;
      console.log(element)
      // Add class
      li.className = 'list-group-item';
      // Add text node with input value
      li.appendChild(document.createTextNode(text));
      userList.appendChild(li);
    });
  })
}

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');
    const text = nameInput.value+","+emailInput.value;

    // Add class
    li.className = 'list-group-item';
    // Add text node with input value
    li.appendChild(document.createTextNode(text));
  
    // Create del button element
    var deleteBtn = document.createElement('button');
  
    // Add classes to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  
    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));

     // Append button to li
    li.appendChild(deleteBtn);


    var editBtn = document.createElement('button');
  
    // Add classes to del button
    editBtn.className = 'btn btn-danger btn-sm float-right edit';
  
    // Append text node
    editBtn.appendChild(document.createTextNode('edit'));

     // Append button to li
    li.appendChild(editBtn);
  // Append li to list
    userList.appendChild(li);

    let ob = {
      name : nameInput.value ,
      email : emailInput.value
    }

    let obs = JSON.stringify(ob);
    localStorage.setItem(nameInput.value  ,obs);

    axios.post("https://crudcrud.com/api/19713b2a350d4081a4a905163161f8c1/userList" , {
      name : nameInput.value ,
      email : emailInput.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    let item = localStorage.getItem(nameInput.value );
    let obd = JSON.parse(item);
  
    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}


function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      console.log(li.firstChild);
      var tt = li.firstChild.textContent.split(',')[0];
      console.log(tt);

      localStorage.removeItem(tt);
      userList.removeChild(li);
    }
  }

  else if(e.target.classList.contains('edit')){
    
      var li = e.target.parentElement;
      console.log(li.firstChild);
      var tt = li.firstChild.textContent.split(',')[0];
      console.log(tt);

      nameInput.value = li.firstChild.textContent.split(',')[0];
      emailInput.value = li.firstChild.textContent.split(',')[1];

      localStorage.removeItem(tt);
      userList.removeChild(li);

      
    
  }
}
