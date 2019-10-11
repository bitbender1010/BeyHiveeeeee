const checkPass = document.getElementById('customCheck1');
const passId = document.getElementById('inputPassword');
checkPass.addEventListener('click',(e)=>{
    e.preventDefault();
    if(passId.type === "password"){
        passId.type === "text";
    }else{
        passId.type === "password";
    }
});

// Login a user POST Request
const api = 'localhost:3000/api/v1/user';
const loginForm = document.getElementById('formLogin');
const submitForm = document.getElementById('submitInputs');
const token = localStorage.token
if(loginForm){
    const email= document.getElementById('inputEmail').value; 
    const password = document.getElementById('inputPassword').value;
    submitForm.addEventListener('submit',(e)=>{
        e.preventDefault();
    fetch(`${api}/login`,{
    method:'POST',
    body:JSON.stringify({
        email,password
    }),
    headers: {'Content-Type': 'application/json'}

    }).then(response => response.json()).then((response)=>{
        if (response.code === 200) {
            window.localStorage.token = response.token;
            window.location.replace('welcome.html');
          } else {
            displayAlert(response.message, 3);
          }
    }).catch(err => console.log(err));
    });
}