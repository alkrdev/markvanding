import '../styles/globals.css'
import '../styles/Home.css'
import { AppWrapper } from '../context/AppContext'

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp