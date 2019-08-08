/**
 * Variables Globales
 *
 */
declare var swal:any;

export class globalFunciones {

alertExito(mensaje)
{
swal({
type: 'success',
title: mensaje,
confirmButtonText: 'Aceptar',
allowOutsideClick: false,
allowEnterKey: false
});
}
alertAdvertencia(mensaje)
{
swal({
type: 'warning',
title: mensaje,
confirmButtonText: 'Aceptar',
allowOutsideClick: false,
allowEnterKey: false
});
}
alertError(mensaje)
{
swal({
type: 'error',
title: mensaje,
confirmButtonText: 'Aceptar',
allowOutsideClick: false,
allowEnterKey: false
});
}
} 
