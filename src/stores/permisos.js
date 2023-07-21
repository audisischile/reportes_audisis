import { defineStore } from "pinia";
import { ref } from "vue";

export const usePermisosStore = defineStore("permisos", () => {
    const permisosData = ref([
        {
          "ID_Permiso": 0,
          "NombrePermiso": "Dia Normal",
          "Resumen": "DN"
        },
        {
          "ID_Permiso": 1,
          "NombrePermiso": "Sin Turno",
          "Resumen": "ST"
        },
        {
          "ID_Permiso": 2,
          "NombrePermiso": "Permiso por Capacitaciones",
          "Resumen": "PC"
        },
        {
          "ID_Permiso": 3,
          "NombrePermiso": "Permiso por Reuniones",
          "Resumen": "PR"
        },
        {
          "ID_Permiso": 4,
          "NombrePermiso": "Permiso Trabajo en Terreno",
          "Resumen": "PR"
        },
        {
          "ID_Permiso": 5,
          "NombrePermiso": "Permiso Apoyo Campaña",
          "Resumen": "PAC"
        },
        {
          "ID_Permiso": 6,
          "NombrePermiso": "Amamantamiento(FUERO)",
          "Resumen": "AMA"
        },
        {
          "ID_Permiso": 8,
          "NombrePermiso": "Permiso Administrativo sin goce de Sueldo",
          "Resumen": "PAGS"
        },
        {
          "ID_Permiso": 9,
          "NombrePermiso": "Pre-Natal",
          "Resumen": "PRN"
        },
        {
          "ID_Permiso": 10,
          "NombrePermiso": "Post-Natal",
          "Resumen": "PON"
        },
        {
          "ID_Permiso": 12,
          "NombrePermiso": "Fallecimiento",
          "Resumen": "FA"
        },
        {
          "ID_Permiso": 13,
          "NombrePermiso": "Local cubierto Gestor sin teléfono",
          "Resumen": "LCGT"
        },
        {
          "ID_Permiso": 14,
          "NombrePermiso": "Feriado",
          "Resumen": "FE"
        },
        {
          "ID_Permiso": 15,
          "NombrePermiso": "Permiso por Nacimiento",
          "Resumen": "PN"
        },
        {
          "ID_Permiso": 32,
          "NombrePermiso": "Permiso por Matrimonio",
          "Resumen": "PM"
        },
        {
          "ID_Permiso": 33,
          "NombrePermiso": "Permiso Sindical",
          "Resumen": "PS"
        },
        {
          "ID_Permiso": 34,
          "NombrePermiso": "Permiso administrativo con goce de sueldo",
          "Resumen": "PAG"
        },
        {
          "ID_Permiso": 35,
          "NombrePermiso": "Vacaciones",
          "Resumen": "V"
        },
        {
          "ID_Permiso": 36,
          "NombrePermiso": "Licencia",
          "Resumen": "L"
        },
        {
          "ID_Permiso": 38,
          "NombrePermiso": "Desvinculación",
          "Resumen": "D"
        },
        {
          "ID_Permiso": 39,
          "NombrePermiso": "Marcación por Contigencia",
          "Resumen": "MC"
        },
        {
          "ID_Permiso": 40,
          "NombrePermiso": "Cobertura Preventas Agrosuper",
          "Resumen": "CPA"
        },
        {
          "ID_Permiso": 41,
          "NombrePermiso": "Local Cerrado Permiso Con Goce De Sueldo",
          "Resumen": "LCPS"
        },
        {
          "ID_Permiso": 43,
          "NombrePermiso": "operacion",
          "Resumen": "O"
        },
        {
          "ID_Permiso": 44,
          "NombrePermiso": "No permiten ingreso permiso con goce de sueldo",
          "Resumen": "NIGS"
        },
        {
          "ID_Permiso": 45,
          "NombrePermiso": "No permiten ingreso Local en Remodelación",
          "Resumen": "NILR"
        },
        {
          "ID_Permiso": 46,
          "NombrePermiso": "Renuncia Voluntaria",
          "Resumen": "rvol"
        },
        {
          "ID_Permiso": 47,
          "NombrePermiso": "Permiso Fallecimiento Familiar",
          "Resumen": "NULL"
        },
        {
          "ID_Permiso": 48,
          "NombrePermiso": "No marca en app",
          "Resumen": "NULL"
        },
        {
          "ID_Permiso": 49,
          "NombrePermiso": "Permiso por Visita Medico",
          "Resumen": "NULL"
        },
        {
          "ID_Permiso": 50,
          "NombrePermiso": "Permiso Tiempo Extra otro local",
          "Resumen": "NULL"
        }
      ]);      

    return{
        permisosData
    }
});