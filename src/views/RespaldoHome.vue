<template>
  <!-- {{ filteredApiResponse }} -->
  {{ dataLoaded }}
  <hr>
  <div class="container reporte" v-if="dataLoaded && apiResponse">
    <div class="row mt-5">
      <div class="col-5">
        <div class="row">
          <div class="col-3">
            <img :src="apiResponse.indicadores_globales[0].logo" class="logo">
          </div>
          <div class="col">
            <div class="row">
              <div class="col-12 titulo-reporte" style="color: #BA0011">
                Reporte cobertura
              </div>
              <div class="col-12 fecha-desde" style="color: #BA0011">
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
            <label for="datepicker">Fecha inicio:</label>
            <VueDatePicker v-model="dateInicio" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
              selectText="Seleccionar" :format="formatDesde"></VueDatePicker>
          </div>
          <div class="col-5">
            <label for="datepicker">Fecha de fin:</label>
            <VueDatePicker v-model="dateFin" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
              selectText="Seleccionar" :format="formatHasta"></VueDatePicker>
          </div>
          <div class="col-2">
            <button class="btn"
              style="border-radius: 0; background-color: white; margin-top: 22px; border-color: #BA0011; color: #BA0011;"
              @click="filtrarFechas">Generar</button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-4">
            <select name="" id="" class="form-select w-100 filtro-select" v-model="cadenaElegida">
              <option value="">Cadena</option>
              <option v-for="item in cadenas" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="col-4">
            <select name="" id="" class="form-select w-100 filtro-select">
              <option value="">PDO</option>
              <option v-for="item in PDOFiltrado" value="1">{{ item.PDO }}</option>
            </select>
          </div>
          <div class="col-4">
            <select name="" id="" class="form-select w-100 filtro-select">
              <option value="">Usuario</option>
              <option v-for="item in UsuarioFiltrado" value="1">{{ item.Usuario }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="dataDisplay" v-if="dataReloaded && apiResponse">
      <div class="row justify-content-center mt-4 mb-4" style="padding-left: 10px; padding-right: 7px;">
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: rgb(240, 240, 240)">{{
                filteredApiResponse.usuario_local[0].locales_programadas
              }}</span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto" style="color: white;">Locales programados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">{{ filteredApiResponse.usuario_local[0].locales_completados
              }}</span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto" style="color: white">Locales completados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">{{ filteredApiResponse.usuario_local[0].locales_iniciados
              }}</span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto" style="color: white">Locales iniciados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">{{ filteredApiResponse.usuario_local[0].locales_pendientes
              }}</span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto" style="color: white">Locales pendientes</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card contenedor mb-4 shadow">
        <div class="row">
          <div class="col-2 align-self-start d-flex flex-column justify-content-between">
            <div class="kpi-cobertura align-items-center mt-4">
              <div class="kpi-cobertura-titulo">
                Cobertura
              </div>
              <div class="row justify-content-center">
                <div class="col-6 indicador-numero" style="display: flex; align-items: baseline;">
                  {{ apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual }}<span>%</span>
                </div>
                <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;">
                  <i class="bi bi-arrow-up-circle flecha-arriba"></i>
                  <span class="flecha"> 12%</span>
                </div>
              </div>
              <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100" style="height: 8px">
                <div class="progress-bar custom-progress-bar"
                  :style="{ width: apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual + '%', backgroundColor: '#f97013' }">
                </div>
              </div>
            </div>
            <div class="kpi-cobertura mt-5 align-items-center">
              <div class="kpi-cobertura-titulo">
                Permanencia
              </div>
              <div class="row justify-content-center">
                <div class="col-6 indicador-numero" style="display: flex; align-items: baseline;">
                  {{ apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual }}<span>%</span>
                </div>
                <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;">
                  <i class="bi bi-arrow-down-circle flecha-abajo"></i>
                  <span class="flecha"> 12%</span>
                </div>
              </div>
              <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100" style="height: 10px;">
                <div class="progress-bar"
                  :style="{ width: apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual + '%', backgroundColor: '#47A8BD' }">
                </div>
              </div>
            </div>
          </div>


          <div class="col-6">
            <GraficoCobertura :apiResponse="apiResponse" />
          </div>

          <div class="col-4">
            <div class="card caja">
              <div class="table-responsive">
                <table class="table tabla-datos-periodo table-striped">
                  <thead class="sticky-header">
                    <tr class="tabla-datos-periodo-titulos">
                      <th scope="col">Cadena</th>
                      <th scope="col">Cobertura</th>
                      <th scope="col">Permanencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in apiResponse.porcentaje_cadena">
                      <td>
                        <div class="cadena-info">
                          <img :src="item.Logo_cadena" style="width: 40px;" class="logo-cadena">
                          <span class="nombre-cadena">{{ item.NombreCadenaReal === 'INDEPENDIENTES' ? 'INDEPEN..' :
                            item.NombreCadenaReal }}</span>
                        </div>
                      </td>
                      <td class="tabla-cadenas-num">{{ item.Porcentaje_Cobertura_Mensual }}%</td>
                      <td class="tabla-cadenas-num">{{ item.Porcentaje_Permanencia_Mensual }}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-8">
          <div class="card tabla-por-usuario shadow">
            <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-1">
              <!-- <i class="bi bi-table"></i>  -->
              <span style="color: #BA0011">COBERTURA TOTAL</span>
            </h6>
            <div class="table-responsive">
              <table class="table titulo-tabla table-hover table-striped"
                style="font-size: 11px; font-family: Roboto, sans-serif;">
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
                    <td
                      style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px;">
                      {{
                        item.Fecha }}</td>
                    <td class="usuario" style="font-size: 11px; font-weight: 500; font-family: 'Roboto', sans-serif;">{{
                      item.Usuario }}
                    </td>
                    <td>{{ item.locales_programadas }}</td>
                    <td>{{ item.locales_completados !== 0 ? item.locales_completados : '-' }}</td>
                    <td>{{ item.locales_iniciados !== 0 ? item.locales_iniciados : '-' }}</td>
                    <td :class="{ 'table-danger': item.locales_pendientes > 0 }">{{ item.locales_pendientes !== 0 ?
                      item.locales_pendientes : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="card shadow" style="overflow-y: auto; height: 100%;">
            <div class="card-body">
              <GraficoUsuarios :datosUsuarios="apiResponse.porcentaje_locales" class="shadow" />
            </div>
          </div>
        </div>
      </div>


      <div class="card tabla-por-usuario shadow mb-4">
        <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-3">
          <!-- <i class="bi bi-table"></i> -->
          <span style="color: #BA0011"> PERMANENCIA POR LOCAL</span>
        </h6>
        <div>
          <table class="table titulo-tabla table-hover table-striped"
            style="font-size: 11px; font-family: Roboto, sans-serif;">
            <thead>
              <tr>
                <th scope="col" class="sticky-top col-1">Día</th>
                <th scope="col" class="sticky-top col-3">PDO</th>
                <th scope="col" class="sticky-top col-3">Usuario</th>
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
                <td>{{ item.PDO.toUpperCase() }}</td>
                <td>{{ item.Usuario.toUpperCase() }}</td>
                <td style="font-size: 13px; font-family: Roboto, sans-serif;">{{ item.MarcaEntrada }}</td>
                <td style="font-size: 13px; font-family: Roboto, sans-serif;">{{ item.MarcaSalida }}</td>
                <td style="font-size: 13px;"><i class="bi bi-stopwatch"></i> {{
                  formatMinutes(item.TiempoPermanenciaEstablecida) }}</td>
                <td style="font-size: 13px;" class="table-success"><i class="bi bi-stopwatch"></i> {{
                  formatMinutes(item.TiempoPermanenciaMinutos)
                }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card tabla-por-usuario shadow mb-4">
        <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-3">
          <!-- <i class="bi bi-table"></i> -->
          <span style="color: #BA0011"> JORNADA DIARIA</span>
        </h6>
        <div class="table-responsive">
          <table class="table titulo-tabla table-hover table-striped"
            style="font-size: 11px; font-family: Roboto, sans-serif;">
            <thead>
              <tr>
                <th scope="col" class="sticky-top col-1">Día</th>
                <th scope="col" class="sticky-top col-1">Usuario</th>
                <th scope="col" class="sticky-top">Hora Entrada</th>
                <th scope="col" class="sticky-top">Marca Entrada</th>
                <th scope="col" class="sticky-top">Hora Salida</th>
                <th scope="col" class="sticky-top">Marca Salida</th>
                <th scope="col" class="sticky-top">Permiso</th>
                <th scope="col" class="sticky-top">HT</th>
                <th scope="col" class="sticky-top">HP</th>
                <th scope="col" class="sticky-top">HNT</th>
                <th scope="col" class="sticky-top">Tiempo de atraso</th>
                <th scope="col" class="sticky-top">Adelanto de salida</th>
                <th scope="col" class="sticky-top">HES</th>
                <th scope="col" class="sticky-top">Entrada Colación</th>
                <th scope="col" class="sticky-top">Salida Colación</th>
                <th scope="col" class="sticky-top">TC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11-07-2023</td>
                <td>
                  <div>16.623.063-8</div>
                  <div>Nombre Prueba</div>
                </td>
                <td>08:00:00</td>
                <td>08:10:50</td>
                <td>18:00:00</td>
                <td>18:01:23</td>
                <td>P</td>
                <td>00:02:45</td>
                <td>45:00:00</td>
                <td>00:03:23</td>
                <td>00:02:01</td>
                <td>00:10:20</td>
                <td>00:03:23</td>
                <td>18:00:14</td>
                <td>18:45:12</td>
                <td>00:44:52</td>
              </tr>
              <tr>
                <td>11-07-2023</td>
                <td>
                  <div>16.623.063-8</div>
                  <div>Nombre Prueba</div>
                </td>
                <td>08:00:00</td>
                <td>08:10:50</td>
                <td>18:00:00</td>
                <td>18:01:23</td>
                <td>P</td>
                <td>00:02:45</td>
                <td>45:00:00</td>
                <td>00:03:23</td>
                <td>00:02:01</td>
                <td>00:10:20</td>
                <td>00:03:23</td>
                <td>18:00:14</td>
                <td>18:45:12</td>
                <td>00:44:52</td>
              </tr>
              <tr>
                <td>11-07-2023</td>
                <td>
                  <div>16.623.063-8</div>
                  <div>Nombre Prueba</div>
                </td>
                <td>08:00:00</td>
                <td>08:10:50</td>
                <td>18:00:00</td>
                <td>18:01:23</td>
                <td>P</td>
                <td>00:02:45</td>
                <td>45:00:00</td>
                <td>00:03:23</td>
                <td>00:02:01</td>
                <td>00:10:20</td>
                <td>00:03:23</td>
                <td>18:00:14</td>
                <td>18:45:12</td>
                <td>00:44:52</td>
              </tr>
              <tr>
                <td>11-07-2023</td>
                <td>
                  <div>16.623.063-8</div>
                  <div>Nombre Prueba</div>
                </td>
                <td>08:00:00</td>
                <td>08:10:50</td>
                <td>18:00:00</td>
                <td>18:01:23</td>
                <td>P</td>
                <td>00:02:45</td>
                <td>45:00:00</td>
                <td>00:03:23</td>
                <td>00:02:01</td>
                <td>00:10:20</td>
                <td>00:03:23</td>
                <td>18:00:14</td>
                <td>18:45:12</td>
                <td>00:44:52</td>
              </tr>
            </tbody>
            <tfoot>
              <td>Total</td>
              <td>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>00:02:45</td>
              <td></td>
              <td>00:03:23</td>
              <td>00:02:01</td>
              <td></td>
              <td>00:03:23</td>
              <td></td>
              <td></td>
              <td></td>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="card mb-4" style="font-size: 11px; font-family: Roboto, sans-serif;">
        <div class="card-body">
          <div class="col-12 text-center" style="margin-top: -1em; margin-bottom: -1em;">Leyenda</div>
          <hr>
          <div class="row" style="margin-top: -1em; margin-bottom: -1em;">
            <div class="col-2"><strong>HT:</strong> Horas trabajadas</div>
            <div class="col-2"><strong>HP:</strong> Horas Programadas</div>
            <div class="col-2"><strong>HNT:</strong> Horas no trabajadas</div>
            <div class="col-2"><strong>HES:</strong> Horas extra (salida)</div>
            <div class="col-2"><strong>TC:</strong> Tiempo en colación</div>
          </div>
          <hr>
          <div class="row" style="margin-top: -1em; margin-bottom: -1em;">
            <div class="col-2"><strong>L:</strong> Licencia</div>
            <div class="col-2"><strong>V:</strong> Vacaciones</div>
            <div class="col-2"><strong>FE:</strong> Feriado</div>
            <div class="col-2"><strong>PR:</strong> Permiso por reunión</div>
            <div class="col-2"><strong>LCGT:</strong> Local cubierto gestor sin teléfono</div>
            <div class="col-2"><button @click="toggleLeyendas" class="btn btn-sm"
                style="border-radius: 0; background-color: white; border-color: #BA0011; color: #BA0011;">{{
                  mostrarLeyendas ? "Ver menos" : "Ver más" }}</button>
            </div>
          </div>

          <div class="row mt-4" v-show="mostrarLeyendas">
            <div class="col-2"><strong>ST:</strong> Sin turno</div>
            <div class="col-2"><strong>PC:</strong> Permiso por capacitación</div>
            <div class="col-2"><strong>PR:</strong> Permiso trabajo en terreno</div>
            <div class="col-2"><strong>PAC:</strong> Permiso apoyo campaña</div>
            <div class="col-2"><strong>AMA:</strong> Amamantamiento(Fuero)</div>
            <div class="col-2"><strong>PAGS:</strong> Permiso administrativo sin goce de sueldo</div>
            <div class="col-2"><strong>PAG:</strong> Permiso administrativo con goce de sueldo</div>
            <div class="col-2"><strong>PON:</strong> Post-natal</div>
            <div class="col-2"><strong>FA:</strong> Fallecimiento</div>
            <div class="col-2"><strong>PN:</strong> Permiso por nacimiento</div>
            <div class="col-2"><strong>PM:</strong> Permiso por matrimonio</div>
            <div class="col-2"><strong>PS:</strong> Permiso sindical</div>
            <div class="col-2"><strong>PRN:</strong> Pre-natal</div>
            <div class="col-2"><strong>D:</strong> Desvinculación</div>
            <div class="col-2"><strong>MC:</strong> Marcación por contingencia</div>
            <div class="col-2"><strong>CPA:</strong> Cobertura preventas Agrosuper</div>
            <div class="col-2"><strong>LCPS:</strong> Local cerrado permiso con goce de sueldo</div>
            <div class="col-2"><strong>O:</strong> Operación</div>
            <div class="col-2"><strong>NIGS:</strong> No permiten ingreso permiso con goce de sueldo</div>
            <div class="col-2"><strong>NILR:</strong> No permiten ingreso local en remodelación</div>
          </div>
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
    const filteredApiResponse = computed(() => {
      if (cadenaSeleccionada.value.length === 0) {
        return apiResponse.value;
      } else {
      }
    });
    const dataLoaded = ref(false);

    const cadenas = ref([]);
    const cadenaElegida = ref('');
    const cadenasFiltradas = ref([]);
    
    const PDOElegido = ref([]);
    const dateInicio = ref(null);
    const dateFin = ref(null);
    const fechaHoy = ref(new Date());
    const dataReloaded = ref(true);
    const clientId = ref(props.clientId);

    //Gestion de filtros
    const cadenaSeleccionada = ref('');
    const pdoSeleccionado = ref('');
    const usuarioSeleccionado = ref('');

    const dataFiltrada = computed


    //Configuración de modo de pruebas locales
    const debbugMode = ref(false);
    const delayLoading = ref(1000);
    const testApi = ref(false);

    //Leyendas
    const mostrarLeyendas = ref(false);
    const toggleLeyendas = () => {
      mostrarLeyendas.value = !mostrarLeyendas.value;
    }

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

    const formatFecha = (fecha) => {
      const fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      return fechaFormateada;
    }

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
          const response = await axios.post("https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura", {
            id_cliente: clientId.value,
            fecha_inicio: formatFechaSQL(new Date()),
            fecha_fin: formatFechaSQL(new Date()),
            // id_cliente: 82,
            // fecha_inicio: "2023-01-04",
            // fecha_fin: "2023-01-10",
            id_usuarios: [],
            id_locales: [],
            id_cadenas: []
          });

          const reg = /\uFEFF/g;
          const newResponse = response.data.trim().replace(reg, "");
          apiResponse.value = JSON.parse(newResponse);

          // apiResponse.value = JSON.parse(response.data.trim());
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
          const response = await axios.post("https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura", {
            id_cliente: clientId.value,
            fecha_inicio: formatFechaSQL(dateInicio.value),
            fecha_fin: formatFechaSQL(dateFin.value),
            // id_cliente: 82,
            // fecha_inicio: "2023-01-04",
            // fecha_fin: "2023-01-10",
            id_usuarios: [],
            id_locales: [],
            id_cadenas: []
          });

          const reg = /\uFEFF/g;
          const newResponse = response.data.trim().replace(reg, "");
          apiResponse.value = JSON.parse(newResponse);

          // apiResponse.value = JSON.parse(response.data.trim());

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

    const resultadoFiltrado = computed(() => {
      return apiResponse.value.filter(item => {
        return (
          (cadenaSeleccionada.value === '' || item.cadena === cadenaSeleccionada.value) &&
          (pdoSeleccionado.value === '' || item.PDO === pdoSeleccionado.value) &&
          (usuarioSeleccionado.value === '' || item.Usuario === usuarioSeleccionado.value)
        );
      });
    });


    return {
      apiResponse,
      dataLoaded,
      formatMinutes,
      cadenas,
      cadenaElegida,
      cadenasFiltradas,
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
      displayUnDecimal,
      resultadoFiltrado,
      mostrarLeyendas,
      toggleLeyendas, 
      filteredApiResponse
    };
  },
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap');

.filtro-select {
  width: 100%;
  height: 30px;
  border-radius: 0px;
  border: 1px solid rgb(136, 136, 136);
  padding-left: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #F2F2F2;
  background-color: white;
}

.card {
  border-radius: 0px;
}

.cadena-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}



.logo-cadena {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.tabla-datos-periodo-titulos th {
  font-size: 9px;
  font-weight: 200;
  color: rgb(136, 136, 136);
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  text-align: center;
}


.titulo-graficos-globales {
  font-size: 12px;
  color: rgb(136, 136, 136);
  text-transform: uppercase;
}

.imagen-icono {
  width: 70px;
  height: 30px;
}


.logo {
  width: 100px;
}

.titulo-reporte {
  font-size: 30px;
  color: rgb(136, 136, 136);
  font-family: "Oswald", sans-serif;
}

.fecha-desde {
  font-size: 20px;
  color: rgb(136, 136, 136);
  font-family: "Oswald", sans-serif;
}

.fecha-hasta {
  font-size: 20px;
  color: rgb(136, 136, 136);
  font-family: "Oswald", sans-serif;
}

.btn-rango {
  background-color: #e4e4e4;
}

.texto-kpi {
  color: white
}

.indicador-card {
  border-color: #BA0011;
  background-color: #BA0011;
  height: 80px;
  width: 220px;
}

.nombre-cadena {
  font-size: 10px;
  display: block;
  color: rgb(136, 136, 136);
}


.indicador-texto {
  font-size: 12px;
  color: rgb(136, 136, 136);
  font-family: "Fira Sans", sans-serif;
}

.indicador-numero {
  font-size: 30px;
  color: rgb(136, 136, 136);
  font-family: "Oswald", sans-serif;
}

.contenedor {
  padding: 1em;
}

.tabla-datos-periodo {
  font-size: 12px;
  vertical-align: middle;
  text-align: center;
}

.reporte {
  /* font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* font-family: "Lombok", sans-serif; */
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
}

.table {
  width: 100%;
  table-layout: fixed;
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
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  color: gray;
  margin-bottom: 0px;
}

.kpi-cobertura-num-grande {
  font-size: 20px;
  margin-right: -10px;
  font-family: "Oswald", sans-serif;
}

.flecha-arriba {
  color: green;
}

.flecha-abajo {
  color: red;
}

.tabla-cadenas-num {
  font-size: 15px;
  font-weight: 400;
  color: #727272;
  font-family: "Oswald", sans-serif;
}

.indicador-icono {
  font-size: 30px;
  background-image: linear-gradient(to bottom, rgba(250, 250, 250, 0.5), rgba(255, 255, 255, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.progress-bar {
  font-size: 10px;
}

.progress {
  border-radius: 0;
}

.custom-progress-bar {
  border-radius: 0;
  height: 100%;
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