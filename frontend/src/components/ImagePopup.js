function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_type_open-card ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__photo-container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__photo" alt={card.name} src={card.link} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
