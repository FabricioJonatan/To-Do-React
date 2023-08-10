import './App.css';

import {useState, useEffect} from 'react'
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'

const API = 'http://localhost:5000'

function App() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [toDos, setToDos] = useState([])
  const [loading, setLoading] = useState(false)

	// Load To do on page Load
	useEffect(() => {
		const loadData = async() => {

			setLoading(true)

			const res = await fetch(`${API}/todos`)
			.then((res) => res.json())
			.then((data) => data)
			.catch((err) => console.log(err))

			setLoading(false)
			setToDos(res)
		}

		loadData()

	}, [])

	const handleSubmit = async (e)  =>  {
		e.preventDefault()
		
		const toDo = {
			id: Math.random(),
			title,
			time,
			done: false
		}

		await fetch(`${API}/todos`, {
			method: "POST",
			body: JSON.stringify(toDo),
			headers: {
				"Content-Type" : "application/json"
			}
		})

		setTime('')
		setTitle('')
	}

  return (
    <div className="App">
			<div className="todo-header">
				<h1>React To Do</h1>
			</div>
			<div className="form-todo">
				<h2>Insira Sua Próxima Tarefa : </h2>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label htmlFor="title">O que você fará?</label>
						<input
							type="text"
							name="title"
							placeholder='Titulo da Tarefa'
							onChange={(e) => {setTitle(e.target.value)}}
							value={title || ''}
							required
						/>
					</div>
					<div className="form-control">
						<label htmlFor="title">Duração : </label>
						<input
							type="number"
							name="time"
							placeholder='Duração da Tarefa (em horas)'
							onChange={(e) => {setTime(e.target.value)}}
							value={time || ''}
							required
						/>
					</div>
					<input className='add-btn' type="submit" value="Adicionar Tarefa"/>
				</form>
			</div>
			<div className="todo-list">
				<h2>Lista De Tarefas :</h2>
				{toDos.length === 0 && <p>Não há itens na lista ainda!</p>}
				{toDos.map((toDo) => (
					<div className="toDo" key={toDo.id}>
						<p>{toDo.title}</p>
					</div>
				))}
			</div>
    </div>
  );
}

export default App;
