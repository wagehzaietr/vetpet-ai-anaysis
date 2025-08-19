import { ShimmeringText } from '@/components/ui/ShimmeringText'
import React from 'react'

function loading() {
  return (
    <div className=' absolute inset-0 bg-black/80 flex items-center justify-center z-50'>
      <ShimmeringText text='now laoding...'/>
    </div>
  )
}

export default loading