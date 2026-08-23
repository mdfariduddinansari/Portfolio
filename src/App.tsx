import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Braces, BriefcaseBusiness, Code2, Download, Github, GraduationCap, Layers3, Mail, Menu, Send, X } from 'lucide-react'
import { cn } from './lib/utils'
import SectionHeading from './components/SectionHeading'
import { MusicMockup, ShopiKartMockup } from './components/ProjectMockups'
import CaseStudyDialog from './components/CaseStudyDialog'

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']
const roles = ['Software Engineer', 'Full-Stack Developer', 'Frontend Developer', 'Problem Solver']
const skillGroups = [
  ['Languages', ['JavaScript', 'HTML', 'CSS', 'SQL']],
  ['Frontend', ['React.js', 'Redux Toolkit', 'Material UI']],
  ['Backend', ['Node.js', 'Express.js', 'REST APIs', 'JWT']],
  ['Database', ['MongoDB', 'MongoDB Atlas']],
  ['Tools', ['Git', 'GitHub', 'VS Code']],
  ['Other', ['Web Speech API', 'Razorpay']],
]
const coreSkills = ['Frontend Development', 'Full-Stack Development', 'Responsive Design', 'Debugging', 'Problem-Solving']
const SHOPIKART_GITHUB_URL = 'https://github.com/mdfariduddinansari/ShopiKart'
const SHOPIKART_LIVE_URL = ''

const MUSIC_PLAYER_GITHUB_URL = 'https://github.com/mdfariduddinansari/CodeAlpha_MusicPlayer'
const MUSIC_PLAYER_LIVE_URL = 'https://mdfariduddinansari.github.io/CodeAlpha_MusicPlayer/'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ProjectLink({ label, href }: { label: string; href: string }) {
  if (!href) return <span className="project-link project-link-disabled" aria-label={`${label} link is not configured yet`}>{label} <span>— configure URL</span></span>
  return <a className="project-link" href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={15} /></a>
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicAutoplay, setMusicAutoplay] = useState(false)
  const [musicProgress, setMusicProgress] = useState(53)
  const [musicVolume, setMusicVolume] = useState(72)
  const [roleIndex, setRoleIndex] = useState(0)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const closeMenuTrigger = useRef<HTMLButtonElement>(null)
  const caseStudyTrigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.title = 'MD Fariduddin Ansari | Software Engineer'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Premium software engineering portfolio of MD Fariduddin Ansari, a full-stack developer building modern, scalable web experiences.')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reducedMotion) {
      const interval = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 2400)
      return () => window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section[id]')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveNav(visible.target.dataset.nav ?? 'Home')
    }, { rootMargin: '-36% 0px -55% 0px', threshold: [0.05, 0.3, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!supportsFinePointer) return
    const followCursor = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty('transform', `translate3d(${event.clientX - 18}px, ${event.clientY - 18}px, 0)`)
      cursorDotRef.current?.style.setProperty('transform', `translate3d(${event.clientX - 3}px, ${event.clientY - 3}px, 0)`)
    }
    window.addEventListener('pointermove', followCursor)
    return () => window.removeEventListener('pointermove', followCursor)
  }, [])

  useEffect(() => {
    if (!menuOpen) closeMenuTrigger.current?.focus()
  }, [menuOpen])

  const handleNav = (item: string) => {
    setMenuOpen(false)
    scrollToId(item.toLowerCase())
  }

  const handleTilt = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = event.currentTarget
    const box = element.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    element.style.setProperty('--tilt-x', `${y * -4}deg`)
    element.style.setProperty('--tilt-y', `${x * 5}deg`)
  }
  const clearTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" />
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" /><div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />

      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <button className="monogram" type="button" onClick={() => handleNav('Home')} aria-label="Go to home">FA<span>.</span></button>
          <div className="desktop-nav">{navItems.map((item) => <button key={item} className={cn('nav-item', activeNav === item && 'active')} type="button" onClick={() => handleNav(item)}>{item}</button>)}</div>
          <a className="nav-contact" href="mailto:mdfariduddinansari786@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button ref={closeMenuTrigger} className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}><Menu size={22} /></button>
        </nav>
      </header>

      <div className={cn('mobile-menu', menuOpen && 'open')} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head"><span>Navigation</span><button className="menu-toggle" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><X size={22} /></button></div>
        <div className="mobile-links">{navItems.map((item, index) => <button key={item} type="button" onClick={() => handleNav(item)}><span>0{index + 1}</span>{item}<ArrowDownRight size={19} /></button>)}</div>
        <a href="mailto:mdfariduddinansari786@gmail.com" className="mobile-email"><Mail size={17} /> mdfariduddinansari786@gmail.com</a>
      </div>

      <main>
        <section id="home" data-nav="Home" className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker reveal is-visible"><span />AVAILABLE FOR OPPORTUNITIES</p>
            <h1 className="hero-title"><span className="reveal is-visible">MD FARIDUDDIN</span><span className="outline-text reveal is-visible">ANSARI</span></h1>
            <div className="role-line reveal is-visible"><Code2 size={18} /><span>{roles[roleIndex]}</span><i /></div>
            <p className="hero-description reveal is-visible">Building modern, responsive and scalable web experiences.</p>
            <div className="hero-actions reveal is-visible"><button type="button" className="button-primary magnetic" onClick={() => handleNav('Projects')}>Explore my work <ArrowDownRight size={18} /></button><a href="/resume/MD-Fariduddin-Ansari-Resume.pdf" download className="button-secondary">Download resume <Download size={17} /></a></div>
          </div>
          <div className="hero-visual reveal is-visible" aria-hidden="true"><div className="orbit orbit-outer" /><div className="orbit orbit-inner" /><div className="hero-core"><Braces size={56} strokeWidth={1.25} /></div><div className="floating-note note-one">React / Node</div><div className="floating-note note-two">Build with intent</div><div className="scroll-prompt"><span />Scroll to explore</div></div>
        </section>

        <section id="about" data-nav="About" className="about section-pad">
          <div className="about-index reveal"><span>01</span><i /> About</div>
          <div className="about-body reveal"><p className="display-copy">I turn complex ideas into <em>clear</em>, resilient software experiences.</p><div className="about-detail"><p>As an Information Technology graduate, I bring hands-on experience building, debugging and deploying software applications. My focus sits at the intersection of thoughtful interfaces, practical APIs, reliable databases and strong software engineering fundamentals.</p><a href="mailto:mdfariduddinansari786@gmail.com" className="text-link">Start a conversation <ArrowUpRight size={16} /></a></div></div>
        </section>

        <section id="skills" data-nav="Skills" className="skills-section section-pad">
          <SectionHeading eyebrow="02 / CAPABILITIES" title={<>Technical depth, <em>deliberately applied.</em></>} description="A focused toolkit for building polished web products from interface to API." />
          <div className="skills-grid">{skillGroups.map(([group, items], index) => <article className="skill-card reveal" key={group} style={{ transitionDelay: `${index * 45}ms` }}><div className="skill-card-top"><span>0{index + 1}</span><Layers3 size={18} /></div><h3>{group}</h3><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
          <div className="core-row reveal"><p>Core focus</p>{coreSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section id="projects" data-nav="Projects" className="projects-section section-pad">
          <SectionHeading eyebrow="03 / SELECTED WORK" title={<>Interfaces with <em>purpose.</em></>} description="Two projects that reflect my approach to functional, interactive web development." />
          <article className="project-feature reveal" onPointerMove={handleTilt} onPointerLeave={clearTilt}>
            <div className="project-feature-copy"><div className="project-topline"><span>01 / FEATURED</span><span>FULL-STACK</span></div><h3>SHOPIKART</h3><p className="project-subtitle">Full-Stack E-Commerce &amp; Rental Platform</p><p className="project-description">A commerce experience that combines everyday shopping with rentals, layered with powerful management and discovery tools.</p><div className="tech-row">{['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT'].map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><button ref={caseStudyTrigger} type="button" className="button-primary small" onClick={() => setCaseStudyOpen(true)}>Explore case study <ArrowUpRight size={16} /></button><ProjectLink label="GitHub" href={SHOPIKART_GITHUB_URL} /><ProjectLink label="Live preview" href={SHOPIKART_LIVE_URL} /></div></div>
            <div className="project-visual shop-visual"><ShopiKartMockup /><div className="visual-label label-a">REVIEW INTELLIGENCE</div><div className="visual-label label-b">VOICE SEARCH</div></div>
          </article>
          <article className="project-secondary reveal" onPointerMove={handleTilt} onPointerLeave={clearTilt}>
            <div className="project-secondary-content"><div><div className="project-topline"><span>02 / INTERACTION</span><span>WEB AUDIO UI</span></div><h3>Interactive<br /><em>Music Player</em></h3><p>An expressive browser-based player with custom playlists, responsive controls, waveform motion and timeline scrubbing.</p><div className="tech-row">{['HTML', 'CSS', 'JavaScript'].map((tech) => <span key={tech}>{tech}</span>)}</div></div><div className="project-actions"><ProjectLink label="GitHub" href={MUSIC_PLAYER_GITHUB_URL} /><ProjectLink label="Live preview" href={MUSIC_PLAYER_LIVE_URL} /></div></div>
            <MusicMockup playing={musicPlaying} autoplay={musicAutoplay} progress={musicProgress} volume={musicVolume} onToggle={() => setMusicPlaying((current) => !current)} onAutoplayToggle={() => setMusicAutoplay((current) => !current)} onProgressChange={setMusicProgress} onVolumeChange={setMusicVolume} />
          </article>
        </section>

        <section id="experience" data-nav="Experience" className="experience-section section-pad">
          <SectionHeading eyebrow="04 / EXPERIENCE" title={<>Learning through <em>delivery.</em></>} />
          <div className="timeline reveal"><div className="timeline-line" /><article className="timeline-card"><div className="timeline-mark"><BriefcaseBusiness size={19} /></div><div className="timeline-meta"><span>JULY 2025</span><span>Frontend Development Intern</span></div><div className="timeline-content"><h3>CodeAlpha</h3><ul><li>Built responsive interfaces using HTML, CSS and JavaScript.</li><li>Worked on interactive UI features and completed frontend components.</li><li>Used Git/GitHub workflows while debugging, deploying and refining software.</li></ul></div></article></div>
        </section>

        <section id="education" data-nav="Education" className="education-section section-pad">
          <div className="education-card reveal"><div className="education-icon"><GraduationCap size={25} /></div><div><p className="eyebrow"><span />05 / EDUCATION</p><h2>B.Tech in <em>Information Technology</em></h2><p>Techno International New Town <span className="dot-separator">•</span> Affiliated to MAKAUT</p></div><div className="education-year">2022<br /><span>— 2026</span></div></div>
        </section>

        <section id="contact" data-nav="Contact" className="contact-section section-pad">
          <div className="contact-content reveal"><p className="eyebrow"><span />06 / CONTACT</p><h2>Let&apos;s build something <em>meaningful.</em></h2><p>I&apos;m open to opportunities where I can contribute, learn, and build impactful software.</p><a className="contact-email" href="mailto:mdfariduddinansari786@gmail.com">mdfariduddinansari786@gmail.com <ArrowUpRight size={26} /></a></div>
          <div className="contact-links">
            <a href="https://github.com/mdfariduddinansari" target="_blank" rel="noreferrer">
              <span className="contact-label">GitHub</span>
              <Github size={18} />
              <span className="contact-url">: github.com/mdfariduddinansari</span>
              <ArrowUpRight size={18} />
            </a>

            <a href="https://linkedin.com/in/md-fariduddin-ansari-a481a5326" target="_blank" rel="noreferrer">
              <span className="contact-label">LinkedIn</span>
              <Send size={18} />
              <span className="contact-url">: linkedin.com/in/md-fariduddin-ansari-a481a5326</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-name">MD FARIDUDDIN ANSARI <span>Software Engineer</span></div><div className="footer-links"><a href="https://github.com/mdfariduddinansari" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/md-fariduddin-ansari-a481a5326" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:mdfariduddinansari786@gmail.com">Email</a></div><p>© {new Date().getFullYear()}</p></footer>
      <CaseStudyDialog open={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} returnFocusRef={caseStudyTrigger} />
    </div>
  )
}
