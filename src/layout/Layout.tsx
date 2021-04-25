import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import type { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      <Header />
      <Container component="main">
        <Box marginTop={2} marginBottom={2}>
          {props.children}
        </Box>
      </Container>
    </>
  );
}
