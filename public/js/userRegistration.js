const registrationForm=document.getElementById("userRegForm");

const validate = (input, validators)=>{
    let isValid = true;
    validators.forEach(validator => {
        isValid = validator(input)
    });
    return isValid;
}

registrationForm && registrationForm.addEventListener(
    "submit",
    (event) => {
        // event.preventDefault();
        console.log("register event");
        // const regFirstName = event.target.elements["regFirstName"].value;
        // const regLastName = event.target.elements["regLastName"].value;
        const regUsername = event.target.elements["regUsername"].value;
        const regEmail = event.target.elements["regEmail"].value;
        const regPassword = event.target.elements["regPassword"].value;
        // const regConfirmPassword = event.target.elements["regConfirmPassword"].value;
        validateUsername(regUsername);
        validatePassword(regPassword);
    },

);

const usernameLengthValidator = (username) => {
    if (username.length > 2){
        return true;
    }
    else {
        throw new Error('Username must be at least 3 characters long.', { cause: "username_Length" });
    }
};

const usernameAlphanumericValidator = (username) =>{
    const regex = new RegExp("^[a-zA-Z0-9]*$");
    if (regex.test(username)){
        return true;
    }
    else{
        throw new Error('Username must contain only alphanumeric characters.', { cause: "username_Num_Letter"});
    }
}

const usernameFirstCharacterValidator = (username) =>{
    const regex = new RegExp("^[a-zA-Z]*$");
    if (regex.test(username[0])){
        return true;
    }
    else{
        throw new Error('Username must start with a letter.', { cause: "username_First_Character" });
    }
}

const validateUsername = (username)=>{

    // console.log(usernameLengthValidator(username));
    // console.log(usernameAlphanumericValidator(username));
    // console.log(usernameFirstCharacterValidator(username));
    try{
        const validators = [usernameAlphanumericValidator, usernameFirstCharacterValidator, usernameLengthValidator];
        const isValidUsername = validate(username, validators);
        // usernameElement.setCustomValidity("");
        console.log(isValidUsername);
    }
    catch(e){
        const passwordField = document.getElementById("regPassword");
        const confirmPasswordField = document.getElementById("regConfirmPassword");
        passwordField.value = "";
        confirmPasswordField.value = "";
     }

}

const passwordCharacterValidity = (password) =>{

    
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(\/*-+!@#$^&*)]).{8,}$");
    if (regex.test(password)){
        return true;
    }
    else{
        throw new Error('Password must be between 8 - 18 characters long AND contain at least 1 number, 1 capital letter, and one special character (\/*-+!@#$^&*)', { cause: "password_Valid_Error"});
    }

}

const passwordMatchValidator = (password) =>{
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password === confirmPassword){
        return true;
    }
    else{
        throw new Error('Passwords must match.', {cause: "password_mismatch"});
    }

}

const validatePassword = (password)=>{

    // console.log(usernameLengthValidator(username));
    // console.log(usernameAlphanumericValidator(username));
    // console.log(usernameFirstCharacterValidator(username));
    try{
        const validators = [passwordCharacterValidity, passwordMatchValidator];
        const isValidPassword = validate(password, validators);
        // passwordElement.setCustomValidity("");
        console.log(isValidPassword);
    }
    catch(e){
        const passwordField = document.getElementById("regPassword");
        const confirmPasswordField = document.getElementById("regConfirmPassword");
        passwordField.value = "";
        confirmPasswordField.value = "";
    }

}