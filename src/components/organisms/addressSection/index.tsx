import React from 'react'
import './styles.scss'
import { IGuestPatch } from '../../../state/interfaces/iGuestPatch'
import { IGuestPost } from '../../../state/interfaces/iGuestPost'
import ModelForm from '../../molecules/modelForm'

interface IAddressSectionProps {
  guestPatch: IGuestPatch,
  name: string | null,
  newGuest: (guest: IGuestPost) => void,
  updateComplete: boolean,
  updateGuest: (guest: IGuestPatch) => void
}

function AddressSection(props: IAddressSectionProps) {
  const newGuest = (): IGuestPost => {
    return {
      name: '',
      email: '',
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
        <p>Please let us know your postal address</p>
        <div className="guest">
          <ModelForm<IGuestPatch> key="patchForm" model={props.guestPatch} onSubmit={props.updateGuest}/>
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
          <ModelForm<IGuestPost> key="postForm" model={newGuest()} onSubmit={newGuest}/>
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
  
  const render = () => {
    if (props.updateComplete) {
      return renderComplete()
    } else if (props.name) {
      return renderAddressRequest()
    } else {
      return renderNotFound()
    }
  }

  return render()
}

export default AddressSection;
