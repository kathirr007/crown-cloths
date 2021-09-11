import './FormInput.scss'

const FormInput = ({ handleChange, id, label, ...otherProps }) => (
  <div className='group'>
    <input
      onChange={handleChange}
      id={id || null}
      className='form-input'
      {...otherProps}
    />
    {label ? (
      <label
        htmlFor={id || ''}
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
)

export default FormInput
