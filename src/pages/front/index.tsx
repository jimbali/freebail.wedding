import React from 'react';
import LongScroll from '../../components/templates/longScroll';
import HeroSection from '../../components/organisms/heroSection';
import SaveTheDate from '../../components/molecules/saveTheDate';

function saveTheDate() {
  return(<SaveTheDate/>)
}

function FrontPage() {
  return (
    <div className="main">
      <LongScroll>
        <div className="App-content">
          <HeroSection centralWidget={saveTheDate}/>
        </div>
      </LongScroll>
    </div>
  );
}

export default FrontPage;
