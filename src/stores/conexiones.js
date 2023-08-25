import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed, watch } from "vue";

export const useApiStore = defineStore("api", () => {
  // const apiResponse = ref({});
  // const apiResponse = ref(null);
  const apiResponse = ref({
    indicadores_globales: [
      {
        Porcentaje_Cobertura_Mensual: 0,
        Porcentaje_Permanencia_Mensual: 0,
      },
    ],
    porcentaje_cadena: [],
  });
  const loading = ref(false);
  const updating = ref(false);
  const error = ref(null);
  const cadenas = ref([]);
  const cadenaSeleccionada = ref(0);
  const localSeleccionado = ref(0);
  const usuarioSeleccionado = ref(0);
  const fechaInicio = ref(new Date());
  const fechaFin = ref(new Date());
  let clientId = ref(0);

  //sistema de loading para el modulo
  const moduloListo = ref(true);


  //Modo de prueba desde TEST API
  const devMode = false;

  const resetData = () => {
    apiResponse.value = {};
    loading.value = false;
    error.value = null;
    cadenas.value = [];
    cadenaSeleccionada.value = 0;
    localSeleccionado.value = 0;
    usuarioSeleccionado.value = 0;
    fechaInicio.value = new Date();
    fechaFin.value = new Date();
    clientId.value = 0;
  };

  const getData = async () => {
    loading.value = true;
    try {
      const response = await axios.post(
        "http://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
        // "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
        {
          // id_cliente: 82,
          id_cliente: clientId.value,
          // fecha_inicio: fechaParaQuery(fechaInicio.value),
          // fecha_fin: fechaParaQuery(fechaFin.value),
          fecha_inicio: "2023-08-20",
          fecha_fin: "2023-08-25",
          id_usuarios: [],
          id_locales: [],
          id_cadenas: [],
        }
      );
      if (typeof response.data === "string") {
        const reg = /\uFEFF/g;
        const newResponse = response.data.trim().replace(reg, "");
        apiResponse.value = JSON.parse(newResponse);
        // console.log(
        //   apiResponse.value.porcentaje_cadena
        //     ? apiResponse.value.porcentaje_cadena
        //     : "No hay datos"
        // );
        cadenas.value = apiResponse.value.porcentaje_cadena;
      } else {
        apiResponse.value = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
      // moduloListo.value = false;
    }
  };

  // const updateData = async () => {
  //   updating.value = true;
  //   try {
  //     const response = await axios.post(
  //       // "http://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
  //       "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
  //       {
  //         id_cliente: clientId.value,
  //         // fecha_inicio: fechaParaQuery(fechaInicio.value),
  //         // fecha_fin: fechaParaQuery(fechaFin.value),
  //         fecha_inicio: "2023-01-04",
  //         fecha_fin: "2023-01-04",
  //         id_usuarios: [usuarioSeleccionado.value],
  //         id_locales: [localSeleccionado.value],
  //         id_cadenas: [cadenaSeleccionada.value],
  //       }
  //     );

  //     console.log(cadenaSeleccionada.value);
  //     if (typeof response.data === "string") {
  //       const reg = /\uFEFF/g;
  //       const newResponse = response.data.trim().replace(reg, "");
  //       apiResponse.value = JSON.parse(newResponse);
  //       cadenas.value = apiResponse.value.porcentaje_cadena;
  //     } else {
  //       apiResponse.value = null;
  //     }

  //     updating.value = false;
  //     // Verificar si apiResponse.value no es null antes de acceder a las propiedades
  //     // if (apiResponse.value !== null) {
  //     //   cadenas.value = apiResponse.value.porcentaje_cadena;
  //     // } else {
  //     //   cadenas.value = [];
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateData = async () => {
    updating.value = true;
    try {
      // console.log(fechaParaQuery(fechaInicio.value));
      // console.log(fechaParaQuery(fechaFin.value));
      // console.log(cadenaSeleccionada.value);
          const response = await axios.post(
            "http://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
            // "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
            {
              id_cliente: 82,
              fecha_inicio: fechaParaQuery(fechaInicio.value),
              fecha_fin: fechaParaQuery(fechaFin.value),
              // fecha_inicio: "2023-01-04",
              // fecha_fin: "2023-01-04",
              id_usuarios: [usuarioSeleccionado.value],
              id_locales: [localSeleccionado.value],
              id_cadenas: [cadenaSeleccionada.value],
            }
          );
      // console.log(response.data ? "Hay datos" : "No hay datos");
      if (typeof response.data === "string") {
        const reg = /\uFEFF/g;
        const newResponse = response.data.trim().replace(reg, "");
        apiResponse.value = JSON.parse(newResponse);
        cadenas.value = apiResponse.value.porcentaje_cadena;
      }
    } catch (error) {
      console.log(error);
    } finally {
      updating.value = false;
    }
  };

  const localesFiltrados = computed(() => {
    const uniqueLocales = new Set();
    apiResponse.value.Detalle_Total.forEach((item) => {
      if (
        (cadenaSeleccionada.value === 0 ||
          item.ID_Cadena === cadenaSeleccionada.value) &&
        (localSeleccionado.value === 0 ||
          item.ID_Local === localSeleccionado.value)
      ) {
        uniqueLocales.add(item.ID_Local);
      }
    });

    const filteredLocales = Array.from(uniqueLocales).map((localId) => {
      return apiResponse.value.Detalle_Total.find(
        (item) => item.ID_Local === localId
      );
    });

    return filteredLocales;
  });

  const UsuarioFiltrado = computed(() => {
    const uniqueUsers = new Set();
    apiResponse.value.Detalle_Total.forEach((item) => {
      if (
        (cadenaSeleccionada.value === 0 ||
          item.NombreCadena === cadenaSeleccionada.value) &&
        (localSeleccionado.value === 0 ||
          item.ID_Local === localSeleccionado.value) &&
        (usuarioSeleccionado.value === 0 ||
          item.Id_usuario === usuarioSeleccionado.value)
      ) {
        uniqueUsers.add(item.Id_usuario);
      }
    });

    const filteredUsers = Array.from(uniqueUsers).map((userId) => {
      return apiResponse.value.Detalle_Total.find(
        (item) => item.Id_usuario === userId
      );
    });

    return filteredUsers;
  });

  function fechaParaQuery(inputFecha) {
    const fecha = new Date(inputFecha);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const diaFormateado = dia.toString().padStart(2, "0");
    const mesFormateado = mes.toString().padStart(2, "0");

    const fechaFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;

    return fechaFormateada;
  }

  function formatFecha(inputFecha) {
    const fecha = new Date(inputFecha);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const diaFormateado = dia.toString().padStart(2, "0");
    const mesFormateado = mes.toString().padStart(2, "0");

    const fechaFormateada = `${diaFormateado}-${mesFormateado}-${anio}`;

    return fechaFormateada;
  }

  // const updateClientId = (id) => {
  //   clientId.value = id;
  //   resetData();
  //   getData();
  // };

  const setClientId = (id) => {
    clientId.value = id;
    getData();  // Llamando a getData después de establecer clientId
  };

  watch(cadenaSeleccionada, () => {
    updateData();
  });

  watch(localSeleccionado, () => {
    updateData();
  });

  watch(usuarioSeleccionado, () => {
    updateData();
  });

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
    formatFecha,
    updateData,
    resetData,
    clientId,
    setClientId,
    moduloListo,
  };
});
