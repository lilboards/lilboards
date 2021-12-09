import type { RouteComponentProps } from '@reach/router';

import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';

export default function Home(props: RouteComponentProps) {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
