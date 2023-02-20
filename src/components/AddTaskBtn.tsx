import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const AddButton = styled.button`
  width: 100%;
  padding: 20px 0;
  background-color: #fc6722;
  color: white;
  border: 0;
  font-size: 18px;
  border-radius: 15px;
`

export default function AddTaskBtn() {

  const navigate = useNavigate();

  return (
      <Link to='/task'>
      <AddButton>New task</AddButton>
      </Link>
  )
}
