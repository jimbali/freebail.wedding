import React from 'react'

interface ILongScrollProps {
  children: React.ReactNode
}

function LongScroll(props: ILongScrollProps) {
  return (
    <div className="longScroll">
      {
        props.children
      }
    </div>
  )
}

export default LongScroll
