interface IMole {
  active: boolean;
  onClick: (activeValue: number) => void;
  activeValue: number;
}
function Mole({ active, onClick, activeValue }: IMole) {
  return (
    <div
      data-testid="mole"
      className={`mole ${active ? "active" : ""} `}
      onClick={() => onClick(activeValue)}
    >
      Mole
    </div>
  );
}
export default Mole;
