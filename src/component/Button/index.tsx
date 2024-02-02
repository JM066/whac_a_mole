interface IButton {
  onClick?: () => void
  className: string
}
//Todo: Add more props
function Button({ onClick, className, children }: React.PropsWithChildren<IButton>) {
  return (
    <button data-testid="mole" className={className} onClick={onClick}>
      {children}
    </button>
  )
}
export default Button
