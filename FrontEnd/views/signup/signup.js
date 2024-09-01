async function handleFormSubmit(event){

    try{
        event.preventDefault();

        const userDetails = {
            userName: event.target.username.value,
            emailId : event.target.email.value,
            password: event.target.password.value
        }
        // console.log(userDetails);
        

        // Send POST request to save expense in the database
        let response = await axios.post("http://localhost:3000/users/signup", userDetails);
        console.log(response);
        localStorage.setItem('token', response.data.token);
        
        
        
        alert("User Signed In Successfully");
    }
    catch (error){
        console.log("Error : "+error); 
    }
}
