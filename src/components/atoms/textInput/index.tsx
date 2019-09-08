import React from 'react'
import './styles.scss'

interface ITextInputProps {
  label: string,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const TextInput = (props: ITextInputProps) => {
  return (
    <div className="row">
      <label>{props.label}</label>
      <input
        type="text"
        className="textInput" 
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default TextInput;
