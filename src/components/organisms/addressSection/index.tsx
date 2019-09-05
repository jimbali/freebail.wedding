import React from 'react'
import './styles.scss'
import { IGuest } from '../../../state/interfaces/iGuest'
import ModelForm from '../../molecules/modelForm'

interface IAddressSectionProps {
  guest: IGuest;
}

function AddressSection(props: IAddressSectionProps) {
  return (
    <div className="addressSection">
        <div className="guest">
          <ModelForm model={props.guest}/>
        </div>
    </div>
  )
}

export default AddressSection;
