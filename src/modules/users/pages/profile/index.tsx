import { type RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const ProfilePage = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user)
  console.log(user)
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage
