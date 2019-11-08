import React from 'react'
import './styles.scss'

interface ITextInputProps {
  label: string,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const TextInput = (props: ITextInputProps) => {
  let id = 'text-input-' + props.name
  return (
    <div className="row">
      <label htmlFor={id}>{props.label}</label>
      <input
        id={id}
        type="text"
        className="textInput"
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
        placeholder={props.label}
      />
    </div>
  )
}

export default TextInput
