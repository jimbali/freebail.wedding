import React from 'react';
import LongScroll from '../../components/templates/longScroll';
import HeroSection from '../../components/organisms/heroSection';
import SaveTheDate from '../../components/molecules/saveTheDate';
import LeavesBackground from '../../assets/img/leaves.jpg'
import { RouteComponentProps } from 'react-router-dom';

interface IFrontPageRouteParams {
  inviteCode: string
}

function FrontPage(props: RouteComponentProps<IFrontPageRouteParams>) {
  const inviteCode: string = props.match.params.inviteCode

  return (
    <div className="main">
      <LongScroll>
        <div className="App-content">
          <HeroSection
            backgroundImage={LeavesBackground}
            centralWidget={<SaveTheDate/>}
          />
          <div>
            {inviteCode}
          </div>
        </div>
      </LongScroll>
    </div>
  );
}

export default FrontPage;
