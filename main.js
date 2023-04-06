
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
// const userList = document.querySelector('#users');
var i = 1 ;
// // Listen for form submit
myForm.addEventListener('submit', onSubmit);

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

    let ob = {
      name : nameInput.value ,
      email : emailInput.value
    }

    let obs = JSON.stringify(ob);
    localStorage.setItem(`person `+i ,obs);
    
    let item = localStorage.getItem(`person `+i);
    let obd = JSON.parse(item);
    console.log(item);
    //userList.appendChild(li);
    i = i+1 ;
    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}