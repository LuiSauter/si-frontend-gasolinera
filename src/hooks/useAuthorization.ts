import { type PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { type User } from '@/modules/users/models/user.model'
import { type RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useAuth } from './useAuth'
import { authStatus } from '@/utils'

export const useAuthorization = () => {
  const { status } = useAuth()
  const data: User = useSelector((state: RootState) => state.user)

  const verifyPermission = (permissionRequired: PERMISSION[]) => {
    if (status === authStatus.authenticated) {
      return permissionRequired.some((permission) =>
        data?.role?.permissions?.some((rolePermission) =>
          rolePermission.permission.name === permission
        )
      )
    } else {
      return false
    }
  }

  return { verifyPermission }
}
