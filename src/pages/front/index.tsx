import React from 'react';
import LongScroll from '../../components/templates/longScroll';
import HeroSection from '../../components/organisms/heroSection';
import SaveTheDate from '../../components/molecules/saveTheDate';
import LeavesBackground from '../../assets/img/leaves.jpg'

function saveTheDate() {
  return(<SaveTheDate/>)
}

function FrontPage() {
  return (
    <div className="main">
      <LongScroll>
        <div className="App-content">
          <HeroSection
            backgroundImage={LeavesBackground}
            centralWidget={saveTheDate}
          />
        </div>
      </LongScroll>
    </div>
  );
}

export default FrontPage;
