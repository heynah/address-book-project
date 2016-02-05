//Order of operations
var inquirer = require("inquirer");
//opening of program, next menu will stem from coice (search or create)
var idCreator = 0;
var addressBook = []; //will fill with user objects

// var searchResult = {
//     first_name: 'jane',
//     last_name: 'stay',
//     home_address_ln1: 'she lives',
//     id: 4,
//     typeof_address: ["home"]
// }; //dummy search result
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

function getNewEntryQuestions(defaultAnswers) {
    if (!defaultAnswers) {
        defaultAnswers = {};
    }
    var newEntryQuestions = [

        {
            name: 'first_name',
            message: "FIRST",
            default: defaultAnswers.first_name
        }, {
            name: 'last_name',
            message: "LAST NAME",
            default: defaultAnswers.last_name
        }, {
            name: 'birthday',
            message: "BIRTHDAY",
            default: defaultAnswers.birthday
        }, {
            name: 'typeof_address',
            message: "ADDRESSTYPES",
            type: "checkbox",
            choices: [{
                name: 'home'
            }, {
                name: 'work'
            }, {
                name: 'other'
            }],
            default: defaultAnswers.typeof_address
        }, {
            name: 'home_address_ln1',
            message: "First line of the home address.",
            default: defaultAnswers.home_address_ln1,
            when: checkTrue("typeof_address", "home"),
        },

        {
            name: 'home_address_ln2',
            message: "Second line of the home address. (Optional)",
            default: defaultAnswers.home_address_ln2,
            when: checkTrue("typeof_address", "home")
        },

        {
            name: 'home_address_city',
            message: "City of home address",
            default: defaultAnswers.home_address_city,
            when: checkTrue("typeof_address", "home"),
        },

        {
            name: 'home_address_province',
            message: "Province of home address",
            default: defaultAnswers.home_address_province,
            when: checkTrue("typeof_address", "home")
        },

        {
            name: 'work_address_ln1',
            message: "First line of the work address.",
            default: defaultAnswers.work_address_ln1,
            when: checkTrue("typeof_address", "work")
        }, {
            name: 'work_address_ln2',
            message: "Second line of the work address. (Optional)",
            default: defaultAnswers.work_address_ln2,
            when: checkTrue("typeof_address", "work")
        },

        {
            name: 'work_address_city',
            message: "City of home address",
            default: defaultAnswers.work_address_city,
            when: checkTrue("typeof_address", "work"),
        }, {
            name: 'work_address_province',
            message: "Province of work address",
            default: defaultAnswers.work_address_province,
            when: checkTrue("typeof_address", "work")
        },

        {
            name: 'other_address_ln1',
            message: "First line of the other address.",
            default: defaultAnswers.other_address_ln1,
            when: checkTrue("typeof_address", "other")
        }, {
            name: 'other_address_ln2',
            message: "Second line of the other address. (Optional)",
            default: defaultAnswers.other_address_ln2,
            when: checkTrue("typeof_address", "other")
        },

        {
            name: 'other_address_city',
            message: "City of other address",
            default: defaultAnswers.other_address_city,
            when: checkTrue("typeof_address", "other"),
        }, {
            name: 'other_address_province',
            message: "Province of other address",
            default: defaultAnswers.other_address_province,
            when: checkTrue("typeof_address", "other")
        },
        {
            name: 'typeof_phone',
            message: "PHONETYPES",
            type: "checkbox",
            choices: [{
                name: 'mobile'
            }, {
                name: 'home'
            }, {
                name: 'work'
            }, {
                name: 'alternate'
            }],
            default: defaultAnswers.typeof_phone
        }, 
        {
            name: 'mobile_phone',
            message: "Mobile phone number",
            default: defaultAnswers.mobile_phone,
            when: checkTrue("typeof_phone", "mobile")
        }, 
        {
            name: 'home_phone',
            message: "Home phone number",
            default: defaultAnswers.home_phone,
            when: checkTrue("typeof_phone", "home")
        }, 
        {
            name: 'work_phone',
            message: "Work phone number",
            default: defaultAnswers.work_phone,
            when: checkTrue("typeof_phone", "work")
        }, 
        {
            name: 'alt_phone',
            message: "Alternate phone number",
            default: defaultAnswers.alt_phone,
            when: checkTrue("typeof_phone", "alternate")
        }, 
        {
            name: 'typeof_email',
            message: "EMAILTYPES",
            type: "checkbox",
            choices: [{
                name: 'home'
            }, {
                name: 'work'
            }, {
                name: 'other'
            }],
            default: defaultAnswers.typeof_email
        }, 
        {
            name: 'home_email',
            message: "Email (home)",
            default: defaultAnswers.home,
            when: checkTrue("typeof_email", "home")
        }, {
            name: 'work_email',
            message: "Email (work)",
            default: defaultAnswers.work,
            when: checkTrue("typeof_email", "work")
        }, {
            name: 'other_email',
            message: "Email (other)",
            default: defaultAnswers.work,
            when: checkTrue("typeof_email", "other")
        },
    ];
    
    return newEntryQuestions;
}

function mainMenu() {
    // console.log(mainMenuQuestions);
    function input() {
        inquirer.prompt(mainMenuQuestions, function(answers) {
            console.log(answers)
            var user = {};

            //console.log(answers);
            if (answers.MenuChoices === 'search') {

            } else if (answers.MenuChoices === 'create') {
                // console.log(answers);
                //console.log(newEntryQuestions);
                
                inquirer.prompt(getNewEntryQuestions(), function(answers) {
                    
                    answers.id = idCreator++;
                    user = answers;
                    // console.log(user);
                    addressBook.push(user);
                    console.log(addressBook)
                    input()
                })
            } else if (answers.MenuChoices === 'exit') {
            console.log("you want to get out");
            // process.exit(0);
            }
            // console.log("you want to search");
            //funciton searchEntries()
        })
    }
    input()
}

mainMenu(); // must come after any variable that it uses has been defined