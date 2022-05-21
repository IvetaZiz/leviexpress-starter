import React from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { useState } from 'react';

export const Home = () => {
  const [journey, setJourney] = useState(null);
  const handleJourneyChange = (journey) => {
    setJourney(journey);
  };
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey === null ? null : `Nalezeno spojení s id${journey.journeyId}`}
    </main>
  );
};
