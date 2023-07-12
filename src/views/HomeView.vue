<template>
  <div class="container" v-if="dataLoaded && apiResponse">
    <div class="row mt-5">
      <div class="col-5">
        <div class="row">
          <div class="col-3">
            <img :src="apiResponse.indicadores_globales[0].logo" class="logo">
          </div>
          <div class="col">
            <div class="row">
              <div class="col-12 titulo-reporte">
                Reporte cobertura
              </div>
              <div class="col-12 fecha-desde">
                {{ dateInicio ? formatFecha(dateInicio) : formatFecha(fechaHoy) }} - {{ dateFin ? formatFecha(dateFin) :
                  formatFecha(fechaHoy) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-7">
        <div class="row">
          <div class="col-5">
            <div class="col">
              <label for="datepicker">Seleccione fecha inicio:</label>
              <VueDatePicker v-model="dateInicio" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
                selectText="Seleccionar" :format="formatDesde"></VueDatePicker>
            </div>
          </div>
          <div class="col-5">
            <div class="col">
              <label for="datepicker">Selecciona fecha de fin:</label>
              <VueDatePicker v-model="dateFin" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
                selectText="Seleccionar" :format="formatHasta"></VueDatePicker>
            </div>
          </div>
          <div class="col-5 mt-2">
            <button class="btn btn-rango btn-sm" @click="filtrarFechas">Filtrar<i
                class="bi bi-calendar-range ms-2"></i></button>
          </div>
        </div>
        <div class="row mt-3" style="margin-left: 0px;">
          <select class="form-select filtros" aria-label="Default select example" v-model="cadenaElegida">
            <option selected value="">Cadena</option>
            <option v-for="item in cadenas" :value="item">{{ item }}</option>
          </select>
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>PDO</option>
              <option v-for="item in PDOFiltrado" value="1">{{ item.PDO }}</option>
            </select>
          </div>
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>Usuario</option>
              <option v-for="item in UsuarioFiltrado" value="1">{{ item.Usuario }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>

    <div class="dataDisplay" v-if="dataReloaded && apiResponse">
      <div class="row justify-content-center mt-5">
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="body mt-1">
            <div><span class="indicador-texto">Locales programados</span></div>
            <div><span class="indicador-numero">{{ apiResponse.usuario_local[0].locales_programadas }}</span></div>
          </div>
        </div>
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="body mt-1">
            <div><span class="indicador-texto">Locales completados</span></div>
            <div><span class="indicador-numero">{{ apiResponse.usuario_local[0].locales_completados }}</span></div>
          </div>
        </div>
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="body mt-1">
            <div><span class="indicador-texto">Locales iniciados</span></div>
            <div><span class="indicador-numero">{{ apiResponse.usuario_local[0].locales_iniciados }}</span></div>
          </div>
        </div>
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="body mt-1">
            <div><span class="indicador-texto">Locales pendientes</span></div>
            <div><span class="indicador-numero">{{ apiResponse.usuario_local[0].locales_pendientes }}</span></div>
          </div>
        </div>
      </div>

      <!-- <IndicadoresGlobales :apiResponse="apiResponse" /> -->

      <div class="card contenedor mt-4 shadow">
        <div class="row">
          <div class="col-3 align-self-start mt-5">
            <div class="kpi-cobertura">
              <div class="kpi-cobertura-titulo">
                % Cobertura
              </div>
              <div class="row">
                <div class="col-6 kpi-cobertura-num-grande">{{ apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual }}%</div>
                <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;"><i
                    class="bi bi-arrow-up-circle flecha-arriba"></i>
                  <span class="flecha"> 12%</span>
                </div>
              </div>
              <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100" style="height: 10px;">
                <div class="progress-bar"
                  :style="{ width: apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual + '%', backgroundColor: 'rgb(63, 121, 229)' }">
                </div>

              </div>
            </div>
            <div class="kpi-cobertura mt-5">
              <div class="kpi-cobertura-titulo">
                % Permanencia
              </div>
              <div class="row">
                <div class="col-6 kpi-cobertura-num-grande">{{
                  apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual }}%</div>
                <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;"><i
                    class="bi bi-arrow-down-circle flecha-abajo"></i>
                  <span class="flecha"> 12%</span>
                </div>
              </div>
              <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100" style="height: 10px;">
                <div class="progress-bar"
                  :style="{ width: apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual + '%', backgroundColor: 'rgb(10, 193, 156)' }">
                </div>

              </div>
            </div>
          </div>

          <div class="col-9">
            <div class="">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active titulo-graficos-globales" id="home-tab" data-bs-toggle="tab"
                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                    aria-selected="true">Gráfico</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link titulo-graficos-globales" id="profile-tab" data-bs-toggle="tab"
                    data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">DATOS
                    DEL
                    PERIODO</button>
                </li>
              </ul>
              <div class="tab-content mt-2" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <div class="col-12" style="height: 250px;">

                      <!-- Grafico Cobertura -->
                      <GraficoCobertura :apiResponse="apiResponse" />

                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div class="col-12">
                    <div class="card caja">
                      <div class="card-body">
                        <table class="table tabla-datos-periodo">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Cadena</th>
                              <th scope="col">Cobertura</th>
                              <th scope="col">Permanencia</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in apiResponse.porcentaje_cadena">
                              <th scope="row"><img :src="item.Logo_cadena" style="width: 45px;"></th>
                              <td>{{ item.NombreCadenaReal }}</td>
                              <td>{{ item.Porcentaje_Cobertura_Mensual }}%</td>
                              <td>{{ item.Porcentaje_Permanencia_Mensual }}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="card col-8 mt-3 tabla-por-usuario shadow mb-4">
          <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top"><i class="bi bi-info-circle"></i>
            PERMANENCIA POR LOCAL</h6>
          <div class="table-responsive">
            <table class="table titulo-tabla table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col" class="sticky-top">Día</th>
                  <th scope="col" class="sticky-top">Usuario</th>
                  <th scope="col" class="sticky-top">Locales programados</th>
                  <th scope="col" class="sticky-top">Locales completados</th>
                  <th scope="col" class="sticky-top">Locales iniciados</th>
                  <th scope="col" class="sticky-top">Pendientes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in apiResponse.porcentaje_locales">
                  <td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{
                    item.Fecha }}</td>
                  <td>{{ item.Usuario }}</td>
                  <td>{{ item.locales_programadas }}</td>
                  <td>{{ item.locales_completados !== 0 ? item.locales_completados : '-' }}</td>
                  <td>{{ item.locales_iniciados !== 0 ? items.locales_iniciados : '-' }}</td>
                  <td :class="{ 'table-danger': item.locales_pendientes > 0 }">{{ item.locales_pendientes !== 0 ? item.locales_pendientes : '-'}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div class="col-4">
          <div class="card" style="overflow-y: auto; height: 100%;">
            <div class="card-body">
              <GraficoUsuarios :datosUsuarios="apiResponse.porcentaje_locales" />
            </div>
          </div>
        </div>
      </div>


      <div class="card tabla-por-usuario shadow">
        <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top"><i class="bi bi-info-circle"></i>
          PERMANENCIA POR LOCAL</h6>
        <div class="table-responsive">
          <table class="table titulo-tabla table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="sticky-top">Día</th>
                <th scope="col" class="sticky-top">PDO</th>
                <th scope="col" class="sticky-top">Usuario</th>
                <th scope="col" class="sticky-top">MarcaEntrada</th>
                <th scope="col" class="sticky-top">MarcaSalida</th>
                <th scope="col" class="sticky-top">Permanencia Establecida</th>
                <th scope="col" class="sticky-top">Permanencia Real</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in apiResponse.Detalle_Total">
                <td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{
                  item.fecha }}</td>
                <td>{{ item.PDO }}</td>
                <td>{{ item.Usuario }}</td>
                <td>{{ item.MarcaEntrada }}</td>
                <td>{{ item.MarcaSalida }}</td>
                <td><i class="bi bi-stopwatch"></i> {{ formatMinutes(item.TiempoPermanenciaEstablecida) }}</td>
                <td class="table-success"><i class="bi bi-stopwatch"></i> {{ formatMinutes(item.TiempoPermanenciaMinutos)
                }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="container" v-else-if="!dataReloaded">
      <div class="d-flex align-items-center justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando página...</span>
        </div>
        <h4 class="ms-3">Cargando datos del periodo...</h4>
      </div>
    </div>
  </div>

  <div class="container" v-else>
    <div class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando página...</span>
      </div>
      <h4 class="ms-3">Cargando datos del cliente...</h4>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import GraficoCobertura from '../components/GraficoCobertura.vue';
import GraficoUsuarios from '../components/GraficoUsuarios.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useTestData } from '../stores/testdata.js'
import IndicadoresGlobales from '../components/IndicadoresGlobales.vue';


export default {
  props: {
    clientId: {
      type: Number,
      required: true
    }
  },
  components: {
    GraficoCobertura,
    GraficoUsuarios,
    VueDatePicker,
    IndicadoresGlobales,
  },
  setup(props) {
    const apiResponse = ref(null);
    const dataLoaded = ref(false);
    const cadenas = ref([]);
    const cadenaElegida = ref('');
    const PDOElegido = ref([]);
    const dateInicio = ref(null);
    const dateFin = ref(null);
    const fechaHoy = ref(new Date());
    const dataReloaded = ref(true);
    const clientId = ref(props.clientId);

    //Configuración de modo de pruebas locales
    const debbugMode = ref(true);
    const delayLoading = ref(1000);

    const store = useTestData();

    const formatDesde = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    const formatHasta = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    //escribe una función que convierta este formato "Tue Jul 11 2023 14:06:45 GMT-0400 (hora estándar de Chile)" a DD/MM/YYYY
    const formatFecha = (fecha) => {
      const fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      return fechaFormateada;
    }

    //escribe una función que convierta este formato "Tue Jul 11 2023 14:06:45 GMT-0400 (hora estándar de Chile)" a YYYY-MM-DD S
    const formatFechaSQL = (fecha) => {
      const year = fecha.getFullYear();
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = fecha.getDate().toString().padStart(2, '0');
      const fechaFormateada = `${year}-${month}-${day}`;
      return fechaFormateada;
    };



    onMounted(async () => {
      try {
        if (debbugMode.value) {
          await new Promise(resolve => setTimeout(resolve, delayLoading.value));
          apiResponse.value = store.datosCobertura
        } else {
          const response = await axios.post("https://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura", {
            id_cliente: clientId.value,
            fecha_inicio: formatFechaSQL(new Date()),
            fecha_fin: formatFechaSQL(new Date()),
            id_usuarios: [],
            id_locales: [],
            id_cadenas: []
          });

          apiResponse.value = JSON.parse(response.data.trim());
        }

        dataLoaded.value = true;
        const labels = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
        cadenas.value = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
        const coberturaData = apiResponse.value.porcentaje_cadena.map(item => item.Cobertura_Programada_Mensual);
        const permanenciaData = apiResponse.value.porcentaje_cadena.map(item => item.Permanencia_Programada_Mensual);
        createChart(labels, coberturaData, permanenciaData);
        dateInicio.value = new Date();
        dateFin.value = new Date();
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    });
    const formatMinutes = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}h`;
      }
      return `${hours}h ${remainingMinutes}m`;
    };

    const PDOFiltrado = computed(() => {
      if (cadenaElegida.value.length === 0) {
        return apiResponse.value.Detalle_Total;
      } else {
        return apiResponse.value.Detalle_Total.filter(item => item.NombreCadena === cadenaElegida.value);
      }
    })

    const UsuarioFiltrado = computed(() => {
      if (cadenaElegida.value.length === 0 && PDOElegido.value.length === 0) {
        return apiResponse.value.Detalle_Total;
      } else if (cadenaElegida.value.length !== 0) {
        return apiResponse.value.Detalle_Total.filter(item => item.NombreCadena === cadenaElegida.value);
      } else if (PDOElegido.value.length !== 0) {
        return apiResponse.value.Detalle_Total.filter(item => item.PDO === PDOElegido.value);
      } else {
        return apiResponse.value.Detalle_Total.filter(item => item.NombreCadena === cadenaElegida.value && item.PDO === PDOElegido.value);
      }
    })

    //escribe una funcion que evalue en watch si dateInicio.value y dateFin.value son distintos a fechaHoy.value, si son distintos, que se ejecute un console log
    const watchDate = () => {
      if (dateInicio.value !== fechaHoy.value || dateFin.value !== fechaHoy.value) {
        console.log("Se ejecutó el watch");
      }
    }

    const filtrarFechas = async () => {
      dataReloaded.value = false;
      if (dateInicio.value == null || dateFin.value == null) {
        console.log("Nulos");
      } else {
        console.log(formatFechaSQL(dateInicio.value));
        console.log(formatFechaSQL(dateInicio.value));

        try {
          const response = await axios.post("https://iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura", {
            id_cliente: clientId.value,
            fecha_inicio: formatFechaSQL(dateInicio.value),
            fecha_fin: formatFechaSQL(dateFin.value),
            id_usuarios: [],
            id_locales: [],
            id_cadenas: []
          });
          apiResponse.value = JSON.parse(response.data.trim());
          dataReloaded.value = true;
          const labels = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
          cadenas.value = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
          const coberturaData = apiResponse.value.porcentaje_cadena.map(item => item.Cobertura_Programada_Mensual);
          const permanenciaData = apiResponse.value.porcentaje_cadena.map(item => item.Permanencia_Programada_Mensual);
          createChart(labels, coberturaData, permanenciaData);
          dateInicio.value = new Date();
          dateFin.value = new Date();
        }
        catch (error) {
          console.error("Error fetching data:", error);
        }



      }

    }

    const displayUnDecimal = (numero) => {
      return numero.toFixed(1);
    }



    return {
      apiResponse,
      dataLoaded,
      formatMinutes,
      cadenas,
      cadenaElegida,
      PDOFiltrado,
      UsuarioFiltrado,
      PDOElegido,
      dateInicio,
      dateFin,
      fechaHoy,
      formatFecha,
      formatDesde,
      formatHasta,
      filtrarFechas,
      dataReloaded,
      clientId, 
      displayUnDecimal
    };
  },
};

</script>


<style scoped>
.titulo-graficos-globales {
  font-size: 12px;
  color: rgb(136, 136, 136);
  text-transform: uppercase;
}

.logo {
  width: 100px;
}

.titulo-reporte {
  font-size: 30px;
}

.fecha-desde {
  font-size: 20px;
  color: rgb(136, 136, 136);
}

.fecha-hasta {
  font-size: 20px;
  color: rgb(136, 136, 136);
}

.btn-rango {
  background-color: #e4e4e4;
}

.indicador-card {
  border-color: #ffffff;
  color: rgb(235, 235, 235);
  height: 80px;
  background: linear-gradient(to bottom right, #1c1fca, #80c3e2);
  width: 220px;
}

.indicador-texto {
  font-size: 20px;
}

.indicador-numero {
  font-size: 30px;
}

.contenedor {
  padding: 1em;
}

.reporte {
  /* font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; */
  font-family: "Open Sans", sans-serif;
  /* font-family: "Lombok", sans-serif; */
}

.table td {
  color: #545454
}

.table th {
  color: #545454;
  font-weight: 600;
}

.kpi-cobertura {
  color: #727272;
}

.kpi-cobertura-titulo {
  font-size: 17px;
  font-weight: 600;
  text-transform: uppercase;
  color: gray;
  margin-bottom: 0px;
}

.kpi-cobertura-num-grande {
  font-size: 30px;
  margin-right: -10px;
}

.flecha-arriba {
  color: green;
}

.flecha-abajo {
  color: red;
}

.progress-bar {
  font-size: 10px;
}

.form-select,
.form-control {
  width: 150px;
  background-color: #e4e4e4;
  color: #383838;
  font-size: 12px;

}

.texto-interno {
  font-size: 13px;
}

.texto-pequeño {
  font-size: 10px;
}

.caja {
  color: #727272;
  max-height: 260px;
  overflow-y: auto;
}

.tabla-indices {
  font-size: 12px;
  background-color: white;
  z-index: 1;
}

.tabla-fecha {
  font-size: 12px;
  font-weight: 500;
}

.tabla-data {
  font-size: 12px;
  font-weight: 500;
}

.diferencia-positiva {
  font-size: 12px;
  color: #235f45;
}

.diferencia-negativa {
  font-size: 12px;
  color: #ad4d54;
}

.diferencia-preocupante {
  font-size: 12px;
  color: #a18938;
}

.titulo-tabla {
  font-size: 12px;
}

.tabla-usuarios {
  max-height: 400px;
  overflow-y: auto
}

.tabla-por-usuario {
  max-height: 390px;
  overflow-y: auto
}

.titulo-por-usuario {
  font-size: 16px;
  font-weight: 600;
  margin-top: 13px;
  margin-left: 10px;
}

.tabla-datos-periodo {
  font-size: 14px;
}
</style>