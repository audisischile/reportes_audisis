<template>
  <div class="container" v-if="dataLoaded && apiResponse">
    <div class="breadcrum mb-2 mt-2">
      Inicio / Cobertura / Cliente de prueba
    </div>
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
                04/01/2023
              </div>
              <div class="col-12 fecha-hasta">
                Al 04/01/2023
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModuloFiltros />
    </div>
    <div>

    </div>
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

    <div class="card contenedor mt-4 shadow">
      <div class="row">
        <div class="col-3 align-self-start mt-5">
          <div class="kpi-cobertura">
            <div class="kpi-cobertura-titulo">
              % Cobertura
            </div>
            <div class="row">
              <div class="col-6 kpi-cobertura-num-grande">{{
                apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual }}%</div>
              <div class="col-6 kpi-cobertura-num-chico align-self-center"><i
                  class="bi bi-arrow-up-circle flecha-arriba"></i>
                <span class="flecha"> 12%</span>
              </div>
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
              aria-valuemax="100" style="height: 10px;">
              <div class="progress-bar" style="width: 60%; background-color: rgb(63, 121, 229);"></div>
            </div>
          </div>
          <div class="kpi-cobertura mt-5">
            <div class="kpi-cobertura-titulo">
              % Permanencia
            </div>
            <div class="row">
              <div class="col-6 kpi-cobertura-num-grande">{{
                apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual }}%</div>
              <div class="col-6 kpi-cobertura-num-chico align-self-center"><i
                  class="bi bi-arrow-down-circle flecha-abajo"></i>
                <span class="flecha"> 12%</span>
              </div>
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0"
              aria-valuemax="100" style="height: 10px;">
              <div class="progress-bar" style="width: 74%; background-color: rgb(10, 193, 156);"></div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                  role="tab" aria-controls="home" aria-selected="true">Cadena</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                  role="tab" aria-controls="profile" aria-selected="false">Zona</button>
              </li>
            </ul>
            <div class="tab-content mt-2" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="row">
                  <div class="col-6">

                    <!-- Grafico Cobertura -->
                    <GraficoCobertura />

                  </div>
                  <div class="col-6">
                    <div class="card caja">
                      <div class="card-body">
                        <div class="card-title">Cobertura mensual por cadena</div>
                        <hr>
                        <div class="card-text texto-interno" v-for="item in apiResponse.porcentaje_cadena">
                          <div class="row align-items-center">
                            <div class="col-2">
                              <img :src="item.Logo_cadena" style="width: 45px;">
                            </div>
                            <div class="col-4">
                              <div>{{ item.NombreCadenaReal }}</div>
                              <div class="texto-pequeño">Bajada de texto</div>
                            </div>
                            <div class="col-3">{{ item.Porcentaje_Cobertura_Mensual }}%</div>
                            <div class="col-3 kpi-cobertura-num-chico align-self-center">
                              <i class="bi bi-arrow-up-circle flecha-arriba"></i> <span class="flecha"> 42%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row">
                  <div class="col-6">
                    <GraficoCobertura />
                  </div>
                  <div class="col-6">
                    <div class="card caja">
                      <div class="card-body">
                        <div class="card-title">Cobertura mensual por Zona</div>
                        <hr>
                        <div class="card-text texto-interno" v-for="item in apiResponse.porcentaje_cadena">
                          <div class="row align-items-center">
                            <div class="col-2">
                              <img :src="item.Logo_cadena" style="width: 45px;">
                            </div>
                            <div class="col-4">
                              <div>{{ item.NombreCadenaReal }}</div>
                              <div class="texto-pequeño">Bajada de texto</div>
                            </div>
                            <div class="col-3">{{ item.Porcentaje_Permanencia_Mensual }}%</div>
                            <div class="col-3 kpi-cobertura-num-chico align-self-center">
                              <i class="bi bi-arrow-up-circle flecha-arriba"></i> <span class="flecha"> 42%</span>
                            </div>
                          </div>
                        </div>
                      </div>
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
      <div class="col-8">
        <div class="card tabla-por-usuario shadow">
          <div class="card-body tabla-usuarios">
            <table class="table titulo-tabla table-hover table-striped table-sm">
              <thead>
                <tr class="tabla-indices" style="position: sticky; top:0;">
                  <th scope="col">Día</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Locales programados</th>
                  <th scope="col">Locales completados</th>
                  <th scope="col">Locales iniciados</th>
                  <th scope="col">Pendientes</th>
                </tr>
              </thead>

              <tbody class="tabla-data">
                <tr v-for="item in apiResponse.porcentaje_locales">
                  <th scope="row" class="">{{ item.Fecha }}</th>
                  <td>{{ item.Usuario }}</td>
                  <td>{{ item.locales_programadas }}</td>
                  <td>{{ item.locales_completados }}</td>
                  <td>{{ item.locales_iniciados }}</td>
                  <td class="table-danger">{{ item.locales_pendientes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card body">
            <!-- Grafico de usuarios -->

            <GraficoUsuarios />


          </div>
        </div>
      </div>
    </div>


    <div class="card mt-3 tabla-por-usuario shadow">
      <table class="table titulo-tabla table-hover table-striped">
        <thead>
          <tr style="position: sticky; top:0;">
            <th scope="col">Día</th>
            <th scope="col">PDO</th>
            <th scope="col">Usuario</th>
            <th scope="col">MarcaEntrada</th>
            <th scope="col">MarcaSalida</th>
            <th scope="col">Permanencia Establecida</th>
            <th scope="col">Permanencia Real</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in apiResponse.Detalle_Total">
            <th scope="row">{{ item.fecha }}</th>
            <td>{{ item.PDO }}</td>
            <td>{{ item.Usuario }}</td>
            <td>{{ item.MarcaEntrada }}</td>
            <td>{{ item.MarcaSalida }}</td>
            <td>{{ formatMinutes(item.TiempoPermanenciaEstablecida) }}</td>
            <td class="table-success"><i class="bi bi-stopwatch"></i> {{ item.TiempoPermanenciaMinutos }}
              <span class="diferencia-positiva">{{ item.TiempoPermanenciaMinutos }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="container" v-else>
    Loading...
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import GraficoCobertura from '../components/GraficoCobertura.vue';
import GraficoUsuarios from '../components/GraficoUsuarios.vue';
import ModuloFiltros from '../components/ModuloFiltros.vue';

export default {
  components: {
    GraficoCobertura,
    GraficoUsuarios, 
    ModuloFiltros
  },
  setup() {
    const apiResponse = ref(null);
    const dataLoaded = ref(false);

    onMounted(async () => {
      try {
        const response = await axios.post("https://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura", {
          id_cliente: 82,
          fecha_inicio: "2023-01-04",
          fecha_fin: "2023-01-04",
          id_usuarios: [],
          id_locales: [],
          id_cadenas: []
        });
        apiResponse.value = JSON.parse(response.data.trim());
        dataLoaded.value = true;
        const labels = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
        const coberturaData = apiResponse.value.porcentaje_cadena.map(item => item.Cobertura_Programada_Mensual);
        const permanenciaData = apiResponse.value.porcentaje_cadena.map(item => item.Permanencia_Programada_Mensual);
        createChart(labels, coberturaData, permanenciaData);
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
    return { apiResponse, dataLoaded, formatMinutes };
  },
  components: { GraficoCobertura }
};
</script>


<style scoped>
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
  background-color: #8BA8CF;
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
  background-color: #8ba8cf;
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
  font-size: 10px;
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
  font-size: 14px;
}

.tabla-usuarios {
  max-height: 400px;
  overflow-y: auto
}

.tabla-por-usuario {
  max-height: 400px;
  overflow-y: auto
}
</style>