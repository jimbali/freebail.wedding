import React from 'react'
import SaveTheDate from '../../molecules/saveTheDate'
import './styles.scss'

interface IHeroSectionProps {
  backgroundImage: string
  centralWidget: typeof SaveTheDate
}

function HeroSection(props: IHeroSectionProps) {
  return (
    <div
      className="heroSection"
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
    >
    </div>
  )
}

export default HeroSection;
