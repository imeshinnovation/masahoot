import React from 'react'
import Questions from '../components/Questions'

function Askins(props) {

    const { idioma, categoria } = props

  return (
    <div>
        <Questions categoria={categoria} language={idioma} />
    </div>
  )
}

export default Askins