import type { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  return (
    <main>
      <Header />
      {props.children}
    </main>
  );
}
