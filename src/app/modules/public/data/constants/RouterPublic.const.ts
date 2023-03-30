export const RouterPublic = {
  MODULE_HOME    : "",
  MODULE_DEFAULT : "**",
  MODULE_AUTH : {
   NAME    : "auth",
   CHILDREN: {
     LOGIN : "login"
   }
  },
  CONTAINER : {
   NAME    : "menu/modulos",
   MODULE_RISK : {
     NAME  : "riesgos",
     CHILDREN: {
       RETENER_TRANSACCION       : "retenerTransaccion",
       CONSULTA_RETENCIONES      : "consultaRetenciones",
       LEVANTAR_RETENCION        : "levantarRetencion",
       AMPLIAR_PERIODO_RETENCION : "ampliarPeriodoRetencion",
       CONFIRMAR_MALA_PRACTICA   : "confirmacionMalaPractica"
     }
    },
    MODULE_CLIENT_SUPPORT : {
     NAME  : "atencionCliente",
     CHILDREN: {
       CONSULTA_TRANSACCION_PGS  : "consultaTransacciones",
       POSICION_CLIENTE          : "consultaPosicionCliente"
     }
    }
  },
  MODULE_CLIENT_SUPPORT : {
   NAME   : "menu/modulos/atencionCliente",
   CHILDREN: {
     CONSULTA_TRANSACCION_PGS    : "consultaTransacciones",
     POSICION_CLIENTE            : "consultaPosicionCliente"
   }
  },
};
