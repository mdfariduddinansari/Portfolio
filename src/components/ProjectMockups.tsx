import { Heart, Mic, Pause, Play, Search, ShoppingBag, Volume2 } from 'lucide-react'

export function ShopiKartMockup() {
  return (
    <div className="shop-mockup" aria-label="ShopiKart product interface preview">
      <div className="browser-top"><span /><span /><span /><div className="browser-address">shopikart / discover</div></div>
      <div className="shop-screen">
        <aside className="shop-sidebar">
          <div className="shop-brand"><ShoppingBag size={14} /> sk.</div>
          <i /><i /><i /><i /><i />
        </aside>
        <div className="shop-content">
          <div className="shop-toolbar"><div className="shop-search"><Search size={12} /> Search anything</div><Heart size={14} /></div>
          <div className="shop-content-grid">
            <div className="shop-product-main"><div className="sale-pill">NOW TRENDING</div><div className="abstract-shoe"><div className="shoe-sole" /><div className="shoe-body" /></div><div className="product-copy"><p>URBAN RUNNER</p><b>₹ 2,499</b><span>★★★★<em>★</em></span></div></div>
            <div className="shop-stats"><div><small>ORDERS</small><b>284</b><span className="mini-chart" /></div><div><small>RATING</small><b>4.8</b><span className="rating-stars">★★★★★</span></div><div className="voice-chip"><Mic size={14} /> Voice search <span className="voice-bars"><i /><i /><i /></span></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MusicMockupProps {
  playing: boolean
  autoplay: boolean
  progress: number
  volume: number
  onToggle: () => void
  onAutoplayToggle: () => void
  onProgressChange: (value: number) => void
  onVolumeChange: (value: number) => void
}

export function MusicMockup({ playing, autoplay, progress, volume, onToggle, onAutoplayToggle, onProgressChange, onVolumeChange }: MusicMockupProps) {
  return (
    <div className="music-mockup" aria-label="Interactive music player interface preview">
      <div className="album-art"><div className="orb orb-one" /><div className="orb orb-two" /><div className="album-lines" /></div>
      <div className="music-content">
        <span className="playing-label">NOW PLAYING</span>
        <h3>Afterglow</h3>
        <p>Midnight Signals</p>
        <div className="music-wave" aria-hidden="true">{Array.from({ length: 33 }, (_, index) => <i key={index} style={{ height: `${16 + ((index * 19) % 47)}%` }} />)}</div>
        <div className="music-progress"><span style={{ width: `${progress}%` }} /><input className="music-range progress-range" type="range" min="0" max="100" value={progress} onChange={(event) => onProgressChange(Number(event.target.value))} aria-label="Scrub track timeline" /><b>{Math.round((198 * progress) / 100 / 60)}:{String(Math.round((198 * progress) / 100) % 60).padStart(2, '0')}</b><b>3:18</b></div>
        <div className="music-controls"><button className={`icon-button subtle ${autoplay ? 'is-active' : ''}`} type="button" onClick={onAutoplayToggle} aria-label={autoplay ? 'Disable autoplay' : 'Enable autoplay'} aria-pressed={autoplay}><span className="shuffle-icon">↔</span></button><button className="play-button" type="button" onClick={onToggle} aria-label={playing ? 'Pause music preview' : 'Play music preview'} aria-pressed={playing}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><label className="music-volume"><Volume2 size={16} /><span className="sr-only">Volume</span><input className="music-range volume-range" type="range" min="0" max="100" value={volume} onChange={(event) => onVolumeChange(Number(event.target.value))} aria-label="Adjust volume" /></label></div>
      </div>
    </div>
  )
}
