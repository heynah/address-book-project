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
    message: "How can I help you? (choose an option with arrow keys + [enter])",
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
var searchMenu = [{
    name: 'search',
    message: 'Search by name',
    type: "input",
}];
var foundMenu = [{
    name: 'found', 
    message: 'What would you like to do now?',
    type: "list",
    choices: [{
        name: 'Edit This Contact',
        value: 'edit'
    },{
        name: 'Return to Main Menu',
        value: 'return'
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
        }, {
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
        }, {
            name: 'mobile_phone',
            message: "Mobile phone number",
            default: defaultAnswers.mobile_phone,
            when: checkTrue("typeof_phone", "mobile")
        }, {
            name: 'home_phone',
            message: "Home phone number",
            default: defaultAnswers.home_phone,
            when: checkTrue("typeof_phone", "home")
        }, {
            name: 'work_phone',
            message: "Work phone number",
            default: defaultAnswers.work_phone,
            when: checkTrue("typeof_phone", "work")
        }, {
            name: 'alt_phone',
            message: "Alternate phone number",
            default: defaultAnswers.alt_phone,
            when: checkTrue("typeof_phone", "alternate")
        }, {
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
        }, {
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
};

function searcher() {
    inquirer.prompt(searchMenu, function(answers) {
        var found = [];

        addressBook.forEach(function(contact) { /// or empty gives everybody
            if (contact.first_name === answers.search) {
                found.push(contact)
            }
            else if (contact.last_name === answers.search) {
                found.push(contact)
            }
        })

        function matches(results) {
            return [{
                name: "match",
                message: "Select someone to view, or make another choice.",
                type: "list",
                choices: function(answer) {
                    var allMatches = [];
                    allMatches = results.map(function(objEl) {
                        return {
                            name: objEl.first_name + " " + objEl.last_name,
                            value: objEl
                        }
                    })
                    allMatches.push({
                        name: "Return to Main Menu",
                        value: 'return'
                    }, {
                        name: "Try that search again.",
                        value: 'searchAgain'
                    })
                    return allMatches;
                }
            }]
        }
        // console.log(matches(found));
        inquirer.prompt(matches(found), function(answers) {
             // display table function find the match to run next function
//             var tableV = new Table({
//             chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
//              , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
//              , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
//             , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
// });
 
//         tableV.push(forEach
//             {answers}
//         );
 
        //console.log(tableV.toString());
            
            //function
            if (answers.match === "return") {
                mainMenu()
            }
            else if (answers.match === "searchAgain") {
                console.log("Here we is.")
                searcher()
            }
            else if (answers.match) {
                console.log(answers.match);
                displayCard(answers.match);
                var matchId = answers.match.id;
                inquirer.prompt(foundMenu, function(answers) {
                    
                    console.log(answers);
                    
                    if (answers.found === 'edit') {
                    console.log("makes it here, yes edit")
                    inquirer.prompt(getNewEntryQuestions(answers.match), function(answers) {
                        addressBook = addressBook.filter(function(user) {
                         
                            if (user.id !== matchId) { //so, if search result exists (has matching id), it's booted from the dataBase array and "new" (updated) pops to the end
                                return true;
                            }
                        })
                    
                      console.log("THIS IS THE PROBLEM")
                        
                        answers.id = idCreator++;
                        // user = answers;
                        // console.log(user);
                        addressBook.push(answers);
                     
                        // input()
                        mainMenu();
                        console.log(answers)
                    }) 
                    } else {
                        mainMenu();
                    }
                        
                    })

                }
            //  searcher()
        })
    })
}

//searcher();
function editUser(answers) {

    getNewEntryQuestions(answers);
    console.log("WE GOOD!")
        //mainMenu();
}

function displayCard(contact){
    var Table = require('cli-table');
    var table = new Table();
    table.push(['First Name', contact['first_name']]);
    table.push(['Last Name', contact['last_name']]);
    if(contact['birthday']){
        table.push(['Birthday', contact['birthday']]);
    }
    
    if(contact['typeof_address'].length>0){
        var homeAddressString = '';
        var workAddressString = '';
        var otherAddressString = '';
        contact['typeof_address'].forEach(function(type){
            switch(type){
                case 'home':
                    if(contact['home_address_ln2'].length>0){
                        homeAddressString = 'home:\n'+contact['home_address_ln1']+', '+contact['home_address_ln2']+'\n'+contact['home_address_city']+', '+contact['home_address_province']+'\n';
                    }
                    else{
                        homeAddressString = 'home:\n'+contact['home_address_ln1']+'\n'+contact['home_address_city']+', '+contact['home_address_province']+'\n';
                    }
                    break;
                    
                case 'work':
                    if(contact['work_address_ln2'].length>0){
                        workAddressString = 'work:\n'+contact['work_address_ln1']+', '+contact['work_address_ln2']+'\n'+contact['work_address_city']+', '+contact['work_address_province']+'\n';
                    }
                    else{
                        workAddressString = 'work:\n'+contact['work_address_ln1']+'\n'+contact['work_address_city']+', '+contact['work_address_province']+'\n';
                    }
                    break;
                    
                case 'other':
                    if(contact['other_address_ln2'].length>0){
                        otherAddressString = 'other:\n'+contact['other_address_ln1']+', '+contact['other_address_ln2']+'\n'+contact['other_address_city']+', '+contact['other_address_province']+'\n';
                    }
                    else{
                        otherAddressString = 'other:\n'+contact['other_address_ln1']+'\n'+contact['other_address_city']+', '+contact['other_address_province']+'\n';
                    }
                    break;
            }
        });
        table.push(['typeof_address',homeAddressString+workAddressString+otherAddressString]);
    }
    // if(contact['phoneNumbers'].length>0){
    //     var homePhone = '';
    //     var workPhone = '';
    //     var cellPhone = '';
    //     var otherPhone = '';
    //     contact['phoneNumbers'].forEach(function(type){
    //         switch(type){
    //             case 'home':
    //                 homePhone = 'home: '+ contact['homePhone']+'\n';
    //                 break;
    //             case 'work':
    //                 workPhone = 'work: '+ contact['workPhone']+'\n';
    //                 break;
    //             case 'cell':
    //                 cellPhone = 'cell: '+ contact['cellPhone']+'\n';
    //                 break;
    //             case 'other':
    //                 otherPhone = 'other: '+ contact['otherPhone']+'\n';
    //                 break;
    //         }
    //     });
    //     table.push(['Phone',homePhone+workPhone+cellPhone+otherPhone]);
    // }
    // if(contact['emailAddresses'].length>0){
    //     var personalEmail = '';
    //     var workEmail = '';
    //     var otherEmail = '';
    //     contact['emailAddresses'].forEach(function(type){
    //         switch(type){
    //             case 'personal':
    //                 personalEmail = 'personal: '+ contact['personalEmail']+'\n';
    //                 break;
    //             case 'work':
    //                 workEmail = 'work: '+ contact['workEmail']+'\n';
    //                 break;
    //             case 'other':
    //                 otherEmail = 'other: '+ contact['otherEmail']+'\n';
    //                 break;
    //         }
    //     });
    //     table.push(['Email',personalEmail+workEmail+otherEmail]);
    // }
    console.log(table.toString());
}


function mainMenu() {
    // console.log(mainMenuQuestions);
    function input() {
        inquirer.prompt(mainMenuQuestions, function(answers) {
            console.log(answers)
            var user = {};

            //console.log(answers);
            if (answers.MenuChoices === 'search') {
                searcher();


            }
            else if (answers.MenuChoices === 'create') {
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
            }
            else if (answers.MenuChoices === 'exit') {
                console.log("Youll be back");
                // process.exit(0);
            }
            // console.log("you want to search");
            //funciton searchEntries()
        })
    }
    input()
}

mainMenu(); // must come after any variable that it uses has been defined
//delete with a filter method


// var searchMenu = [{name: 'search', message: 'Search by name', type: "input",}];

// function searcher() {
//     inquirer.prompt(searchMenu, function(answers){
//         var found = [];

//             addressBook.forEach(function(contact){
//                 if(contact.first_name === answers.search){
//                     found.push(contact)
//                 }else if (contact.last_name === answers.search) {
//                     found.push(contact)
//                 }
//             })
//             function matches(results) {
//                 return [{
//                     name: "match",
//                     message: "Select to view.",
//                     type: "list",
//                     choices: function (answer){
//                             var allMatches = [];
//                             allMatches = results.map(function(objEl){
//                                 return {name: objEl.first_name + " " + objEl.last_name, value: objEl}
//                         })
//                         allMatches.push({name: "Return to Main Menu", value: 'return'}, {name: "Try that search again.", value: 'searchAgain'})
//                         return allMatches; 
//                         }
//                 }]
//             }
//             console.log(matches(found));
//                 inquirer.prompt(matches(found), function(answers) {
//                     //console.log(answers) find the match to run next function

//                     if (answers.match === "return") {
//                         mainMenu()
//                     } else if (answers.match === "searchAgain"){
//                         searcher()
//                     }
//                     //  searcher()
//                 })
//     })
// }

// searcher();