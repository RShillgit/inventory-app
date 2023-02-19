# inventory-app
A back-end application that allows you to interact with a database and perform CRUD operations on items and associated categories.
I built this app to help practice using Node.js, express, and mongoose.  It uses MongoDB Atlas to store the item and category information.

## Items
Each item has a name, description, category, price, and amount in stock properties associated with it.  The category property is linked to the category collection by the associated ID.

## Categories
Each category has a name, and description

## Functionality
In this app you can navigate between pages that display every item, every category, individual items or categories, as well as create, update, and delete pages for each item and category.