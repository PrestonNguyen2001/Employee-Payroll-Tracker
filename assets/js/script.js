// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Function to capitalize first letter of a string
const capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
    const employees = [];

    // Loop to prompt for employee data
    while (true) {
      let firstName, lastName, salary;

      while (true) {
        firstName = prompt("Enter First Name:");
      // Validate if first name input contains only letters
        if (/^[a-zA-Z]+$/.test(firstName)) {
          break;
        }
        alert("Invalid input for first name. Please enter letters only.");
      }

      while (true) {
        lastName = prompt("Enter Last Name:");
      // Validate if last name input contains only letters
        if (/^[a-zA-Z]+$/.test(lastName)) {
          break;
        }
        alert("Invalid input for last name. Please enter letters only.");
      }

      // Check if the employee has already been added
      const isEmployeeExists = employees.some(employee => employee.firstName === firstName && employee.lastName === lastName);
        if (isEmployeeExists) {
            alert("Employee already added.");
            continue;
        }

      while (true) {
        const salaryInput = prompt("Enter Salary:");
        salary = parseFloat(salaryInput);
      // Validate if salary input is a number
        if (!isNaN(salary)) {
          break;
        }
        alert("Invalid input for salary. Please enter a valid number.");
      }

      
      // Creates an employee object with the user input
      const employee = {
        firstName: firstName,
        lastName: lastName,
        salary: salary
      };

      // Add the employee object to the employees array
      employees.push(employee);

      // Prompt to continue adding employees or cancel
      const continueInput = confirm("Would you like to add another employee?");

      // If the user selects cancel, the loop will break
      if (!continueInput) {
        break;
      }
    }

    // Sort the employees array by last name
    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Return the employees array
    return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  const totalSalary = employeesArray.reduce((acc, employee) => acc + employee.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;

  // Log the average salary with the appropriate formatting
  console.log(`The average salary between our ${employeesArray.length} employees is ${averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // Select a random index
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  
  // Get the random employee
  const randomEmployee = employeesArray[randomIndex];
  
  // Capitalize the first letter of the employee's first and last name
  const capitalizedFirstName = capitalizeFirstLetter(randomEmployee.firstName);
  const capitalizedLastName = capitalizeFirstLetter(randomEmployee.lastName);
  
  // Log the randomly selected employee
  console.log(`Congratulations to ${capitalizedFirstName} ${capitalizedLastName}, our random drawing winner!`);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);