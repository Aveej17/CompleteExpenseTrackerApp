async function handleFormSubmit(event){

    try{
        event.preventDefault();

        const userDetails = {
            userName: event.target.username.value,
            emailId : event.target.email.value,
            password: event.target.password.value
        }

        // Send POST request to save expense in the database
        let response = await axios.post("http://localhost:3000/users/signup", userDetails);
        console.log(response);
    }
    catch (error){
        console.log("Error : "+error); 
    }
}
