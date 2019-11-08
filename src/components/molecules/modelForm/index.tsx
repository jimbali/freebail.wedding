import React, {ReactChild} from 'react'
import TextInput from '../../atoms/textInput'
import './styles.scss'

interface IModelFormProps<T extends object> {
  labels?: { [key: string]: string },
  model: T,
  onSubmit: (model: T) => void
}

interface IModelFormState<T extends object> {
  model: T
}

class ModelForm<T extends object> extends React.Component<IModelFormProps<T>, IModelFormState<T>> {
  constructor(props: IModelFormProps<T>) {
    super(props)
    this.state = {
      model: props.model
    }
  }

  public render() {
    return (
      <form className="modelForm" onSubmit={this.onSubmit.bind(this)}>
        {this.inputs()}
        <input type="submit" value="Send"/>
      </form>
    )
  }

  public handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState((prevState) => ({
      model: {
        ...prevState.model,
        [name]: value
      }
    }))
  }

  private inputs(): ReactChild[] {
    return Object.entries(this.state.model).map((entry, index) => {
      const name = entry[0]
      const value = entry[1]

      if (typeof name === 'string') {
        return (
          <TextInput
            name={name}
            value={value}
            label={this.getLabel(name)}
            key={index}
            onChange={this.handleInputChange.bind(this)}
          />
        )
      } else {
        return <p key={index}>feck</p>
      }
    })
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.props.onSubmit(this.state.model)
  }

  private getLabel(name: string): string {
    let labels = this.props.labels || {}
    if (labels[name]) return labels[name]

    return name
  }
}

export default ModelForm
