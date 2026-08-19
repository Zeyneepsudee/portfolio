import BeniTaniyin from '../components/sections/BeniTaniyin'
import Projeler from '../components/sections/Projeler'
import Iletisim from '../components/sections/Iletisim'

function Home() {
  return (
    <div className="space-y-32 pb-32">
      <BeniTaniyin />
      <Projeler />
      <Iletisim />
    </div>
  )
}

export default Home


