export interface ApiSucursal {
  id: string
  nombre: string
  direccion: string
  telefono?: string
  correo?: string
  isSuspended: boolean
}

export interface Branch {
  id: string
  name: string
  address: string
  phone?: string
  email?: string
  isSuspended: boolean
}

export interface BranchData {
  countData: number
  data: Branch[]
}

export interface CreateApiSucursal extends Omit<ApiSucursal, 'id' | 'isSuspended'> { }
export interface CreateBranch extends Omit<Branch, 'id' | 'isSuspended'> { }
