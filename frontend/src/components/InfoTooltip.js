import successIcon from '../images/success-icon.svg'
import failIcon from '../images/fail-icon.svg'

function InfoTooltip({ isSuccessful, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img src={isSuccessful ? successIcon : failIcon} className="popup__success-fail-icon"></img>
        <p className="popup__success-fail-text">{isSuccessful ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте еще раз.`}</p>
      </div>
    </div>
  )
}

export default InfoTooltip
