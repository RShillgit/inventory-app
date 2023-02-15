#! /usr/bin/env node

console.log('This script populates some test items and categories.');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Item = require('./models/item')
const Category = require('./models/category')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const items = []
const categories = []

function itemCreate(name, description, category, price, number_in_stock, url, cb) {
    
    itemdetail = {
        name: name,
        description: description, 
        category: category,
        price: price, 
        number_in_stock: number_in_stock, 
        url: url
    } 
    // if (category != false) itemdetail.category = category
  
    const item = new Item(itemdetail);
        
    item.save(function (err) {
        if (err) {
        cb(err, null)
        return
        }
        console.log('New Item: ' + item);
        items.push(item)
        cb(null, item)
    });
}

function categoryCreate(name, description, url, cb) {
    const category = new Category({ 
        name: name,
        description: description,
        url: url
    });
       
    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category)
        cb(null, category);
    }   );
}

function createItems(cb) { // name, description, category, price, number_in_stock, url, cb
    async.parallel([
        function(callback) {
          itemCreate('Pencils', '5 Prestine number 2 pencils', categories[0], '1.00', 10, '', callback);
        },
        function(callback) {
          itemCreate('Scientific Calculator', 'Texas Insturments T-85 Calculator', categories[0], '125.00', 5, '', callback);
        },
        function(callback) {
          itemCreate('Pens', '3 black Pilot G-2 pens', categories[0], '5.00', 8, '', callback);
        },
        function(callback) {
          itemCreate('2 Inch Binder', 'Who actually uses a binder any larger than this...', categories[0], '6', 20, '', callback);
        },
        function(callback) {
          itemCreate('Folder', 'A folder for all your papers', categories[0], '0.50', 1, '', callback);
        },
        function(callback) {
          itemCreate('Stapler', 'A stapler that includes 500 staples', categories[1], '10.00', 17, '', callback);
        },
        function(callback) {
          itemCreate('Post-Its', 'A stack of 1,000 Post-Its', categories[1], '8.00', 12, '', callback)
        }
        ],
        // optional callback
        cb);
}

function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('School Supplies', 'Supplies used by a student for school related tasks', '', callback)
        },
        function(callback) {
          categoryCreate('Office Supplies', 'Supplies used in offices', '', callback)
        }
        ],
        // Optional callback
        cb);
}

async.series([
        createCategories,
        createItems
    ],

    // Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
            console.log(categories)
        }

        // All done, disconnect from database
        mongoose.connection.close();
    }
);