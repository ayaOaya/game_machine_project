import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import About from './components/About/About'
import Schedule from './components/Schedule/Schedule'
import webgiViewer from './components/webgiViewer/webgiViewer'
import Lenis from '@studio-freight/lenis';


const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical', 
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

function App() {
  return (
   <>
     <Router>
     <Navbar />
     <webgiViewer />
      <Link to="/"></Link>
      <Link to="/about"></Link>
      <Link to="/schedule"></Link>

      <Switch>
        <Route path='/' exact><Header /></Route>
        <Route path='/about' exact><About /></Route>
        <Route path='/schedule' exact><Schedule /></Route>
      </Switch>
     </Router>
     </>
  )
}

export default App
