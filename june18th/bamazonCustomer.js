var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ryan',
    password: 'Hannibal13!',
    database: 'bamazon'
});


connection.connect();

connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log('-------Bamazon Inventory------- \n');
    console.log(" ID           Product           Price  \n __________________________________")
    logData = []
    for (var i = 0; i < results.length; i++) {
        var log = "| " + results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price + " | \n Only " + results[i].stock_quantity + " left in stock! \n\n"
        logData.push(log)
    }
    console.log(logData.join(""))
    inquirer.prompt([
        {
            type: "input",
            name: "menu",
            message: "What would you like? (Enter Item ID)"
        },
        {
            type: "input",
            name: "amount",
            message: "Of course - and how many?"
        }
    ]).then(response => {
        var item_id = response.menu
        var item_amount = parseInt(response.amount)
        connection.query("SELECT * FROM products WHERE item_id =?", response.menu, function (error, response, fields) {
            if (error) throw error;
            var quantity_left = response[0].stock_quantity
            var buying = response[0].product_name
            if (quantity_left < item_amount) {
                console.log("Sorry! We don't have enough for your order :(")
            } else {
                console.log("Total: $" + response[0].price + ".00")
                console.log("Place order for " + buying + " (x" + item_amount + ")?")
                inquirer.prompt([
                    {
                        type: "confirm",
                        name: "con",
                        message: "Confirm?",
                    }
                ]).then(response => {
                    if (response.con) {
                        if (item_amount > 1 || buying === 'Giant Schrunchies' || buying === 'The A-Team Complete Series') {
                            console.log("Perfect! You've placed your order for (" + item_amount + ") " + buying + "!")
                        } else {
                            console.log("Perfect! You've placed your order for (" + item_amount + ") " + buying + "s!")
                        }
                    } else {
                        console.log("Okay, don't waste my time man.")
                    }
                    connection.end()
                })
            }

        })

    })
});

