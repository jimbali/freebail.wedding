import React from 'react'
import './styles.scss'
import { IGuestPatch } from '../../../state/interfaces/iGuestPatch'
import ModelForm from '../../molecules/modelForm'

interface IAddressSectionProps {
  guestPatch: IGuestPatch,
  name: string | null,
  updateComplete: boolean,
  updateGuest: (guestPatch: IGuestPatch) => void
}

function AddressSection(props: IAddressSectionProps) {
  const onSubmit = (model: IGuestPatch) => {
    props.updateGuest(model)
  }
  
  const render = () => {
    if (props.updateComplete) {
      return (
        <div className="addressSection">
          <h2>Thanks!</h2>
          <p>Keep an eye out for a message from us&#8230; :) x</p>
        </div>
      )
    } else {
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
  }

  return render()
}

export default AddressSection;
