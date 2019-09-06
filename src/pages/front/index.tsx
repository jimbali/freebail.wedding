import React from 'react';
import LongScroll from '../../components/templates/longScroll';
import HeroSection from '../../components/organisms/heroSection';
import SaveTheDate from '../../components/molecules/saveTheDate';
import LeavesBackground from '../../assets/img/leaves.jpg'
import { RouteComponentProps } from 'react-router-dom';
import { IGuest } from '../../state/interfaces/iGuest'
import AddressSection from '../../components/organisms/addressSection'

interface IFrontPageRouteParams {
  inviteCode: string
}

interface IFrontPageState {
  guest: IGuest
}

class FrontPage extends React.Component<RouteComponentProps<IFrontPageRouteParams>, IFrontPageState> {
  constructor(props: RouteComponentProps<IFrontPageRouteParams>) {
    super(props);
    this.state = {
      guest: {
        id: 1,
        name: '',
        invite_code: '',
        invite_link: null,
        invite_sent: null,
        count: 0
      }
    }
  }

  public componentDidMount() {
    const inviteCode = this.props.match.params.inviteCode
    if(!inviteCode) return

    this.updateFormFields(this.requestUrl(inviteCode))
  }

  public render() {
    return (
      <div className="main">
        <LongScroll>
          <div className="App-content">
            <HeroSection
              backgroundImage={LeavesBackground}
              centralWidget={<SaveTheDate/>}
            />
            <AddressSection guest={this.state.guest} updateGuest={this.updateGuest}/>
          </div>
        </LongScroll>
      </div>
    );
  }

  private requestUrl(inviteCode: string): string {
    return process.env.REACT_APP_API_URL + 
             '/guests/' +
             this.props.match.params.inviteCode
  }

  private updateFormFields(url: string) {
    new Promise<IGuest>((resolve, reject) => {
      fetch(url)
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

  private updateGuest(guest: IGuest) {
    console.log(guest)
  }
}

export default FrontPage;
