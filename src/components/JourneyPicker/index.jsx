import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';

const DatesOptions = ({ dates }) => {
  return (
    <>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
      <option value="">Vyberte</option>
    </>
  );
};
const CityOptions = ({ cities }) => {
  return (
    <>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};
export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('Město 02');
  const [toCity, setToCity] = useState('Město 03');
  const [date, setDate] = useState('Datum 04');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}
    `)
      .then((response) => response.json())
      .then((data) => {
        onJourneyChange(data.results);
      });
  };

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data.results));
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      .then((response) => response.json())
      .then((data) => setDates(data.results));
  }, []);
  return (
    <>
      <div className="journey-picker container">
        <h2 className="journey-picker__head">Kam chcete jet?</h2>
        <div className="journey-picker__body">
          <form className="journey-picker__form">
            <label>
              <div className="journey-picker__label">Odkud:</div>
              <select
                onChange={(event) => setFromCity(event.target.value)}
                type="text"
              >
                <option value="">Vyberte</option>
                <CityOptions cities={cities} />
              </select>
            </label>
            <label>
              <div className="journey-picker__label">Kam:</div>
              <select
                onChange={(event) => setToCity(event.target.value)}
                type="text"
              >
                <option value="">Vyberte</option>
                <CityOptions cities={cities} />
              </select>
            </label>
            <label>
              <div className="journey-picker__label">Datum:</div>
              <select onChange={(event) => setDate(event.target.value)}>
                <DatesOptions dates={dates} />
              </select>
            </label>
            <div className="journey-picker__controls">
              <button
                onClick={(event) => handleSubmit(event)}
                className="btn"
                type="submit"
                disabled={
                  fromCity === '' || toCity === '' || date === '' ? true : false // můžu vymazat ? true : false a bude to fungovat stejne
                }
              >
                Vyhledat spoj
              </button>
            </div>
          </form>
          <img className="journey-picker__map" src={mapImage} />
        </div>
      </div>
    </>
  );
};
