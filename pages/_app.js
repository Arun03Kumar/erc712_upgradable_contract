import '../styles/globals.css'
import {ContextProvider} from '../context/ContextProvider'
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Nav />
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp
