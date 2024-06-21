import { type IFormProps } from '@/models'

function buyForm({ buttonText, title }: IFormProps) {
  return (
    <div>{buttonText + title}</div>
  )
}

export default buyForm
