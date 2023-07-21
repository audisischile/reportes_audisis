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
        // "https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
        "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
        {
          id_cliente: 82,
          // fecha_inicio: fechaParaQuery(fechaInicio.value),
          // fecha_fin: fechaParaQuery(fechaFin.value),
          fecha_inicio: "2023-01-04",
          fecha_fin: "2023-01-10",
          id_usuarios: [],
          id_locales: [],
          id_cadenas: [],
        }
      );

      const reg = /\uFEFF/g;
      const newResponse = response.data.trim().replace(reg, "");
      apiResponse.value = JSON.parse(newResponse);
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
    cadenas.value = apiResponse.value.porcentaje_cadena;
  };

  const updateData = async () => {
    updating.value = true;
    try {
      const response = await axios.post(
        "https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
        {
          id_cliente: 82,
          fecha_inicio: fechaParaQuery(fechaInicio.value),
          fecha_fin: fechaParaQuery(fechaFin.value),
          id_usuarios: [usuarioSeleccionado.value],
          id_locales: [localSeleccionado.value],
          id_cadenas: [cadenaSeleccionada.value],
        }
      );
        
      console.log(cadenaSeleccionada.value)
      const reg = /\uFEFF/g;
      const newResponse = response.data.trim().replace(reg, "");
      apiResponse.value = JSON.parse(newResponse);
      updating.value = false;
    } catch (error) {
      console.log(error);
    }
    
  }

  const localesFiltrados = computed(() => {
    if (localSeleccionado.value === 0) {
      return apiResponse.value.Detalle_Total;
    } else {
      return apiResponse.value.Detalle_Total.filter(
        (item) => item.ID_Cadena === cadenaSeleccionada.value
      );
    }
  });

  const UsuarioFiltrado = computed(() => {
    if (cadenaSeleccionada.value === 0 && localSeleccionado.value === 0) {
      return apiResponse.value.Detalle_Total;
    } else if (cadenaSeleccionada.value.length !== 0) {
      return apiResponse.value.Detalle_Total.filter(
        (item) => item.NombreCadena === cadenaSeleccionada.value
      );
    } else if (PDOElegido.value.length !== 0) {
      return apiResponse.value.Detalle_Total.filter(
        (item) => item.PDO === PDOElegido.value
      );
    } else {
      return apiResponse.value.Detalle_Total.filter(
        (item) =>
          item.NombreCadena === cadenaSeleccionada.value &&
          item.PDO === PDOElegido.value
      );
    }
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
    resetData
  };
});
