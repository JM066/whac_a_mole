import { ElementType } from "react"

const Color = {
  Default: "text-gray-800",
} as const

interface Props {
  as?: ElementType
  text: string
  color?: keyof typeof Color
}
//Add more props
export default function Typography(props: Props) {
  const { as, text } = props
  const Text = as || "div"

  return <Text>{text}</Text>
}
