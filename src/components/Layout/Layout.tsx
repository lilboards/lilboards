import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Container component="main">
        <br />
        <Outlet />
      </Container>
    </>
  );
}
