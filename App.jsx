import React from 'react';
import Market from './src/pages/market/Market.jsx';
import { register } from 'swiper/element/bundle';

const App = () => {
  register();
  return <Market />;
};

export default App;
