async function handleFormSubmit(event) {  
    try {
        event.preventDefault();
  
        const expenseDetails = {
            amount: event.target.amount.value,
            category: event.target.category.value,
            description: event.target.description.value,
        };
  
        // Send POST request to save expense in the database
        let response = await axios.post("http://localhost:3000/expenses/create", expenseDetails);
  
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
        let response = await axios.get("http://localhost:3000/expenses/get");
        // console.log(response);
        
  
        // Display each expense on the screen
        response.data.forEach(expense => {
            addExpenseToList(expense);
        });
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
    // deleteButton.className = 'btn btn-danger btn-sm ms-2';
    deleteButton.addEventListener('click', async ()=> {
        try {
            // Send DELETE request to remove expense from the database
            await axios.delete(`http://localhost:3000/expenses/delete/${expenseDetails.id}`);
  
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
    // editButton.className = 'btn btn-primary btn-sm ms-2';
    editButton.addEventListener('click', async ()=> {
  
        // Remove the expense from the list temporarily
        listItem.remove();
        
        // Populate the form fields with the current expense details for editing
        document.getElementById("amount").value = expenseDetails.amount;
        document.getElementById("description").value = expenseDetails.description;
        document.getElementById("category").value = expenseDetails.category;
  

        await axios.delete(`http://localhost:3000/expenses/delete/${expenseDetails.id}`);
        
    });
    listItem.appendChild(editButton);
  
    const ul = document.getElementById('expenseList');
    ul.appendChild(listItem);
  }