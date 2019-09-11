import { mount, shallow } from 'enzyme'
import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import TextInput from './index'

const mockFn = jest.fn()

describe(TextInput, () => {
  let label = 'Name'
  let name = 'name'
  const onChange = mockFn
  let value = 'Bobbles'

  const instance = () => {
    return <TextInput label={label} name={name} onChange={onChange} value={value}/>
  }

  it('should render without exploding', () => {
    const renderer = createRenderer()
    renderer.render(instance())
    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })

  it('renders any given label', () => {
    label = 'New Label'
    const textInput = mount(instance())
    expect(textInput.find('label').text()).toEqual(label)
  })

  it('renders any given name', () => {
    name = 'New Name'
    const textInput = mount(instance())
    expect(textInput.find('input').prop('name')).toEqual(name)
  })

  it('renders any given value', () => {
    value = 'New Value'
    const textInput = mount(instance())
    expect(textInput.find('input').prop('defaultValue')).toEqual(value)
  })

  it('calls the mock function when the input is changed', () => {
    const textInput = shallow(instance())
    const input = textInput.find('input')
    const changeEvent = { target: { value: 'Hello' } }

    input.simulate('change', changeEvent)
    expect(mockFn.mock.calls[0][0]).toStrictEqual(changeEvent)
  })
})
