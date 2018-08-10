import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {
	static propTypes = {
		booksOnShelf: PropTypes.array,
		onMoveBook: PropTypes.func.isRequired
	}

	state = {
		query: '',
		searchedBooks: [],
		userBooks: [],
        bookIds: [],
		onDelete: false
	}
	
	componentDidMount() {
		let bookIds = []
		let books = []

		if (this.props.booksOnShelf.length !== 0) {
			books = this.props.booksOnShelf
			bookIds = this.storeIds(this.props.booksOnShelf)  
			this.setState({userBooks: books, bookIds: bookIds})            
		}
		else {
			BooksAPI.getAll().then((result) => {
				bookIds = this.storeIds(result)  
				this.setState({userBooks: result, bookIds: bookIds})            
			})    
		}
    }
	
	storeIds = (books) => {
        let bookIds = []
        for (var i = 0; i < books.length; i++) {
            let bookId = books[i].id
            bookIds.push(bookId)
        }  

        return bookIds;
    }
	
	updateQuery = (e) => {
		let userInput = e.target.value.trim()
		
		if (userInput !== '' && !this.state.onDelete) {
            BooksAPI.search(userInput, 100).then((result) => {      
                if (result !== undefined && !result.error) {
                    let searchBookIds = []
                    for (var i = 0; i < result.length; i++) {
                        let book = result[i]
                        book['shelf'] = 'none'
                        searchBookIds.push(book.id)
    
                        if (book.imageLinks === undefined) {
                            let imageLinks = {smallThumbnail: '', thumbnail: ''}
                            book['imageLinks'] = imageLinks
                        }                      
                    }
                    
                    let searchBooks = result.filter((book) => {
                            return this.state.bookIds.indexOf(book.id) === -1;
                        }).concat(this.state.userBooks.filter((book) => {
                            return searchBookIds.indexOf(book.id) !== -1;
                        }))
    
                    searchBooks.sort(sortBy('title'))
                    this.setState({ query: userInput, searchedBooks: searchBooks })    
                }
                else {
                    this.setState({ query: userInput, searchedBooks: (result === undefined) ? [] : result })    
                }
            })   
        }
        else {
            this.setState({ query: '', searchedBooks: []})
        }

	}
	
	handleChangeBookshelf = (e, id) => {    
        let searchBooks = Object.assign([], this.state.searchedBooks);
        let bookIds = Object.assign([], this.state.bookIds);        
        let shelf = e.target.value.trim()

        for (var i = 0; i < searchBooks.length; i++) {
            var bookId = searchBooks[i].id  
            if (bookId === id) {        
                let book = searchBooks[i]
                book['shelf'] = shelf            
            }
        }
        this.setState({ searchedBooks: searchBooks })

        let books = this.state.searchedBooks.filter((book) => book.id === id)
        BooksAPI.update(books[0], shelf).then(() => {
            let userBooks = this.state.userBooks.filter((book) => book.id !== id)
                               .concat(this.state.searchedBooks.filter((book) => book.id === id))
            bookIds.push(id)

            this.setState({ userBooks: userBooks, bookIds: bookIds })
            this.props.onMoveBook(userBooks)
        })
    }
	
	render() {
		let books = this.state.searchedBooks

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className='close-search'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author" 
							onChange={this.updateQuery}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{!books.error && books.map((book) => (
                            <li key={book.id} >
								<div className="book">
									<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
									<div className="book-shelf-changer">
										<select defaultValue={book.shelf} onChange={(e) => {
												this.handleChangeBookshelf(e, book.id)
											}}>
											<option value="none" disabled>Move to...</option>
											<option value="currentlyReading">Currently Reading</option>
											<option value="wantToRead">Want to Read</option>
											<option value="read">Read</option>
											<option value="none">None</option>
										</select>
									</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.author}</div>
								</div>
                            </li>
                        ))} 
                        {books.error && <div>No books found</div>}  
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks