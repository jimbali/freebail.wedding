import React, { ReactChild } from 'react'
import './styles.scss'

interface IHeroSectionProps {
  backgroundImage: string
  centralWidget: ReactChild;
}

function HeroSection(props: IHeroSectionProps) {
  return (
    <div
      className="heroSection"
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
    >
        <div className="centralWidget">
            {props.centralWidget}
        </div>
    </div>
  )
}

export default HeroSection;
