import { PrivateRoutes, PublicRoutes } from '@/utils'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col h-[100dvh] overflow-hidden bg-red-500'>
      <header className='flex gap-4'>
        <Link to={PublicRoutes.LANDING}>Landing</Link>
        <Link to={PublicRoutes.LOGIN}>Login</Link>
        <Link to={PublicRoutes.REGISTER}>Register</Link>

        <Link to={PrivateRoutes.DASHBOARD}>Dashboard</Link>
        <Link to={PrivateRoutes.USER}>User</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
