import React, {ReactChild} from 'react'
import './styles.scss'
import TextInput from '../../atoms/textInput'

interface IModelFormProps {
  model: Object
}

const ModelForm = (props: IModelFormProps) => {
  const model = props.model

  let inputs: ReactChild[] = [];

  Object.entries(model).map((entry) => {
    const field = entry[0]
    const value = entry[1]
    
    if(typeof field === 'string') {
      inputs.push(<TextInput value={value}/>)
    } else {
      inputs.push(<p>feck</p>)
    }
  })

  return (
    <form className="modelForm">
      {inputs}
    </form>
  )
}

export default ModelForm;