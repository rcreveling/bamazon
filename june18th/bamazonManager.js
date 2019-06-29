var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ryan',
    password: 'Hannibal13!',
    database: 'bamazon'
});
var a = "View Products for Sale"
var b = "View Low Inventory"
var c = "Add to Inventory"
var d = "Add New Product"
connection.connect()
var logData = [];
inquirer.prompt([
    {
        type: "checkbox",
        name: "manager",
        message: "Action:",
        choices: [a, b, c, d]
    }
]).then(response => {
    switch (response.manager) {
        case "View Products for Sale":

            connection.query("SELECT * FROM products", function (error, response, fields) {
                if (error) throw error;
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    logData.push(response[i].product_name)
                }

            })
            console.log("Products for sale: \n")
            console.log(logData.join("\n"))

            break;
        case b:
            console.log(b)

            break;
        case c:
            console.log(c)

            break;
        case d:
            console.log(d)

            break;
    }
})

connection.end()