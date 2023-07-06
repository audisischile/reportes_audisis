import { defineStore } from "pinia";
import { ref } from "vue";

export const useTestData = defineStore("testData", () => {
  const datosCobertura = ref({
      "indicadores_globales": [
        {
          "ID_Cliente": 82,
          "logo": "https://iaudisis.com/audisis/archivos/foto_Cliente/logo_I-Audisis_Pernod_Ricard.png",
          "Cobertura_Programada_Mensual": "0",
          "Cobertura_Real_Mensual": "0",
          "Porcentaje_Cobertura_Mensual": "0.00",
          "Permanencia_Programada_Mensual": "0",
          "Permanencia_Real_Mensual": "0",
          "Porcentaje_Permanencia_Mensual": "0.00"
        }
      ],
      "porcentaje_cadena": [],
      "Detalle_Total": [
        {
          "Id_cliente": 82,
          "ID_Cadena": "3",
          "NombreCadena": "JUMBO",
          "ID_Local": "902",
          "PDO": "Jumbo Calama L614",
          "Usuario": "luis eduardo riasco granja ",
          "Id_usuario": "88924",
          "fecha": "2023-04-01",
          "NombrePermiso": "Sin Turno",
          "HoraEntrada": "Sin Turno",
          "HoraSalida": "Sin Turno",
          "MarcaEntrada": "-",
          "MarcaSalida": "-",
          "TiempoPermanenciaMinutos": null,
          "TiempoPermanenciaEstablecida": 0
        }
      ],
      "porcentaje_locales": [],
      "usuario_local": [
        {
          "Id_cliente": 82,
          "locales_programadas": 0,
          "locales_completados": 0,
          "locales_iniciados": 0,
          "locales_pendientes": 0
        }
      ]
  });

  return { datosCobertura };
});
