'use client'

import AiAnalysis from '@/components/Ai-analysis'
import { useChat } from '@ai-sdk/react'
import React, { useState } from 'react'



function page() {
  const [input,setInput] = useState('')
  const {messages,sendMessage,status,error} = useChat()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({text: input})
    setInput('')
  }
  return (
    <div className=' pt-20'>

      <AiAnalysis/>

    </div>
  )
}

export default page