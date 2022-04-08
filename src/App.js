import {
  Navbar,
  Container,
} from 'react-bootstrap';
import './custom.scss';
import Movies from './movies';
import './css/sticky-footer.css';
import logo from './logo.svg';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img
              alt=""
              src={logo}
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
      <footer className="footer">
        <Container className="text-center">
          <span className="text-muted">
            Thank you for visiting.
            Made by <a href="https://github.com/hcmendes" target="_blank" rel="noreferrer">Hilton M. Cardoso</a>
          </span>
        </Container>
      </footer>
    </>
  );
}

export default App;
