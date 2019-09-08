import React from 'react'
import './styles.scss'
import { IGuestPatch } from '../../../state/interfaces/iGuestPatch'
import ModelForm from '../../molecules/modelForm'

interface IAddressSectionProps {
  name: string | null,
  guestPatch: IGuestPatch,
  updateGuest: (guestPatch: IGuestPatch) => void
}

function AddressSection(props: IAddressSectionProps) {
  const onSubmit = (model: IGuestPatch) => {
    props.updateGuest(model)
  }

  return (
    <div className="addressSection">
      <h2>Hi, {props.name}!</h2>
      <p>Please let us know your postal address</p>
      <div className="guest">
        <ModelForm<IGuestPatch> model={props.guestPatch} onSubmit={onSubmit}/>
      </div>
      <p>Thanks, Sarah &amp; Jim x</p>
    </div>
  )
}

export default AddressSection;
