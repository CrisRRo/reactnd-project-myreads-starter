import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfName: PropTypes.string.isRequired,
		onMoveBook: PropTypes.func.isRequired
	}
		
	render() {
		const { books, shelfName, onMoveBook } = this.props
		
		return (
			<div>
				
				<div className="bookshelf">
					
					<h2 className="bookshelf-title">
						{shelfName}
					</h2>
					
					<div className="bookshelf-books">
						<ol className="books-grid">
							{books.map((book) => (
								<li key={book.id}>
									<div className="book">
									  <div className="book-top">	
										<div className="book-cover" style={{ height: 192, width: 128, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ''})` }}></div>
										<div className="book-shelf-changer">
										  <select defaultValue={book.shelf} onChange={(e) => {
                                            onMoveBook(e, book.id)
                                          }}>
											<option value="move" disabled>Move to...</option>
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
						</ol>
					</div>
				</div>
			</div>
		)
	}
}


export default BookShelf;