interface Props {
  status: boolean
  updateStatus?: () => void
}
function Mole({ status, updateStatus }: Props) {
  return (
    <div className={`${status ? "bg-green-500" : "bg-gray-500"} `} onClick={updateStatus}>
      Mole
    </div>
  )
}
export default Mole
