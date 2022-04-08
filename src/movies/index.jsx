import { useState, useRef } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Alert
} from 'react-bootstrap';
import axios from 'axios';
import { logError } from '../utils/log';
import MovieDetails from './components/MovieDetails';

export default function Movies() {
  const movieTitleRef = useRef();
  const [movie, setMovie] = useState({});
  const [message, setMessage] = useState({ show: false });
  const [validated, setValidated] = useState(false);
  const [lastValue, setLastValue] = useState('');

  const showMessage = (heading, message) => {
    setMessage({
      show: true,
      heading,
      message
    });
  }

  const closeMessage = () => {
    setMessage({
      show: false,
      heading: '',
      message: ''
    });
  }

  const clearMovie = () => {
    setMovie({
      fetched: false,
      title: '',
      description: '',
      review: null,
      actor: '',
      poster: ''
    });
  }

  const calcReview = (rating) => {
    if (isNaN(rating)) return NaN;
    const calc = (rating / 10) * 5;
    return Number(calc.toFixed(2));
  }

  const loadMovie = async (value) => {
    try {
      // prevent doing the same request
      if (movie.fetched && value === lastValue) return;

      const res = await axios.get(`https://www.omdbapi.com`, {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          t: value
        }
      });
      if (!res?.data || res?.data?.Error) {
        clearMovie();
        showMessage(
          'Ops, movie not found!',
          'Change the movie title and try again'
        );
      } else {
        setMovie({
          fetched: true,
          title: res.data.Title,
          description: res.data.Plot,
          review: calcReview(res.data.imdbRating),
          actor: res.data.Actors,
          poster: res.data.Poster
        });
        closeMessage();
      }
    } catch (err) {
      logError(err);
      showMessage(
        'Error: Cannot retrieve movie information',
        'Please try again later'
      );
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    const { value } = movieTitleRef.current;
    setLastValue(value);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return setValidated(true);
    }
    setValidated(false);
    await loadMovie(value);
  };

  return (
    <>
      <div className="border rounded p-3">
        <Row className="justify-content-md-center mb-3">
          <Col>
            <h1 className="text-center display-4">Movie Search</h1>
            <p className="lead text-center">This website uses the <a href="http://www.omdbapi.com/" target={'_blank'} rel="noreferrer">OMDb API</a> to
              search and display movie information
            </p>
          </Col>
        </Row>
        <Form noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="form-inline">
          <Row className="justify-content-md-center">
            <Form.Group as={Col} className="mb-3" md="6"
              controlId="validationCustom01">
              <Form.Control required
                type="text"
                placeholder="Movie title"
                ref={movieTitleRef}
                maxLength={100} />
              <Form.Control.Feedback type="invalid">
                Insert the movie title
              </Form.Control.Feedback>
            </Form.Group>
            <Col xs="auto" className="mb-3">
              <Button variant="primary"
                type="submit">Search</Button>
            </Col>
            <Col xs="auto" className="mb-3">
              <Button variant="danger"
                type="reset"
                onClick={() => {
                  clearMovie();
                  closeMessage();
                }}>Reset</Button>
            </Col>
          </Row>
        </Form>
        <br />
      </div>

      {message.show ? (
        <Alert variant="danger" onClose={closeMessage} dismissible>
          <Alert.Heading>{message.heading}</Alert.Heading>
          <p>
            {message.message}
          </p>
        </Alert>
      ) : null}

      {movie.fetched ? (
        <MovieDetails movie={movie} />
      ) : null}
    </>
  );
}