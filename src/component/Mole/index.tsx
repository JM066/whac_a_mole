interface Props {
  mole: boolean
  updateStatus?: () => void
}
function Mole({ mole, updateStatus }: Props) {
  return (
    //Todo: Add mole icons and styling
    <div className={`${mole ? "bg-green-500" : "bg-gray-500"} `} onClick={updateStatus}>
      Mole
    </div>
  )
}
export default Mole
