import React from 'react'
import LongScroll from '../../components/templates/longScroll'
import HeroSection from '../../components/organisms/heroSection'
import SaveTheDate from '../../components/molecules/saveTheDate'
import LeavesBackground from '../../assets/img/leaves.jpg'
import { RouteComponentProps } from 'react-router-dom'
import { IGuest } from '../../state/interfaces/iGuest'
import { IGuestPatch } from '../../state/interfaces/iGuestPatch'
import { IGuestPost } from '../../state/interfaces/iGuestPost'
import AddressSection from '../../components/organisms/addressSection'
import { Element, Link } from 'rc-scroll-anim'

interface IFrontPageRouteParams {
  inviteCode: string
}

interface IFrontPageState {
  error?: string,
  guest: IGuest,
  guestPatch: IGuestPatch,
  inviteCode: string,
  updateComplete: boolean
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
      inviteCode: this.props.match.params.inviteCode,
      updateComplete: false
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
              centralWidget={<Link to="addressSection"><SaveTheDate/></Link>}
            />
            <Element id="addressSection">
              <AddressSection
                error={this.state.error}
                guestPatch={this.state.guestPatch}
                name={this.state.guest.name}
                createGuest={this.newGuest.bind(this)}
                updateComplete={this.state.updateComplete}
                updateGuest={this.updateGuest.bind(this)}
              />
            </Element>
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
    fetch(this.requestUrl())
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Bad response')
        }
      })
      .then(guest => {
        this.setState({ guest: guest })
      })
      .catch(error => {
        console.log(error)
      })
  }

  private updateGuest(guest: IGuestPatch) {
    this.sendRequest(guest, 'PATCH')
  }

  private newGuest(guest: IGuestPost) {
    console.log('yeah')
    this.sendRequest(guest, 'POST')
  }

  private sendRequest(guest: IGuestPatch | IGuestPost, method: string) {
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
          throw new Error('Bad response')
        }
      })
      .catch(error => {
        this.setState({
          error: 'Sorry, there was a problem sending your address! Please refresh and try again.'
        })
      })
  }

  private displayThanks() {
    this.setState({ updateComplete: true })
  }
}

export default FrontPage;
