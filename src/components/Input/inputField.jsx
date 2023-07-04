import styles from './inputField.module.css'

export const InputField = () => {
    return (
        <input
        placeholder='Date'
        className={styles.input}
        type='date'
        id='taskDate'
        name='taskDate'
        required
      />
    )
}

//export default InputField