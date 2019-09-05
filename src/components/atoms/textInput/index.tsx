import React from 'react'
import './styles.scss'

interface ITextInputProps {
  value: string | number
}

const TextInput = (props: ITextInputProps) => {
  return (
    <input type="text" className="textInput" value={props.value}/>
  )
}

export default TextInput;
