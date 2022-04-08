import {
  Row,
  Col,
  Image
} from 'react-bootstrap';
import RatingStars from './RatingStars';

export default function MovieDetails({ movie }) {
  return (
    <div className="border rounded p-3">
      <Row>
        <Col className="col-sm-8">
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <Row>
            <Col className="col-auto">
              <strong>Actors</strong>
            </Col>
            <Col className="col">{movie.actor}</Col>
          </Row>
          <Row className="mb-3">
            <Col className="col-auto"><strong>Review</strong></Col>
            <Col className="col">

              {isNaN(movie.review) ?
                'N/A' :
                (
                  <RatingStars rating={movie.review} />
                )}
            </Col>
          </Row>
        </Col>
        <Col>
          <Image fluid thumbnail src={movie.poster} />
        </Col>
      </Row>
    </div>
  )
}