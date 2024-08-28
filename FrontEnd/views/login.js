async function handleFormSubmit(event){

    try{
        event.preventDefault();

        const userDetails = {
            emailId : event.target.email.value,
            password: event.target.password.value
        }
        // console.log(userDetails+ "Before reaching Backend");
        

        // Send POST request to save expense in the database
        let response = await axios.post("http://localhost:3000/users/login", userDetails);
        console.log(response);
        alert("userLoggedin Successfully");
    }
    catch (error) {
        // Log error message
        if (error.response && error.response.status === 400) {
            console.error("Error 400: Bad Request. Check the input data.", error.response.data);
            // Display a user-friendly message
            alert("Login failed: Please check your email and password.");
        } else {
            console.error("An unexpected error occurred:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    }
}