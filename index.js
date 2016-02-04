//Order of operations
var inquirer = require("inquirer");
//opening of program, next menu will stem from coice (search or create)

var usersArray = []; //will fill with user objects
var newUserAddress = [];
var mainMenuQuestions = [{
    name: "MenuChoices", //static
    message: "What do you want to do? (choose an option with arrow keys + [enter])",
    type: "list",

    choices: [{
        name: 'create new user',
        value: 'create'

    }, {
        name: 'search user',
        value: 'search'

    }, {
        name: 'exit address book',
        value: 'exit'
    }]
}];

function checkTrue(type, field) {

    return function(answers) {
        if (answers[type].indexOf(field) > -1) {
            return true;
        }
        else {
            return false;
        }
    }
}

var newEntryQuestions = [

    // {
    //     name: 'first_name',
       
    //     message: "FIRST",
    //     type: "confirm"
    // }, 
    {
        name: 'last_name',
        value: 'lastName',
        message: "LAST NAME"
    }, {
        name: 'birthday',
        message: "BIRTHDAY"
    }, {
        name: 'typeof_address',
        message: "ADDRESSTYPES",
        type: "checkbox",
        choices: [{
            name: 'home'
        }, {
            name: 'work'
        }, {
            name: 'school'
        }]
    }, {
        name: 'home_address_ln1',
        message: "First line of the home address.",
        when: checkTrue("typeof_address", "home"),
    },

    {
        name: 'home_address_ln2',
        message: "Second line of the home address. (Optional)",
        when: checkTrue("typeof_address", "home")
    },

    {
        name: 'home_address_city',
        message: "City of home address",
        when: checkTrue("typeof_address", "home"),
    },

    {
        name: 'home_address_province',
        message: "Province of home address",
        when: checkTrue("typeof_address", "home")
    },

    {
        name: 'work_address_ln1',
        message: "First line of the work address.",
        when: checkTrue("typeof_address", "work")
    },

    {
        name: 'work_address_province',
        message: "Province of work address",
        when: function(answers) {
            var found = false;
            answers.typeof_address.forEach(function(type) {

                if (type === "work") {
                    //console.log("IT WAS ASKED!!!!")
                    found = true;
                }
            })
            return found;

        }
    },

    {
        name: 'work_address',
        message: "First line of the work address.",
        when: function(answers) {
            return answers.typeof_address === 'work';
        }
    }, {
        name: 'school_address',
        message: "First line of the school address.",
        when: function(answers) {
            return answers.typeof_address === 'school';
        }
    }, {
        name: 'typeof_phone',
        message: "PHONETYPES",
        type: "checkbox",
        choices: [{
            name: 'home'
        }, {
            name: 'work'
        }, {
            name: 'school'
        }]
    }, {
        name: 'typeof_email',
        message: "EMAILTYPES",
        type: "checkbox",
        choices: [{
            name: 'home'
        }, {
            name: 'work'
        }, {
            name: 'school'
        }]
    }
];

var addressQuestions = [{
    name: 'address_line1',
    message: "ADDRESSLINE1"
}, {
    name: 'address_line2',
    message: "ADDRESSLINE2"
}];

function mainMenu() {
    // console.log(mainMenuQuestions);
    inquirer.prompt(mainMenuQuestions, function(answers) {
        var user = {};
        //console.log(answers);
        if (answers.MenuChoices === 'search') {
            // console.log("you want to search");

            //funciton searchEntries()
        }
        else if (answers.MenuChoices === 'create') {
            
            // console.log(answers);
            console.log(newEntryQuestions);

            inquirer.prompt(newEntryQuestions, function(answers) {
                user = answers;
                // var addresses = [];
                // answers.typeof_address.forEach(function(type){
                //     addresses.push({name: type, message: type + " address"})
                // })
                // inquirer.prompt(addresses, function(answers) {
                //     console.log(answers)
                //     user.homeAddress = answers.home
                //     user.workAddress = answers.work
                //     user.schoolAddress = answers.school
                //     console.log(user);
                // })


                // if(answers.newEntryQuestions.typeof_address === 'home') {
                //         inquirer.prompt(addressQuestions, function(answers) {
                //             var newUserAddress = answers;
                //         })
                // }
                console.log(user);
                // var newUser = answers;     [fn,lan,b [ad1], [ad2]]
                usersArray.push(user);
            })
            console.log(usersArray);
            //function newEntry()
        }
        else if (answers.MenuChoices === 'exit') {
            console.log("you want to get out");
            // process.exit(0);
        }


    });
}




mainMenu(); // must come after any variable that it uses has been defined