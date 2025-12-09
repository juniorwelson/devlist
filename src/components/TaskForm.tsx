import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles from "./TaskForm.module.css";
//Interface
import { ITask } from "../interface/Task";

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({ btnText, taskList,setTaskList ,task , handleUpdate}: Props) => {
  const [id, setid] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  const addTaskHabdler = (e: FormEvent) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, difficulty };
      setTaskList!([...taskList, newTask]);
      setTitle("");
      setDifficulty(0);
      console.log(taskList);
    }
      
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    if (task) {
      setid(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  },[task])

  return (
    <form className={styles.form} onSubmit={addTaskHabdler}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título da tarefa: </label>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nome da tarefa"
          required
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="title">Dificuldade da tarefa: </label>

        <input
          type="number"
          name="difficulty"
          id="difficulty"
          placeholder="Dificuldade da tarefa"
          required
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
