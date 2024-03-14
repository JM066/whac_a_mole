interface Props {
  letter: string
  status: string
}

function Letter(props: Props) {
  const { letter, status } = props

  return <div className={`tile ${status}`}>{letter}</div>
}
export default Letter
