export default function ErrorDialog(props) {
  const { onOk, children } = props;
  return (
    <dialog open>
      {children}
      <button onClick={onOk}>Ok</button>
    </dialog>
  );
}
