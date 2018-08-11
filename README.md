# MyReads Project for Nanodegree

## Table of Contents
* [Project Description](#project_description)
* [How to Use](#how_to_use)
* [References](#references)
* [Contributing](#contributing)

## Project Description

### Generalities
This app search for books in a database given by a backend server offered by Udacity team. 

### User corner
The user has 3 shelves of his own: 
- “currently reading”
- “want to read”
- “read” 

When the app starts, user sees his corner with the books he puted on categories.

Books can be moved from one shelf to another using the "down arrow" asignated to each book.

### Search functionality
Pressing the + button from the right down corner, the search page opens. 

There are limited searches that works due to the limits of backend server. For the words that can be searched for, please check [SEARCH_TERMS.md](SEARCH_TERMS.md).

User can also asign from here to each book, one of the 3 shelves that can be seen in the main screen.

## How to Use

To get started developing right away:

* in command line run `npm install`
* install the following dependencies:
- React Router: `npm install --save react-router-dom`
- PropTypes: `npm install --save prop-types`
- Escape String Regexp and SortBy: `npm install --save escape-string-regexp sort-by`
* start the development server with `npm start`

## References

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
