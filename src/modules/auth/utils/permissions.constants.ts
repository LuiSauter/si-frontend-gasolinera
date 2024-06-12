export const PERMISSION_KEY = 'permissions'

export enum PERMISSION {
  // user
  USER = 'Usuario',
  USER_SHOW = 'Mostrar usuarios',
  ROLE = 'Rol',
  ROLE_SHOW = 'Mostrar roles',
  PERMISSION = 'Permiso',
  PERMISSION_SHOW = 'Mostrar permisos',

  // inventory
  PRODUCT = 'Producto',
  PRODUCT_SHOW = 'Mostrar productos',
  CATEGORY = 'Categoria',
  CATEGORY_SHOW = 'Mostrar categorias',
  GROUP = 'Grupo',
  GROUP_SHOW = 'Mostrar grupos',
  BATCH = 'Lote de producto',
  BATCH_SHOW = 'Mostrar lotes de producto',
  TANK = 'Tanque',
  TANK_SHOW = 'Mostrar tanques',
  FUEL = 'Combustible',
  FUEL_SHOW = 'Mostrar combustibles',
  PRODUCT_OUTPUT = 'Salida de producto',
  PRODUCT_OUTPUT_SHOW = 'Mostrar salidas de producto',

  // company
  COMPANY = 'Empresa',
  BRANCH = 'Sucursal',
  BRANCH_SHOW = 'Mostrar sucursales',
  BINNACLE = 'Bitacora',

  // sale
  DISCOUNT = 'Descuento',
  DISCOUNT_SHOW = 'Mostrar descuentos',
  SALE_NOTE = 'Nota de venta',
  SALE_NOTE_SHOW = 'Mostrar notas de venta',
  DISPENSER = 'Dispensador',
  DISPENSER_SHOW = 'Mostrar dispensadores',

  // buy
  PURCHASE_ORDER = 'Orden de compra',
  PURCHASE_ORDER_SHOW = 'Mostrar ordenes de compra',
  BUY_NOTE = 'Nota de compra',
  BUY_NOTE_SHOW = 'Mostrar notas de compra',
  PROVIDER = 'Proveedor',
  PROVIDER_SHOW = 'Mostrar proveedores',
}

export const modulePermissions = {
  empresa: [
    PERMISSION.COMPANY,
    PERMISSION.BRANCH,
    PERMISSION.BRANCH_SHOW,
    PERMISSION.BINNACLE
  ],
  ventas: [
    PERMISSION.DISCOUNT,
    PERMISSION.DISCOUNT_SHOW,
    PERMISSION.SALE_NOTE,
    PERMISSION.SALE_NOTE_SHOW,
    PERMISSION.DISPENSER,
    PERMISSION.DISPENSER_SHOW
  ],
  compras: [
    PERMISSION.PURCHASE_ORDER,
    PERMISSION.PURCHASE_ORDER_SHOW,
    PERMISSION.BUY_NOTE,
    PERMISSION.BUY_NOTE_SHOW
  ],
  usuario: [
    PERMISSION.USER,
    PERMISSION.USER_SHOW,
    PERMISSION.ROLE,
    PERMISSION.ROLE_SHOW,
    PERMISSION.PERMISSION,
    PERMISSION.PERMISSION_SHOW
  ],
  inventario: [
    PERMISSION.PRODUCT,
    PERMISSION.PRODUCT_SHOW,
    PERMISSION.CATEGORY,
    PERMISSION.CATEGORY_SHOW,
    PERMISSION.GROUP,
    PERMISSION.GROUP_SHOW,
    PERMISSION.BATCH,
    PERMISSION.BATCH_SHOW,
    PERMISSION.PROVIDER,
    PERMISSION.PROVIDER_SHOW,
    PERMISSION.PRODUCT_OUTPUT,
    PERMISSION.PRODUCT_OUTPUT_SHOW,
    PERMISSION.TANK,
    PERMISSION.TANK_SHOW,
    PERMISSION.FUEL,
    PERMISSION.FUEL_SHOW
  ]
}
