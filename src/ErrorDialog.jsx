export default function ErrorDialog({ onOk }) {
  return (
    <dialog open>
      <h2>Exercise already exists.</h2>
      <button onClick={onOk}>Ok</button>
    </dialog>
  );
}
