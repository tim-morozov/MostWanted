"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
      let family = findFamily(person, people);
      displayFamily(family);

    break;
    case "descendants":
    // TODO: get person's descendants
     let descendants = findDescendants(person, people);
      displayPeople(descendants);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", string);
  let lastName = promptFor("What is the person's last name?", string);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  foundPerson = foundPerson[0];
  return foundPerson;
}

function searchByTraits(people){
    let trait = promptFor("What criteria would like to search for? Choose gender, age, height, weight, eyecolor, occupation.", traits).toLowerCase();
    let searchResults;
    let selected;
    switch(trait){
      case "gender":
       searchResults = searchByGender(people);
      break;

      case "age":
        searchResults = searchByAge(people);
      break;

      case "height":
        searchResults = searchByHeight(people);
      break;

      case "weight":
        searchResults = searchByWeight(people);
      break;
      
      case "eyecolor":
        searchResults = searchByEyeColor(people);
      break;

      case "occupation":
        searchResults = searchByOccupation(people);
      break;
    }

   checkSearch(searchResults);
   selected = selectFromResults(searchResults);
   mainMenu(selected, people);
}

function searchByGender(people){


 let gender = promptFor("Please enter a gender. male or female", genders).toLowerCase();


 let foundPerson = people.filter(function(person){
   if(person.gender === gender){
     return true;
   }
   else{
     return false;
   }
 })
 return foundPerson;
}

function searchByHeight(people){

  let height = parseInt(promptFor("Please enter a height in inches", int));


  let foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){


  let weight = parseInt(promptFor("Please enter a weight in pounds", int));

  let foundPerson = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByAge(people){
  let age = parseInt(promptFor("Please enter an age", int));

  let personAge = people.map(function(person) {
      person.age = getAge(person.dob)
  })

  let foundPerson = people.filter(function(person) {
      if(person.age === age) {
        return true;
      }
      else {
        return false;
      }
  })

  return foundPerson;
    

}

function searchByEyeColor(people){
  let eyeColor = promptFor("Please enter an eyecolor, choose from blue, black, brown, hazel, or green", color).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("Please enter an occupation", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function checkSearch(searchResults){
  let response = promptFor("Would you like to search using another criteria? yes or no", yesNo);

  switch(response){

    case "yes":
      searchByTraits(searchResults);
    break;

    case "no":
      displayPeople(searchResults);
    break;
  }
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date Of Birth: " + person.dob + "\n";
  personInfo += "Age: " + getAge(person.dob) + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass into promptFor to validate occupation method user input
function chars(input){
  let userInput = input.toLowerCase();
  if(userInput === "") {
    alert("Field can not be empty, please enter an occupation");
    return false;

  }
  return true; 
}

//helper function to pass into promptFor to validate searchByName input
function string(input) { 
  
  if(input === "") {
    alert("Must type a name");
    return false;
  }

  else if (input[0] === input[0].toLowerCase()) {
    alert("Please capitalize the beginning letter");
    return false;
  }

  return true;
}

//helper function to pass into promptFor to validate integers
function int(input) {
  if (isNaN(input) || input < 1 || input > 500) {
    alert("Please enter a valid number");
    return false;
  }
  return true;
}

//helper function to pass into promptFor to validate searchByGender input
function genders(input) {
    if (input.toLowerCase() == "female" || input.toLowerCase() == "male") {
      return true;
    }

    else {
      alert("Please enter male or female");
      return false;
    }
}

//helper function to pass into promptFor to validate searchByTraits input
function traits(input) {
  let trait = input.toLowerCase();
  if (trait == "gender" || trait == "age" || trait == "height" || trait == "weight" || trait == "eyecolor" || trait == "occupation") {
    return true;
  }

  else {
     alert("Please enter a valid option");
    return false;
  }
    
}

//helper function to pass into the promptFor to validate searchByEyeColor input
function color(input) {
  let eyes = input.toLowerCase();
  if (eyes == "blue" || eyes == "black" || eyes == "brown" || eyes == "hazel" || eyes == "green") {
    return true;
  }
  
  else {
    alert("Please enter a valid option");
    return false;
  }
}

function getAge(dob){
  let today = new Date();
  let birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;

  }

  return age;
}

function findFamily(person, people) {

    let personParents = findParents(person, people);
    let personSiblings = findSiblings(person, people);
    let personSpouse = findSpouse(person, people);


  let foundPerson = personParents.concat(personSiblings).concat(personSpouse);

  return foundPerson;

}

function findParents(person, people){

  let parents = people.filter(function(individual) {
    if (individual.id === person.parents[0] || individual.id === person.parents[1]) {
      return true;
    }

    else {
      return false;
    }
  })

  parents.map(function(individual) {
    if(individual.gender === "female") {
      individual.role = "Mother";
    }

    else {
      individual.role = "Father"
    }

  })

  return parents;

}

function findSiblings(person, people) {

  let siblings = people.filter(function(member) {
    if (person.id === member.id) {
      return false;
    }
    if (person.parents[0] === member.parents[0] || person.parents[1] === member.parents[0] || person.parents[0] === member.parents[1] || person.parents[1] === member.parents[1]) {
      return true;
    }

    else {
      return false;
    }
  })

  siblings.map(function(individual) {
    if(individual.gender === "female") {
      individual.role = "Sister";
    }

    else {
      individual.role = "Brother"
    }

  })

  return siblings;
}

function findSpouse(person, people) {

  let findSpouse = people.filter(function(spouse) {
    if (person.currentSpouse === spouse.id) {
      if(spouse.gender === "female") {
        spouse.role = "Wife";
      }

      else {
        spouse.role = "Husband";
      }
      return true;
    }

    else {
      return false;
    }
  })

  return findSpouse;

}



function selectFromResults(results){
  alert("Please select an individual");
 let result = searchByName(results);
 return result;
}


function displayFamily(family) {
  alert(family.map(function(person){
    return person.role + ": " + person.firstName + " " + person.lastName;
  }).join("\n"));
}


function findDescendants(selected, people){
  let children = people.filter(function(person){
      if(person.parents[0] === selected.id || person.parents[1] === selected.id){
        return true;
      }
      else{
        return false;
      }
    })
  return children;
}

function getDescendants(selected, people){
 let descendants = [];
descendants = getDescendents(selected, people);

 for(let i = 0; i < descendants.length; i++){
 let grandchildren = getDescendents(descendants[i], people);
   if(grandchildren.length > 0){
    descendants = descendants.concat(grandchildren);
   }
 }
 return descendants;
}

