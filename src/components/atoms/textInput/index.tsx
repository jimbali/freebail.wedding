import React from 'react'
import './styles.scss'

interface ITextInputProps {
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const TextInput = (props: ITextInputProps) => {
  return (
    <input type="text"
           className="textInput" 
           name={props.name}
           defaultValue={props.value}
           onChange={props.onChange}/>
  )
}

export default TextInput;
