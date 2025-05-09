import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-main">
        <img src="/tron-ares.jpg" alt="TRON ARES" />
        <div className="hero-info">
          <h1>Coming soon: Tron Ares...</h1>
          <p>Upplev i 4DX | Förhandsvisning!</p>
        </div>
      </div>
      <div className="hero-side">
        <div className="hero-card avengers-card">
          <img src="/avengers.jpg" alt="Förhandsvisning Avengers" className="avengers-img" />
          <div>
            <h2 className="avengers-title">Avengers</h2>
            <p className="avengers-subtitle">Förhandsvisning!</p>
          </div>
        </div>
        <div className="hero-card avatar-card">
          <img src="/avatar.jpg" alt="Avatar" className="avatar-img" />
          <div>
            <h2 className="avatar-title">Avatar Fire & Ash</h2>
            <p className="avatar-subtitle">Den är tillbaka!</p>
          </div>
        </div>
      </div>
    </section>
  );
} 