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
    this.state = { guest: { name: 'hello' } }
    console.log(process.env)
  }

  requestUrl(): string {
    return process.env.REACT_APP_API_URL + 
             '/guests/' +
             this.props.match.params.inviteCode
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
            <AddressSection guest={this.state.guest}/>
          </div>
        </LongScroll>
      </div>
    );
  }
}

export default FrontPage;
