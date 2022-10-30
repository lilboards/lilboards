import Container from '@mui/material/Container';
import type { ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode;
};

const marginTopBottom = 4; // 8 * 4 = 32px

export default function Layout(props: Props) {
  return (
    <>
      <Header />
      <Container component="main" sx={{ my: marginTopBottom }}>
        {props.children}
      </Container>
    </>
  );
}
