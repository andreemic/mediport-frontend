import React from "react"

//rating from 0 to 1
function RatingCircle({rating, small}) {
    return <div
        className={`rating ${rating > 0.3 ? (rating > 0.6 ? 'good' : 'meh') : 'bad'} ${small ? 'small' : ''}`}
        style={{background: `conic-gradient(var(--rating-color-${rating > 0.3 ? (rating > 0.6 ? 'good' : 'meh') : 'bad'}) ${rating * 100}%, transparent 0 100%)`}}
    >
        <span>{Math.floor(rating * 100)} </span>
    </div>
}

export default RatingCircle