import React from 'react'
import styled from 'styled-components'

const SignBtn = styled.button`
    max-width: 100px;
    padding: 10px 12px;
    background-color: #fc6722;
    border: 0;
    border-radius: 15px;
    color: white;
    font-size: 18px;
`

type signBtnProps = {
    mode: string,
}

export default function SignButton({ mode } : signBtnProps) {
  return (
    <SignBtn>
        Sign up
    </SignBtn>
  )
}
