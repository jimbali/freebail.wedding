import React from 'react'
import './styles.scss'
import { IGuest } from '../../../state/interfaces/iGuest'
import ModelForm from '../../molecules/modelForm'

interface IAddressSectionProps {
  guest: IGuest,
  updateGuest: (guest: IGuest) => void
}

function AddressSection(props: IAddressSectionProps) {
  const onSubmit = (model: IGuest) => {
    props.updateGuest(model)
  }

  return (
    <div className="addressSection">
        <div className="guest">
          <ModelForm<IGuest> model={props.guest} onSubmit={onSubmit}/>
        </div>
    </div>
  )
}

export default AddressSection;
