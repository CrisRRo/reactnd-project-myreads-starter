import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'
import { Route, Link } from 'react-router-dom';

class BooksApp extends Component {
  state = {
	  books: []
  }
    
  componentDidMount() {
	BooksAPI.getAll().then((books) => {
		this.setState({ books: books })
	})
  }
  
  moveBook = () => {}

  render() {
	// Get currently reading books
	let currentlyReadingBooks = this.state.books.filter((book) => book.shelf === 'currentlyReading')
	let wantToReadBooks = this.state.books.filter((book) => book.shelf === 'wantToRead')
	let readBooks = this.state.books.filter((book) => book.shelf === 'read')

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
		<Route exact path='/' render={() => (
          <div className="list-books">
		  
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			
            <div className="list-books-content">
              <div>
			  
                <div className="bookshelf">		  
				  <BookShelf books={currentlyReadingBooks} onMoveBook={this.moveBook} shelfName='Currently Reading' />
                </div>
				
                <div className="bookshelf">
				  <BookShelf books={wantToReadBooks} onMoveBook={this.moveBook} shelfName='Want to Read' />
                </div>
                
				<div className="bookshelf">
				  <BookShelf books={readBooks} onMoveBook={this.moveBook} shelfName='Read' />
                </div>

              </div>
            </div>

            <div className="open-search">
			  <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
