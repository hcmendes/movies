import {
  Navbar,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import './custom.scss';
import Movies from './movies';
import './css/sticky-footer.css';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
          /> Movies
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Container>
        <Movies />
      </Container>
      <footer class="footer">
        <Container className="text-center">
          <span class="text-muted">
            Thank you for visiting.
            Made by <a href="https://github.com/hcmendes" target="_blank" rel="noreferrer">Hilton M. Cardoso</a>
          </span>
        </Container>
      </footer>
    </>
  );
}

export default App;
