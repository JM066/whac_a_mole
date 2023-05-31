interface IMole {
  active: boolean;
  onClick: () => void;
}
function Mole({ active, onClick }: IMole) {
  return (
    <div
      data-testid="mole"
      className={`mole ${active ? "active" : ""} `}
      onClick={onClick}
    >
      Mole
    </div>
  );
}
export default Mole;
