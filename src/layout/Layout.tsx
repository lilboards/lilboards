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
        <>{props.children}</>
      </Container>
    </>
  );
}
