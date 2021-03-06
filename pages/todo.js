import { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css'
const Todo = () => {

    // const [tasks, setTasks] = useState([
    //     { id: 1, name: 'Reading a book' },
    //     { id: 2, name: 'Sleep at night' }
    // ])


    const [tasks, setTasks] = useState([])

    useEffect(async () => {
        let ts = await getTasks();
        console.log(ts)
        setTasks(ts)
    }, [])


    const [age, setAge] = useState('')


    const [name, setName] = useState('')


    const [idEdit, setidEdit] = useState(0)
    const renderTask = () => {
        // return tasks.map((task)=>{
        //     console.log(task.id ,task.name);
        //     return (<li>{task.id} {task.name}</li>)

        // })
        return tasks.map((task, index) =>
        (<li key={index} className={styles.listItem}>
            {index + 1 + ') '}
            {(+idEdit !== +task.id) ? task.name :
                (<input type="text" className={styles.text}

                    value={name}
                    onChange={(e) => setName(e.target.value)}>

                </input >)}
            {(+idEdit !== +task.id) ? ' age : ' +task.age :
                (<input type="text" className={styles.text}

                    value={age}
                    onChange={(e) => setAge(e.target.value)}>

                </input >)}                           
            
            <div className={styles.buttonContainer}>
                <button onClick={() => editTask(task.id, task.name, task.age)} className={`${styles.button} ${styles.btnEdit}`}>Edit</button>
                <button onClick={() => deleteTask(task.id)} className={`${styles.button} ${styles.btnDelete}`}
                >Delete</button>
            </div>

        </li>))
    }
    const editTask = (id) => {
        console.log('Edit Task', id);
        setidEdit(id)
        let t = tasks.find((task) => +task.id === +id)
        setName(t.name)
        setAge(t.age)
        if (+idEdit === +id) { //Press Edit again
            let newTasks = tasks.map((task, index) => {
                if (+task.id === +id){
                    tasks[index].name = name
                    tasks[index].age = age
                }
                   
                return task
            })
            setTasks(newTasks)
            setidEdit(0)
        }

    }
    const deleteTask = (id) => {
        console.log('Delete');
        const newTasks = tasks.filter((task) => (task.id !== +id))
        setTasks(newTasks)
    }

    const addTask = () => {
        console.log('Add!!');
        if (tasks.length > 9) {
            alert(' Task name ได้ไม่เกิน 10 Tasks')
        }
        else if (name.trim() !== '') {

            const id = [tasks.length - 1] < 0 ? 1 : tasks[tasks.length - 1].id + 1;
            setTasks([...tasks, { id: id, name: name,age: age }])

        }


        console.log('Tasks:', tasks);

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo</h1>
            <div className="addContainer">

                <input type="text" onChange={(e) => setName(e.target.value)} ></input>
                <input type="number" onChange={(e) => setAge(e.target.value)} ></input>
                <button onClick={addTask} className={`${styles.button} ${styles.btnAdd}`}
                >Add</button>
            </div>
            <ul className={styles.list}>
                {renderTask()}
            </ul>
        </div>

    )
}
const getTasks = async () => {
    const res = await fetch('http://localhost:8000/')
    const json = await res.json()
    console.log(json)
    return json;
}




export default Todo