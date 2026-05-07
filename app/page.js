'use client';

import { useState } from 'react';
import BirthdayApp from './components/BirthdayApp';
import PremiumLanding from './components/PremiumLanding';

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <PremiumLanding onEnter={() => setEntered(true)} />;
  }

  return <BirthdayApp />;
}
