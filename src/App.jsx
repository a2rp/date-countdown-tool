import { FiArrowDown, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import CountdownWorkspace from "./components/countdownWorkspace/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell} id="top">
    <SiteHeader />
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}><p className={styles.heroLabel}><FiCalendar aria-hidden="true" /> DATES THAT MATTER</p><h1 id="hero-title">Make time<br /><span>feel closer.</span></h1><p className={styles.heroDescription}>Count toward the moment you are waiting for, or track the time that has passed. Your dates stay close and update every second.</p><a href="#countdowns" className={styles.heroLink}>Add an important date <FiArrowDown aria-hidden="true" /></a></div>
          <div className={styles.heroCard} aria-label="Countdown timer format preview"><div className={styles.cardTop}><span><i /> LIVE CLOCK</span><span>LOCAL TIME</span></div><p className={styles.cardLabel}>A MOMENT, MADE VISIBLE</p><div className={styles.clockPreview}><b>08</b><i>:</i><b>24</b><i>:</i><b>16</b><i>:</i><b>42</b></div><div className={styles.clockUnits}><span>DAYS</span><span>HOURS</span><span>MINUTES</span><span>SECONDS</span></div><div className={styles.cardFoot}><FiClock aria-hidden="true" /><span>Counts forward or back</span><b>01 / SEC</b></div></div>
        </div>
        <div className={styles.heroRail}><span>One place for the dates ahead</span><span><FiMapPin aria-hidden="true" /> Your device time zone</span></div>
      </section>
      <CountdownWorkspace />
      <section className={styles.about} id="about" aria-labelledby="about-title"><div className={styles.aboutInner}><div><p>Simple date tracking</p><h2 id="about-title">A live clock for what matters to you.</h2><span>Each countdown compares your saved local date with the current time on this device.</span></div><div className={styles.aboutGrid}><article><b>01</b><h3>Past or future</h3><p>Future dates count down. Past dates show elapsed time.</p></article><article><b>02</b><h3>Local by default</h3><p>Date entry and display use the time zone set on your device.</p></article><article><b>03</b><h3>Kept on this device</h3><p>Your saved dates use browser storage and are not uploaded.</p></article></div></div></section>
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default App;
