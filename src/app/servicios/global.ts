/**
 * Variables Globales
 *
 */

export const GLOBAL = {
  url: 'http://34.73.219.147/farmacia2/',
  url_server: 'http://34.73.219.147/farmacia2/',
  pin: '697791A5-EC07-42B1-A5D2-540A2F403CFB',
  session: null,
  IdUsuario:"3",
  IdTbAplicacion:4,
  IdNodoOperador:"CAD392E0-8B82-4D89-A753-236E76B6D940",
  IdNodoAdministrador:"DE135EB1-72C6-4876-A2E0-D9F3D3C3DFA1",
  IdUnidad:"4AC95AD6-BD30-44D5-9D7F-254DAD89B279",
  TipoUsuarioAdministrador:"Administrador",
  TipoUsuarioOperador:"Operador",
  TipoUsuarioFuncionario:"Funcionario",
  PermisoServicioFuncionario:52,
  PermisoServicioOperador:51,
  PermisoServicioAdministrador:50,
  PermisoTipoProblemaFuncionario:55,
  PermisoTipoProblemaOperador:54,
  PermisoTipoProblemaAdministrador:53,
  PermisoReporteFuncionario:58,
  PermisoReporteOperador:57,
  PermisoReporteAdministrador:56,
}

export const DataTables={
  "pagingType": "full_numbers",
  "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
  "order": [[ 0, "asc" ]],
  dom: 'Bfrtip',
  buttons: [ {
      extend: 'excelHtml5',
      autoFilter: true,
      sheetName: 'Exported data'
  } ],
  responsive: true,
  language: {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
    "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ Entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "searchPlaceholder": "Buscar...",
    "zeroRecords": "Sin resultados encontrados",
    "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
    } 
  }
}


export const DataTablesExcel={
  dom: 'Bfrtip',
  buttons: [ {
      extend: 'excelHtml5',
      autoFilter: true,
      sheetName: 'Exported data'
  } ]
}
 
 