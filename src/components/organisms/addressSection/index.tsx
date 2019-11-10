import React from 'react'
import { IGuestPatch } from '../../../state/interfaces/iGuestPatch'
import { IGuestPost } from '../../../state/interfaces/iGuestPost'
import ModelForm from '../../molecules/modelForm'
import './styles.scss'

interface IAddressSectionProps {
  error?: string,
  guestPatch: IGuestPatch,
  name: string | null,
  createGuest: (guest: IGuestPost) => void,
  updateComplete: boolean,
  updateGuest: (guest: IGuestPatch) => void
}

function AddressSection(props: IAddressSectionProps) {
  const newGuest = (): IGuestPost => {
    return {
      email: '',
      name: '',
      street: '',
      town: '',
      county: '',
      postcode: '',
      country: ''
    }
  }

  const renderAddressRequest = () => {
    return (
      <div className="addressSection">
        <h2>Hi, {props.name}!</h2>
        <p>Please let us know your postal address as we'd love to send you a proper invitation.</p>
        <div className="guest">
          <ModelForm<IGuestPatch>
            key="patchForm"
            labels={{ street: 'address' }}
            model={props.guestPatch}
            onSubmit={props.updateGuest}
            propsOrder={['email', 'street', 'town', 'county', 'postcode', 'country']}
          />
        </div>
        <p>Thanks, Sarah &amp; Jim x</p>
      </div>
    )
  }

  const renderNotFound = () => {
    return (
      <div className="addressSection">
        <h2>Hi!</h2>
        <p>
          Sorry, we couldn't find your invite code, but please fill in the form
          below and let us know your address and we'll work it out!
        </p>
        <div className="guest">
          <ModelForm<IGuestPost>
            key="postForm"
            labels={{ street: 'address' }}
            model={newGuest()}
            onSubmit={props.createGuest}
            propsOrder={['name', 'email', 'street', 'town', 'county', 'postcode', 'country']}
          />
        </div>
        <p>Thanks, Sarah &amp; Jim x</p>
      </div>
    )
  }

  const renderComplete = () => {
    return (
      <div className="addressSection">
        <h2>Thanks!</h2>
        <p>Keep an eye out for a message from us&#8230; :) x</p>
      </div>
    )
  }

  const renderError = () => {
    return (
      <div className="addressSection">
        <h2>Whoops!</h2>
        <p>{props.error}</p>
      </div>
    )
  }

  const render = () => {
    if (props.updateComplete) {
      return renderComplete()
    } else if (props.error) {
      return renderError()
    } else if (props.name) {
      return renderAddressRequest()
    } else {
      return renderNotFound()
    }
  }

  return render()
}

export default AddressSection
