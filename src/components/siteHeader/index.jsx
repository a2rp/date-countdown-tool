import { FiGithub, FiCalendar } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a className={styles.brand} href="#top" aria-label="Date Countdown Tool home">
        <span className={styles.brandMark}><FiCalendar aria-hidden="true" /></span>
        <span>Date <b>Countdown</b></span>
      </a>
      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#countdowns">Generator</a>
        <a href="#about">About UUIDs</a>
      </nav>
      <a className={styles.repository} href="https://github.com/a2rp/date-countdown-tool" target="_blank" rel="noreferrer">
        <FiGithub aria-hidden="true" /> <span>Repository</span>
      </a>
    </div>
  </header>
);

export default SiteHeader;

