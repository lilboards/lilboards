import type { RouteComponentProps } from '@reach/router';

import { useSetDocumentTitle } from '../../hooks';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';

export default function Home(props: RouteComponentProps) {
  useSetDocumentTitle('Home');

  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
