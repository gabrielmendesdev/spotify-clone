import { Footer } from './components/footer'
import { Main } from './components/main'
import { Sidebar } from './components/sidebar'
import { YourLibrary } from './components/your-library'
import './style.css'

export const SpotifyLayout: React.FC = (): React.ReactNode => {
  return (
    <div className='h-[100dvh] grid grid-rows-12'>
      <Sidebar />
      <YourLibrary />
      <Main />
      <Footer />
    </div>
  )
}
