import { useSetDocumentTitle } from 'src/hooks';

import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';

export default function Home() {
  useSetDocumentTitle('Home');

  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
