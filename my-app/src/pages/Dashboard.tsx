import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import { LeafletMouseEvent } from 'leaflet';
import { LatLngExpression } from 'leaflet';

const Dashboard: React.FC = () => {
  const [worldwideData, setWorldwideData] = useState<any>({});
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any>({});
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Fetch worldwide data
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => setWorldwideData(data))
      .catch(error => console.error('Error fetching worldwide data:', error));

    // Fetch country-specific data
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => setCountriesData(data))
      .catch(error => console.error('Error fetching country-specific data:', error));

    // Fetch graph data
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => response.json())
      .then(data => setGraphData(data))
      .catch(error => console.error('Error fetching graph data:', error));
  }, []);

  // Process graph data
  const graphDates = Object.keys(graphData?.cases || {});
  const graphCases = Object.values(graphData?.cases || {});

  // Line graph configuration
  const lineGraphConfig = {
    labels: graphDates,
    datasets: [
      {
        label: 'Cases',
        data: graphCases,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">      
    <h1 className="text-2xl font-bold mb-4">Worldwide COVID-19 Cases</h1>
      <p>Total Cases: {worldwideData?.cases}</p>
      <p>Total Recovered: {worldwideData?.recovered}</p>
      <p>Total Deaths: {worldwideData?.deaths}</p>
      <h1 className="text-2xl font-bold mb-4" >COVID-19 Cases by Country</h1>
      <MapContainer center={[0, 0] as unknown as LatLngExpression} style={{ height: '500px', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData?.map((country: any) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Total Cases: {country.cases}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <h1 className="text-2xl font-bold mb-4">COVID-19 Cases Fluctuations</h1>
      <Line ref={chartRef} data={lineGraphConfig} />
    </div>
  );
};

export default Dashboard;
