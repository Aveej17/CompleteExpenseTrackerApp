async function handleFormSubmit(event) {  
    try {
        event.preventDefault();
  
        const expenseDetails = {
            amount: event.target.amount.value,
            category: event.target.category.value,
            description: event.target.description.value,
        };

        const token = localStorage.getItem('token');
        

        // Check if token is available
        if (!token) {
            alert("No token found. Please login again.");
            return;
        }
        
        
        // Send POST request to save expense in the database
        let response = await axios.post("http://localhost:3000/expenses/create", expenseDetails, {headers: {
            Authorization: 'Bearer ' + token}
        });
  
        // Add the new expense details to the list
        addExpenseToList(response.data);
  
        // Clear the form fields
        event.target.amount.value = "";
        event.target.category.value = "";
        event.target.description.value = "";
    } catch (error) {
        console.error("Error adding expense:", error);
    }
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch existing expenses from the server

        const token = localStorage.getItem('token');
        let response = await axios.get("http://localhost:3000/expenses/get", {headers: {
            Authorization: 'Bearer ' + token}
        });
        
        // console.log(response);
        // console.log(response.data);
        
        // Display each expense on the screen
        if(response.data.length>0){
            response.data.forEach(expense => {
                addExpenseToList(expense);
            }
        );
        }
    } catch (error) {
        console.error("Error loading expenses:", error);
    }
  });
  
  function addExpenseToList(expenseDetails) {
    const listItem = document.createElement('li');
   
    listItem.textContent = `${expenseDetails.amount} - ${expenseDetails.category} - ${expenseDetails.description}`;
  
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
   
    deleteButton.addEventListener('click', async ()=> {
        try {

            const token = localStorage.getItem('token');

            // Send DELETE request to remove expense from the database
            await axios.delete(`http://localhost:3000/expenses/delete/${expenseDetails.id}`, {headers: {
            Authorization: 'Bearer ' + token}
        });
  
            // Remove the expense from the UI
            listItem.remove();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    });
    listItem.appendChild(deleteButton);
  
    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Expense';
  
    editButton.addEventListener('click', async ()=> {
  
        // Remove the expense from the list temporarily
        listItem.remove();
        
        // Populate the form fields with the current expense details for editing
        document.getElementById("amount").value = expenseDetails.amount;
        document.getElementById("description").value = expenseDetails.description;
        document.getElementById("category").value = expenseDetails.category;
        
        const token = localStorage.getItem('token');

        await axios.delete(`http://localhost:3000/expenses/delete/${expenseDetails.id}`, {headers: {
            Authorization: 'Bearer ' + token}
        });
        
    });
    listItem.appendChild(editButton);
  
    const ul = document.getElementById('expenseList');
    ul.appendChild(listItem);
  }