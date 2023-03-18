import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookForm from './Form'
import Button from 'react-bootstrap/Button';
import DeleteButton from './DeleteButton'
import { withAuth0 } from "@auth0/auth0-react";



let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      modalOpen: false,
      

    }
  }

  componentDidMount() {
    // console.log(SERVER);
    this.getBooks();

  }

  handleModalOpen = () => {
    this.setState({
      modalOpen: true,
    })

  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */


  // create a book
  addBook = async (input) => {
    try {
      console.log('hello');
      let url = `${SERVER}/books`;
      let addedBook = await axios.post(url, input);

      this.setState({
        books: [...this.state.books, addedBook.data],
      })
      console.log(addedBook.data);
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        error: error
      });
    }
  }
  handleDelete = async (id) => {
    await this.deleteBook(id)
  }
  deleteBook = async (id) => {
    try {
      console.log("clicked")
      let url = `${SERVER}/books/book/${id}`
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });


    } catch (error) {
      console.log(error);
    }
  }
  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {

      try {
        const res = await this.props.auth0.getIdTokenClaims();
        console.log(res);
        const jwt = res._raw;
        console.log(jwt);
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/book',
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        }
        let results = await axios(config)

        // let results = await axios.get(`${REACT_APP_SERVER}/books`);
        this.setState({
          books: results.data
        })
      } catch (error) {
        console.log('Error! :', error.response.data);
      }
      
    }
  }
    
  // componentDidMount() {
  //   // console.log(SERVER);
  //   this.getBooks();

  // }

  render() {

    /* TODO: render all the books in a Carousel */
    let books = this.state.books.map(book => {
      // console.log(book.title);
      return <Carousel.Item key={book._id}>
        <img
          className="book"
          src="https://place-hold.it/900x500"
          alt={book.title}
        />
        <Carousel.Caption>
          <h2> {book.title}</h2>
          <p>{book.description}</p>
          <div className='DeleteButtonDiv'> 
        <DeleteButton bookId={book._id} deleteBook={this.deleteBook}/>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    })

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <>
            <Carousel>
              {books}
            </Carousel>

            <Button onClick={this.handleModalOpen}>Add A Book</Button>
            <BookForm addBook={this.addBook}
              show={this.state.modalOpen}
              // info={this.state.modalOpen}
              handleClose={this.handleModalClose} />
          </>
        ) : (
          <h3>No Books Found </h3>
        )}

      </>
    )
  }
}

export default withAuth0(BestBooks);
