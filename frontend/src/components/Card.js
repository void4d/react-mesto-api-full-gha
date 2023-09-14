import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some((profile) => profile === currentUser._id)

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div>
      {isOwn && <button className="elements__delete-button" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>}
      <img className="elements__photo" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="elements__bottom-part">
        <h2 className="elements__heading">{card.name}</h2>
        <div className="elements__like-block">
          <button className={`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`} type="button" aria-label="Понравилось" onClick={handleLikeClick}></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
