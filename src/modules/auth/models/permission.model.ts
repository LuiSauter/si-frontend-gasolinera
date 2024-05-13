import { type ApiBase } from '@/models/api-base'

export interface ApiPermission extends ApiBase {
  nombre: string
  descripcion: string
}

export interface ApiPermissions extends ApiBase {
  permiso: ApiPermission
}

export interface Permission extends ApiBase {
  name: string
  description: string
}

export interface Permissions extends ApiBase {
  permission: Permission
}

export interface PermissionUpdate extends Partial<Permission> {
  name: string
  description: string
}

export interface CreatePermission extends Omit<Permission, 'id' | 'createdAt' | 'updatedAt'> { }

interface IPermissionElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  description: HTMLInputElement
}

export interface IPermissionCustomForm extends HTMLFormElement {
  readonly elements: IPermissionElements
}
