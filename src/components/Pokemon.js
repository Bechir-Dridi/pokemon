import React from 'react'

export default function Pokemon({ name, pic, type }) {
    return (
        <div className='poke-container'>
            <img src={pic} alt="pokemonImg" />
            <p>{name}</p>
            <p>type: {type}</p>
        </div>
    )
}
