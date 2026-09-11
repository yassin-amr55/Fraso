import { Hero } from './components/Hero';
import { ProgressSection } from './components/ProgressSection';
import { MilestoneSection } from './components/MilestoneSection';
import { ChapterTimeline } from './components/ChapterTimeline';
import { WordStats } from './components/WordStats';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <main>
        <Hero />
        <ProgressSection />
        <MilestoneSection />
        <ChapterTimeline />
        <WordStats />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
