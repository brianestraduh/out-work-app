export default function ConfirmationModal(props) {
  const { onConfirm, onCancel, children } = props;
  return (
    <dialog open>
      {children}
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </dialog>
  );
}
