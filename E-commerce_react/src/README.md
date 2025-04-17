# React E-Commerce API

This is a React e-commerce API designed to interact with the Flask e-commerce API designed earlier.  This repo can found [here](https://github.com/wrhendley/e-commerce-api) and is required for this assignment.

There are several pages, each largely styled through Bootstrap, all of which have a NavBar at the top:

## Homepage
Has a welcome message, and cards to direct users to pages.

## Customer Management
This page has a new user form, and also lists out all current users.  Next to each user are buttons to edit or delete the user.  Upon clicking the edit button, the user's info is filled in, and the user is selected for editing.  The final two fields, username and password, are disabled in edit mode, as they are associated with user accounts in the database, rather than with users.  Form validation is performed, and all fields are required (unless disabled).

## Product Management
Similar to the Customer Management page, but for Products.

## Orders Management
Has a form to add a new order, with a button at the bottom that will add additional fields for more products if needed.  Then has a listing of all orders with the order ID, date, customer ID, and order total.

## Not Found
Should users navigate to an unrouted URL, there is a NotFound component to handle the situation, letting them know the page doesn't exist, and directing them back to the Homepage.
