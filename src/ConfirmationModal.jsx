export default function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <dialog open>
      <h2>Are you sure?</h2>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </dialog>
  );
}
