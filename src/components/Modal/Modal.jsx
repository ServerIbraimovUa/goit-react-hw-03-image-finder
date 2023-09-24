import { Overlay } from './Modal.styled';

const Modal = ({ photo, onShow }) => {
  return (
    <Overlay onClick={onShow}>
      <div>
        <img src={photo} alt="fcd" width="900" height="700" />
      </div>
    </Overlay>
  );
};

export default Modal;
