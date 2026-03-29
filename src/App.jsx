import { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import CityScene from './scenes/CityScene'
import NavPill from './components/NavPill'
import ChapterOverlay from './components/ChapterOverlay'
import ProgressBar from './components/ProgressBar'
import ScrollHint from './components/ScrollHint'
import './App.css'

const CHAPTERS = [
  { id: 'ch0', start: 0,    end: .09, label: 'PROLOGUE',            navLabel: 'Aerial',     navTo: 0 },
  { id: 'ch1', start: .09,  end: .18, label: '01 OLD CITY',         navLabel: 'Old City',   navTo: .10 },
  { id: 'ch2', start: .18,  end: .28, label: '02 THE CEILING',      navLabel: 'Ceiling',    navTo: .20 },
  { id: 'ch3', start: .28,  end: .38, label: '03 THE SHIFT',        navLabel: 'Shift',      navTo: .30 },
  { id: 'ch4', start: .38,  end: .48, label: '04 BUILDING BLOCKS',  navLabel: 'Blocks',     navTo: .40 },
  { id: 'ch5', start: .48,  end: .58, label: '05 NEW CITY',         navLabel: 'New City',   navTo: .50 },
  { id: 'ch6', start: .58,  end: .68, label: '06 METROPOLIS',       navLabel: 'Metropolis', navTo: .60 },
  { id: 'ch7', start: .68,  end: .82, label: '07 AND BEYOND',       navLabel: 'Beyond',     navTo: .72 },
  { id: 'ch8', start: .82,  end: 1.0, label: '08 FINALE',           navLabel: 'Finale',     navTo: .88 },
]

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollYRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef(null)

  // Smooth scroll lerp
  useEffect(() => {
    const onScroll = () => { targetRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      scrollYRef.current += (targetRef.current - scrollYRef.current) * 0.07
      const total = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, scrollYRef.current / total))
      setScrollProgress(p)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const navigateTo = useCallback((fraction) => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: fraction * total, behavior: 'smooth' })
  }, [])

  // Determine active chapter
  let activeIdx = -1
  for (let i = 0; i < CHAPTERS.length; i++) {
    if (scrollProgress >= CHAPTERS[i].start && scrollProgress <= CHAPTERS[i].end) {
      activeIdx = i
      break
    }
  }

  return (
    <>
      {/* 3D Canvas — fixed behind everything */}
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        camera={{ fov: 50, near: 0.5, far: 400 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, toneMapping: 2, toneMappingExposure: 2.0, powerPreference: 'high-performance' }}
      >
        <CityScene scrollProgress={scrollProgress} />
      </Canvas>

      {/* UI Overlays */}
      <ProgressBar progress={scrollProgress} />
      <NavPill chapters={CHAPTERS} activeIdx={activeIdx} onNavigate={navigateTo} />
      <ScrollHint visible={scrollProgress < 0.04} />

      {/* Chapter content overlays */}
      <ChapterOverlay scrollProgress={scrollProgress} chapters={CHAPTERS} activeIdx={activeIdx} />

      {/* Scroll spacer */}
      <div style={{ height: '3200vh', position: 'relative', pointerEvents: 'none' }} />
    </>
  )
}
