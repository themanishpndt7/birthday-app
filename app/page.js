'use client';

import { useState } from 'react';
import BirthdayApp from './components/BirthdayApp';
import IntroMessage from './components/IntroMessage';
import PremiumLanding from './components/PremiumLanding';

export default function Home() {
  const [stage, setStage] = useState('intro');

  if (stage === 'intro') {
    return <IntroMessage onComplete={() => setStage('seal')} />;
  }

  if (stage === 'seal') {
    return <BirthdayApp showIntroMessageOnOpen={false} onSealOpen={() => setStage('premium')} />;
  }

  if (stage === 'premium') {
    return <PremiumLanding onEnter={() => setStage('app')} />;
  }

  return <BirthdayApp startOpened showIntroMessageOnOpen={false} />;
}
