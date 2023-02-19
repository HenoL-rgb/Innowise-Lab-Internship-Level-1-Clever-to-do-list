import { useState } from 'react'
import './App.css'
import Task from './pages/Task'

function App() {

  return (
    <div className="App">
      <Task title="task" mode='save'/>
    </div>
  )
}

export default App
