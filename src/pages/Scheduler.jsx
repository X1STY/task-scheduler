export const Scheduler = ({ tasks }) => {
    return (
        <div>
        {tasks.map((task, index) => (
        <div key={index}>
          <p>Date: {task.date}</p>
          <p>Time: {task.time}</p>
          <p>Description: {task.description}</p>
        </div>
      ))}
    </div>
    )
}



export default Scheduler