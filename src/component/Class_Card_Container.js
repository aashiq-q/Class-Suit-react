import React from 'react'
import Class_Card from './Class_Card'
import { useUserClass } from '../context/UserClassContext'

const Class_Card_Container = () => {
  const { classes } = useUserClass();
  return (
	<div className='p-10 flex flex-wrap gap-8 justify-center md:justify-start'>
    {
      classes.map((classroom) => {
        return (
          <Class_Card key={classroom.id} id={classroom.id} data={classroom.data}/>
        )
      })
    }
  </div>
  )
}

export default Class_Card_Container