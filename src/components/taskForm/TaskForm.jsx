
import styles from './TaskForm.module.css';

const TaskForm = () => {

  return (
    <form className={styles.form}>
     
      <label className={styles.label} htmlFor="" >Choose date</label>

      <input
        placeholder='Date'
        className={styles.input}
        type='date'
        id='taskDate'
        name='taskDate'
        required
      />

      <label className={styles.label} htmlFor="" >Choose time</label>

      <input
        placeholder='Time'
        className={styles.input}
        type='time'
        id='taskTime'
        name='taskTime'
        required
      />

      <textarea
        placeholder='Description'
        className={styles.desc}
        id='description'
        name='description'
        required
      />    

    </form>
  );
};

export default TaskForm;
