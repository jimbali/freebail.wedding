import { Element, Link } from 'rc-scroll-anim'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import LeavesBackground from '../../assets/img/leaves.jpg'
import SaveTheDate from '../../components/molecules/saveTheDate'
import AddressSection from '../../components/organisms/addressSection'
import HeroSection from '../../components/organisms/heroSection'
import LongScroll from '../../components/templates/longScroll'
import { IGuest } from '../../state/interfaces/iGuest'
import { IGuestPatch } from '../../state/interfaces/iGuestPatch'
import { IGuestPost } from '../../state/interfaces/iGuestPost'

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
    super(props)
    this.state = {
      guest: {
        count: 0,
        id: 1,
        invite_code: '',
        invite_link: null,
        invite_sent: null,
        name: ''
      },
      guestPatch: {
        country: '',
        county: '',
        email: '',
        postcode: '',
        street: '',
        town: ''
      },
      inviteCode: this.props.match.params.inviteCode,
      updateComplete: false
    }
  }

  public componentDidMount() {
    if (this.state.inviteCode) { this.updateName() }
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
    )
  }

  private requestUrl(): string {
    return process.env.REACT_APP_API_URL +
             '/guests/' +
             (this.state.inviteCode || '')
  }

  private updateName() {
    fetch(this.requestUrl())
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Bad response')
        }
      })
      .then((guest) => {
        this.setState({ guest })
      })
      .catch((error) => {
        // Do nothing
      })
  }

  private updateGuest(guest: IGuestPatch) {
    this.sendRequest(guest, 'PATCH')
  }

  private newGuest(guest: IGuestPost) {
    this.sendRequest(guest, 'POST')
  }

  private sendRequest(guest: IGuestPatch | IGuestPost, method: string) {
    const fetchOptions = {
      body: JSON.stringify(guest),
      headers: { 'Content-Type': 'application/json' },
      method
    }

    fetch(this.requestUrl(), fetchOptions)
      .then((response) => {
        if (response.ok) {
          this.displayThanks()
        } else {
          throw new Error('Bad response')
        }
      })
      .catch((error) => {
        this.setState({
          error: 'Sorry, there was a problem sending your address! Please refresh and try again.'
        })
      })
  }

  private displayThanks() {
    this.setState({ updateComplete: true })
  }
}

export default FrontPage
