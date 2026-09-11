import { faq } from '../data/seo';
import { Reveal } from './ui/Reveal';
import './FAQSection.css';

/**
 * A plain, always-visible Q&A list — no accordion/hidden state. This
 * keeps every answer directly readable by both visitors and crawlers
 * (nothing to expand, nothing gated behind JS), and matches the exact
 * question/answer pairs in the FAQPage structured data in index.html —
 * both are generated from the same src/data/seo.js `faq` array.
 */
export function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">Questions, Answered</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">About Fraso</h2>
          </Reveal>
        </div>

        <dl className="faq-list">
          {faq.map((item, i) => (
            <Reveal as="div" key={item.question} delay={i * 60} className="faq-item">
              <dt className="faq-item__question">{item.question}</dt>
              <dd className="faq-item__answer">{item.answer}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
