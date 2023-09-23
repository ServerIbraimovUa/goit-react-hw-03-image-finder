const Modal = photo => {
  return (
    <div class="overlay">
      <div class="modal">
        <img src={photo} alt="" />
      </div>
    </div>
  );
};

export default Modal;
