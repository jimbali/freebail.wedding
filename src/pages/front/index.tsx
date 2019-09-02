import React from 'react';
import LongScroll from '../../components/templates/longScroll';
import HeroSection from '../../components/organisms/heroSection';
import SaveTheDate from '../../components/molecules/saveTheDate';
import LeavesBackground from '../../assets/img/leaves.jpg'
import { RouteComponentProps } from 'react-router-dom';

interface IFrontPageRouteParams {
  inviteCode: string
}

interface IFrontPageState {
  guest: IGuest
}

interface IGuest {
  name: string
}

class FrontPage extends React.Component<RouteComponentProps<IFrontPageRouteParams>, IFrontPageState> {
  constructor(props: RouteComponentProps<IFrontPageRouteParams>) {
    super(props);
    this.state = { guest: { name: 'hello' } }
  }

  requestUrl(): string {
    return '/api/guests/' + this.props.match.params.inviteCode
  }

  updateFormFields() {
    new Promise<IGuest>((resolve, reject) => {
      fetch(this.requestUrl())
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            console.log(response)
          }
        })
        .then(jsonResponse => {
          resolve(jsonResponse as IGuest)
        })
    }).then((guest: IGuest) => { console.log(guest); this.setState({ guest: guest }) })
  }

  componentDidMount() {
    this.updateFormFields()
  }

  render() {
    return (
      <div className="main">
        <LongScroll>
          <div className="App-content">
            <HeroSection
              backgroundImage={LeavesBackground}
              centralWidget={<SaveTheDate/>}
            />
            <div>
              {this.state.guest.name}
            </div>
          </div>
        </LongScroll>
      </div>
    );
  }
}

export default FrontPage;
