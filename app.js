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
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
      getDescendents(person, people);
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
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

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
    let trait = promptFor("What criteria would like to search for? Choose gender, age, height, weight, eyecolor, occupation.", chars);
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


 let gender = promptFor("Please enter a gender. male or female", chars);


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

  let height = promptFor("Please enter a height in inches", chars).parseInt();


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


  let weight = promptFor("Please enter a weight in pounds", chars).parseInt();

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
  let age = parseInt(promptFor("Please enter an age", chars));

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
  let eyeColor = promptFor("Please enter an eyecolor, choose from blue, black, brown, hazel, or green", chars)

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
  let occupation = promptFor("Please enter an occupation", chars)

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
  let response = promptFor("Would you like to search using another criteria? yes or no", chars)

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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
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
function selectFromResults(results){
  alert("Please select an individual");
 let result = searchByName(results);
 return result;
}

function getDescendents(selected, people){
  let descendants;
  let children = getChildren(people);
  descendants = children.filter(function(child){
    if(child.parents[0].id === selected.id || child.parents[1].id === selected.id){
      return true;
    }
    else{
      return false;
    }
  })
  return descendants;
}

function getChildren(people){
  let children;

  children = people.filter(function(person){
    if(person.parents.length >0){
      return true;
    }
    else{
      return false;
    }
  })
  return children;
}

