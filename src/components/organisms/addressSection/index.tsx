import React from 'react'
import './styles.scss'
import { IGuest } from '../../../state/interfaces/iGuest';

interface IAddressSectionProps {
  guest: IGuest;
}

function AddressSection(props: IAddressSectionProps) {
  return (
    <div className="addressSection">
        <div className="guest">
          {JSON.stringify(props.guest)}
        </div>
    </div>
  )
}

export default AddressSection;
