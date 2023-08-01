<template>
  <div class="row align-items-start me-1 mb-3 mt-3">
    <div class="col-5">
      <div class="row">
        <div class="col-11">
          <!-- <img :src="useStore.apiResponse.indicadores_globales[0].logo" class="logo"> -->
          <div class="titulo">Reporte de cobertura</div>
          <div class="sub-titulo">Muestra el detalle del cumplimiento de asistencia de los usuarios</div>
        </div>
        <div class="col-1">
        </div>
      </div>
    </div>
    <div class="col-7 p-3" style="background-color: #E8E8E8;">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-5">
          <label for="datepicker" class="titulo-fecha">Fecha inicio</label>
          <VueDatePicker v-model="useStore.fechaInicio" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
            selectText="Seleccionar" :format="diaFormateado" class="w-100"></VueDatePicker>
        </div>
        <div class="col-5">
          <label for="datepicker" class="titulo-fecha">Fecha de fin</label>
          <VueDatePicker v-model="useStore.fechaFin" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
            selectText="Seleccionar" :format="diaFormateado" class="w-100"></VueDatePicker>
        </div>
        <div class="col-2">
          <button class="btn mt-4 w-100"
            style="border-radius: 0; background-color: #ED3632; border-color: #BA0011; color: white;"
            @click="useStore.updateData(props.clientId)">Generar</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <!-- <select class="form-select w-100 filtro-select botonera" v-model="useStore.cadenaSeleccionada">
            <option value="0">Cadenas</option>
            <option v-for="item in cadenas" :value="item.ID_Cadena">{{ item.NombreCadena }}
            </option>
          </select> -->
          <div class="col-4 w-100">
            <div class="dropdown dropdown-custom text-center">
              <button class="btn w-100 btn-sm dropdown-toggle text-ellipsis" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ textoFiltroCadena }}
              </button>
              <div class="dropdown-menu dropdown-menu-custom w-100" aria-labelledby="dropdownMenuButton1">
                <!-- <form class="mx-2 my-2">
                  <input class="form-control" type="search" placeholder="Buscar" aria-label="Buscar"
                    v-model="cadenaSearchQuery">
                </form> -->
                <a class="dropdown-item" href="#" @click="limpiarCadena">
                  TODAS LAS CADENAS
                </a>
                <a class="dropdown-item" href="#" v-for="item in filteredCadenas" :value="item.ID_Cadena"
                  :key="item.ID_Cadena" @click="setCadena(item.ID_Cadena)">
                  {{ item.NombreCadena }}
                </a>
              </div>
            </div>
          </div>

        </div>
        <div class="col-4">
          <!-- <select class="form-select w-100 filtro-select botonera" v-model="useStore.localSeleccionado">
            <option value="0">PDO</option>
            <option v-for="item in pdos" :value="item.ID_Local">{{ item.PDO }}</option>
          </select> -->
          <div class="col-4 w-100">
            <div class="dropdown dropdown-custom text-center">
              <button class="btn w-100 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ textoFiltroPDO }}
              </button>
              <div class="dropdown-menu dropdown-menu-custom w-100" aria-labelledby="dropdownMenuButton1">
                <form class="mx-2 my-2">
                  <input class="form-control" type="search" placeholder="Buscar" aria-label="Buscar"
                    v-model="PDOSearchQuery">
                </form>
                <div class="scrollable-menu" style="max-height: 500px;">
                  <a class="dropdown-item" href="#" @click="limpiarLocal">
                    TODOS LOS LOCALES
                  </a>
                  <a class="dropdown-item" href="#" v-for="item in filteredLocales" :value="item.ID_Local"
                    :key="item.ID_Local" @click="setPDO(item.ID_Cadena, item.ID_Local)">
                    {{ item.PDO }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <!-- <select class="form-select w-100 filtro-select botonera" v-model="useStore.usuarioSeleccionado">
            <option value="0">Usuario</option>
            <option v-for="item in usuarios" :value="item.Id_usuario">{{ item.Usuario }}</option>
          </select> -->
          <div class="col-4 w-100">
            <div class="dropdown dropdown-custom text-center">
              <button class="btn w-100 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ textoFiltroUsuario }}
              </button>
              <div class="dropdown-menu dropdown-menu-custom w-100" aria-labelledby="dropdownMenuButton1">
                <form class="mx-2 my-2">
                  <input class="form-control" type="search" placeholder="Buscar" aria-label="Buscar"
                    v-model="usuarioSearchQuery">
                </form>
                <div class="scrollable-menu" style="max-height: 500px;">
                  <a class="dropdown-item" href="#" @click="limpiarUsuarios">
                    TODOS LOS USUARIOS
                  </a>
                  <a class="dropdown-item" href="#" v-for="item in filteredUsuarios" :value="item.Id_usuario"
                    :key="item.Id_usuario" @click="setUsuario(item.ID_Cadena, item.ID_Local, item.Id_usuario)">
                    {{ item.Usuario }}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { useApiStore } from '@/stores/conexiones.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  apiResponse: {
    type: Object,
    required: true
  },
  clientId: Number,

})

const useStore = useApiStore();

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

function diaFormateado(date) {
  const fecha = new Date(date);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();


  const diaFormateado = dia.toString().padStart(2, '0');
  const mesFormateado = mes.toString().padStart(2, '0');


  const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}
// Modelo de cadenas
const cadenas = useStore.apiResponse.modulo_filtros.reduce((result, item) => {
  if (!result.some((c) => c.ID_Cadena === item.ID_Cadena)) {
    result.push({ ID_Cadena: item.ID_Cadena, NombreCadena: item.NombreCadena, Id_usuario: item.Id_usuario, ID_Local: item.ID_Local });
  }
  return result;
}, []);

const cadenaSearchQuery = ref('');

const filteredCadenas = computed(() => {
  return cadenas
});


const setCadena = (id) => {
  useStore.cadenaSeleccionada = id;
  useStore.localSeleccionado = 0;
}

const textoFiltroCadena = computed(() => {
  const cadenaSeleccionadaObj = cadenas.find((item) => item.ID_Cadena === useStore.cadenaSeleccionada);

  // Si se encontró el objeto, devolver su NombreCadena, de lo contrario, devolver una cadena vacía
  return cadenaSeleccionadaObj ? cadenaSeleccionadaObj.NombreCadena : 'Cadenas';
});


const limpiarCadena = () => {
  useStore.cadenaSeleccionada = 0;
  useStore.localSeleccionado = 0;
  useStore.usuarioSeleccionado = 0;
}

// Puntos de venta

const pdos = useStore.apiResponse.modulo_filtros.reduce((result, item) => {
  if (useStore.cadenaSeleccionada === 0 || item.ID_Cadena === useStore.cadenaSeleccionada) {
    // Si cadenaSeleccionada es igual a 0 o ID_Cadena coincide con cadenaSeleccionada
    // Se añade el elemento al resultado
    if (!result.some((p) => p.ID_Local === item.ID_Local)) {
      result.push({ ID_Local: item.ID_Local, PDO: item.PDO, ID_Cadena: item.ID_Cadena });
    }
  }
  return result;
}, []);

const PDOSearchQuery = ref('');

const textoFiltroPDO = computed(() => {
  const PDOSeleccionadoObj = pdos.find((item) => item.ID_Local === useStore.localSeleccionado)
  return PDOSeleccionadoObj ? PDOSeleccionadoObj.PDO : 'Locales';
})


const setPDO = (id_cadena, id_local) => {
  useStore.cadenaSeleccionada = id_cadena;
  useStore.localSeleccionado = id_local;
}

const limpiarLocal = () => {
  useStore.localSeleccionado = 0
}

const filteredLocales = computed(() => {
  if (useStore.cadenaSeleccionada === 0) {
    return pdos.filter((item) => item.PDO?.toLowerCase().includes(PDOSearchQuery.value?.toLowerCase()));
  } else {
    return pdos.filter((item) => item.PDO?.toLowerCase().includes(PDOSearchQuery.value?.toLowerCase()) && item.ID_Cadena === useStore.cadenaSeleccionada);
  }
})


// Usuarios
const usuarios = useStore.apiResponse.modulo_filtros.reduce((result, item) => {
  if (!result.some((u) => u.Id_usuario === item.Id_usuario)) {
    result.push({ Id_usuario: item.Id_usuario, Usuario: item.Usuario, ID_Cadena: item.ID_Cadena, ID_Local: item.ID_Local });
  }
  return result;
}, []);

const usuarioSearchQuery = ref('');

const filteredUsuarios = computed(() => {
  if (useStore.cadenaSeleccionada === 0 && useStore.localSeleccionado === 0) {
    return usuarios.filter((item) => item.Usuario.toLowerCase().includes(usuarioSearchQuery.value?.toLowerCase()));
  } else if (useStore.cadenaSeleccionada !== 0 && useStore.localSeleccionado === 0) {
    return usuarios.filter(
      (item) =>
        item.ID_Cadena === useStore.cadenaSeleccionada &&
        item.Usuario.toLowerCase().includes(usuarioSearchQuery.value?.toLowerCase())
    );
  } else if (useStore.cadenaSeleccionada !== 0 && useStore.localSeleccionado !== 0) {
    return usuarios.filter(
      (item) =>
        item.ID_Cadena === useStore.cadenaSeleccionada &&
        item.ID_Local === useStore.localSeleccionado &&
        item.Usuario.toLowerCase().includes(usuarioSearchQuery.value?.toLowerCase())
    );
  } else {
    return [];
  }
});

const setUsuario = (id_cadena, id_local, id_usuario) => {
  useStore.usuarioSeleccionado = id_usuario;
  useStore.localSeleccionado = id_local;
  useStore.cadenaSeleccionada = id_cadena;
}

const limpiarUsuarios = () => {
  useStore.usuarioSeleccionado = 0;
}

const textoFiltroUsuario = computed(() => {
  const UsuarioSeleccionadoObj = usuarios.find((item) => item.Id_usuario === useStore.usuarioSeleccionado);
  return UsuarioSeleccionadoObj ? UsuarioSeleccionadoObj.Usuario : 'Usuarios';
});




</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
.titulo-fecha{
  font-size: 14px;
  color: #838383;
}
.btn {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-menu-custom {
  max-height: 500px;
  overflow-y: auto;
}

.scrollable-menu {
  display: block;
  max-height: 500px;
  overflow-y: auto;
}

.scrollable-menu .dropdown-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-custom {
  background-color: white;
}

.dropdown-toggle {
  text-transform: uppercase;
}

.botonera {
  border-radius: 0;
  background-color: #fcfcfc;
  color: rgb(48, 48, 48);
}

.logo {
  width: 150px;
}

.dropdown-custom {
  background-color: white;
}

.dropdown-menu-custom {
  font-size: 13px;
  text-transform: uppercase;
  
}

.dropdown-toggle {
  text-transform: uppercase;
}

.botonera {
  border-radius: 0;
  background-color: #fcfcfc;
  color: rgb(48, 48, 48);
}

.titulo {
  font-family: "Josefin Sans", sans-serif;
  font-size: 25px;
  text-transform: uppercase;
  color: #ED3632;
  font-weight: 800;
}

.sub-titulo {
  font-family: "Josefin Sans", sans-serif;
  font-size: 13px;
  color: #536c79;
  margin-top: 0.5em;
}
</style>