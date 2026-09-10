import { progress } from '../data/progress';
import elentLogo from '../assets/elent-tales-logo.png';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__mark">
          <img src={elentLogo} alt="Elent Tales" className="site-footer__logo" />
        </div>

        <h3 className="site-footer__title">Fraso</h3>
        <p className="site-footer__byline">
          A story by{' '}
          <a
            href="https://www.yassinamr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__author-link"
          >
            Yassin Shehab
          </a>
        </p>

        <div className="site-footer__rule" aria-hidden="true" />

        <p className="site-footer__studio">Elent Tales</p>
        <p className="site-footer__tagline">Still being written.</p>

        {progress.lastUpdated && (
          <p className="site-footer__updated">Last updated &middot; {progress.lastUpdated}</p>
        )}
      </div>
    </footer>
  );
}
