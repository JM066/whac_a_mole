import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export const Theme = {
  Custom: "",
  Default: "text-white bg-gray-400 border",
  Inverted: "text-bprimary bg-white border border-solid border-gray-500 hover:text-gray-500",
  Ghost: "border-none bg-transparent outline-none",
  Clean: "bg-white border border-solid border-gray-200",
} as const

export const Size = {
  Custom: "",
  XSmall: "h-8 w-16",
  Small: "h-10 w-24",
  Medium: "h-10 w-40",
  Large: "h-12 w-64",
  Expand: "h-10 w-full",
  Full: "w-full h-full",
  Default: "w-auto h-auto",
} as const

export const Shape = {
  Default: "rounded-md",
  None: "rounded-none",
  RoundedSm: "rounded-sm",
  RoundedLg: "rounded-lg",
  RoundedXl: "rounded-xl",
  RoundedFull: "ounded-full",
} as const

interface Props {
  onClick?: () => void
  children?: ReactNode
  className?: string
  theme?: keyof typeof Theme
  shape?: keyof typeof Shape
  size?: keyof typeof Size
  type?: "button" | "submit" | "reset"
  isDisabled?: boolean
}

function Button(props: Props) {
  const {
    onClick,
    children,
    className,
    theme = "Default",
    shape = "Default",
    size = "Custom",
    type = "button",
    isDisabled,
  } = props

  const classNames: string = twMerge(
    className,
    Theme[theme],
    Shape[shape],
    Size[size],
    "p-0 flex flex-col items-center justify-center"
  )

  return (
    <button
      data-testid="mole"
      type={type}
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
