import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
      <Container component="main">
        <Box my={marginTopBottom}>{props.children}</Box>
      </Container>
    </>
  );
}
