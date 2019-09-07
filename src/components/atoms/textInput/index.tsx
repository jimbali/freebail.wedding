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
    <label>
      {props.label}
      <input type="text"
            className="textInput" 
            name={props.name}
            defaultValue={props.value}
            onChange={props.onChange}/>
    </label>
  )
}

export default TextInput;
