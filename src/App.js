import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
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
  
  moveBook = (event, id) => {
	let books = this.state.books.filter((book) => book.id === id)
    let shelf = event.target.value

    BooksAPI.update(books[0], shelf).then(() => {
		this.showBookOnNewShelf(id, shelf)
    })
  }

  showBookOnNewShelf = (id, shelf) => {
	let currentBook = this.state.books.filter((book) => book.id === id)
    currentBook[0].shelf = shelf

    let updatedBooks = this.state.books.filter((book) => book.id !== id).concat(currentBook)

    this.setState({updatedBooks})
  }
  
  changeShelfOnSearch = (books) => {
	  this.setState( {books: books} )
  }

  render() {
	// Get currently reading books
	let currentlyReadingBooks = this.state.books.filter((book) => book.shelf === 'currentlyReading')
	let wantToReadBooks = this.state.books.filter((book) => book.shelf === 'wantToRead')
	let readBooks = this.state.books.filter((book) => book.shelf === 'read')
	
    return (
      <div className="app">
        <Route path="/search" render={() => (
		    <SearchBooks booksOnShelf={this.state.books} onMoveBook={this.changeShelfOnSearch} />
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
