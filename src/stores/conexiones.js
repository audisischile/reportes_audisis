import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed, watch } from "vue";

export const useApiStore = defineStore("api", () => {
  const apiResponse = ref(null);
  const loading = ref(false);
  const updating = ref(false);
  const error = ref(null);
  const cadenas = ref([]);
  const cadenaSeleccionada = ref(0);
  const localSeleccionado = ref(0);
  const usuarioSeleccionado = ref(0);
  const fechaInicio = ref(new Date());
  const fechaFin = ref(new Date());
  const clientId = ref(0);




  //Modo de prueba desde TEST API
  const devMode = false;

  const resetData = () => {
    apiResponse.value = null;
    loading.value = false;
    error.value = null;
    cadenas.value = [];
    cadenaSeleccionada.value = 0;
    localSeleccionado.value = 0;
    usuarioSeleccionado.value = 0;
    fechaInicio.value = new Date();
    fechaFin.value = new Date();
  }

  const getData = async () => {
    loading.value = true;
    try {
      const response = await axios.post(
        "https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
        // "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
        {
          id_cliente: clientId.value,
          fecha_inicio: fechaParaQuery(fechaInicio.value),
          fecha_fin: fechaParaQuery(fechaFin.value),
          // fecha_inicio: "2023-01-04",
          // fecha_fin: "2023-01-10",
          id_usuarios: [],
          id_locales: [],
          id_cadenas: [],
        }
      );

      if (typeof response.data === "string") {
        const reg = /\uFEFF/g;
        const newResponse = response.data.trim().replace(reg, "");
        apiResponse.value = JSON.parse(newResponse);
        cadenas.value = apiResponse.value.porcentaje_cadena;
      } else {
        apiResponse.value = null;
      }

      loading.value = false;
      // Verificar si apiResponse.value no es null antes de acceder a las propiedades
      if (apiResponse.value !== null) {
        cadenas.value = apiResponse.value.porcentaje_cadena;
        console.log(apiResponse.value.porcentaje_cadena)
      } else {
        cadenas.value = [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const updateData = async () => {
    updating.value = true;
    try {
      const response = await axios.post(
        "https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
        // "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
        {
          id_cliente: clientId.value,
          fecha_inicio: fechaParaQuery(fechaInicio.value),
          fecha_fin: fechaParaQuery(fechaFin.value),
          // fecha_inicio: "2023-01-04",
          // fecha_fin: "2023-01-10",
          id_usuarios: [usuarioSeleccionado.value],
          id_locales: [localSeleccionado.value],
          id_cadenas: [cadenaSeleccionada.value],
        }
      );

      console.log(cadenaSeleccionada.value);
      if (typeof response.data === "string") {
        const reg = /\uFEFF/g;
        const newResponse = response.data.trim().replace(reg, "");
        apiResponse.value = JSON.parse(newResponse);
        cadenas.value = apiResponse.value.porcentaje_cadena;
      } else {
        apiResponse.value = null;
      }

      updating.value = false;
      // Verificar si apiResponse.value no es null antes de acceder a las propiedades
      // if (apiResponse.value !== null) {
      //   cadenas.value = apiResponse.value.porcentaje_cadena;
      // } else {
      //   cadenas.value = [];
      // }
    } catch (error) {
      console.log(error);
    }
  };

  

  const localesFiltrados = computed(() => {
    const uniqueLocales = new Set();
    apiResponse.value.Detalle_Total.forEach((item) => {
      if (
        (cadenaSeleccionada.value === 0 || item.ID_Cadena === cadenaSeleccionada.value) &&
        (localSeleccionado.value === 0 || item.ID_Local === localSeleccionado.value)
      ) {
        uniqueLocales.add(item.ID_Local);
      }
    });
  
    const filteredLocales = Array.from(uniqueLocales).map((localId) => {
      return apiResponse.value.Detalle_Total.find((item) => item.ID_Local === localId);
    });
  
    return filteredLocales;
  });

  

  const UsuarioFiltrado = computed(() => {
    const uniqueUsers = new Set(); 
    apiResponse.value.Detalle_Total.forEach((item) => {
      if (
        (cadenaSeleccionada.value === 0 || item.NombreCadena === cadenaSeleccionada.value) &&
        (localSeleccionado.value === 0 || item.ID_Local === localSeleccionado.value) &&
        (usuarioSeleccionado.value === 0 || item.Id_usuario === usuarioSeleccionado.value)
      ) {
        uniqueUsers.add(item.Id_usuario);
      }
    });
  
    const filteredUsers = Array.from(uniqueUsers).map((userId) => {
      return apiResponse.value.Detalle_Total.find((item) => item.Id_usuario === userId);
    });
  
    return filteredUsers;
  });

  function fechaParaQuery(inputFecha) {
    const fecha = new Date(inputFecha);
  
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
  
    const diaFormateado = dia.toString().padStart(2, '0');
    const mesFormateado = mes.toString().padStart(2, '0');
  
    const fechaFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;
  
    return fechaFormateada;
  }
  
  function formatFecha(inputFecha) {
    const fecha = new Date(inputFecha);
  
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const anio = fecha.getFullYear();
  
    const diaFormateado = dia.toString().padStart(2, '0');
    const mesFormateado = mes.toString().padStart(2, '0');
  
    const fechaFormateada = `${diaFormateado}-${mesFormateado}-${anio}`;
  
    return fechaFormateada;
  }

  const updateClientId = (id) => {
    clientId.value = id;
    resetData();
    getData();
  }

  watch(cadenaSeleccionada, () => {
    updateData()
  })
  
  watch(localSeleccionado, () => {
    updateData()
  })
  
  watch(usuarioSeleccionado, () => {
    updateData()
  })

  return {
    getData,
    loading,
    error,
    apiResponse,
    cadenas,
    cadenaSeleccionada,
    localSeleccionado,
    localesFiltrados,
    usuarioSeleccionado,
    UsuarioFiltrado,
    fechaInicio,
    fechaFin,
    updating,
    updateData,
    resetData, 
    clientId,
    updateClientId,
  };
});
