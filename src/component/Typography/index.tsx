import { ElementType } from "react"

interface Props {
  as?: ElementType
}
export default function Typography(props: React.PropsWithChildren<Props>) {
  const Text = props.as || "div"

  return <Text>{props.children}</Text>
}
