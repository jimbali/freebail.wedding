import React from 'react'
import LongScroll from '../../components/templates/longScroll'
import HeroSection from '../../components/organisms/heroSection'
import SaveTheDate from '../../components/molecules/saveTheDate'
import LeavesBackground from '../../assets/img/leaves.jpg'
import { RouteComponentProps } from 'react-router-dom'
import { IGuest } from '../../state/interfaces/iGuest'
import { IGuestPatch } from '../../state/interfaces/iGuestPatch'
import AddressSection from '../../components/organisms/addressSection'

interface IFrontPageRouteParams {
  inviteCode: string
}

interface IFrontPageState {
  guest: IGuest,
  guestPatch: IGuestPatch,
  inviteCode: string
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
      },
      guestPatch: {
        email: '',
        street: '',
        town: '',
        county: '',
        postcode: '',
        country: ''
      },
      inviteCode: this.props.match.params.inviteCode
    }
  }

  public componentDidMount() {
    if (this.state.inviteCode) this.updateName()
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
            <AddressSection
              name={this.state.guest.name}
              guestPatch={this.state.guestPatch}
              updateGuest={this.updateGuest.bind(this)}
            />
          </div>
        </LongScroll>
      </div>
    );
  }

  private requestUrl(): string {
    return process.env.REACT_APP_API_URL + 
             '/guests/' +
             (this.state.inviteCode || '')
  }

  private updateName() {
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
    }).then((guest: IGuest) => {
      this.setState({ guest: guest })
    })
  }

  private updateGuest(guest: IGuestPatch) {
    let method = this.state.inviteCode ? 'PATCH' : 'POST'
    let fetchOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guest)
    }
    
    fetch(this.requestUrl(), fetchOptions)
      .then(response => {
        if (response.ok) {
          this.displayThanks()
        } else {
          console.log(response)
        }
      })
  }

  private displayThanks() {
    console.log('success!')
  }
}

export default FrontPage;
