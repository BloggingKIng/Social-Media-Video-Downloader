import {Container, Navbar, Nav} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Video Downloader for Social Media</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

