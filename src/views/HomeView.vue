<template>
  <div class="reporte container">
    <div class="breadcrum mb-2 mt-2">
      Inicio / Cobertura / Cliente de prueba
    </div>

    <div class="row mt-5">
      <div class="col-5">
        <div class="row">
          <div class="col-3">
            <!-- <img src="../assets/Diseño sin título (22).png" class="logo"> -->
          </div>
          <div class="col">
            <div class="row">
              <div class="col-12 titulo-reporte">
                Reporte cobertura
              </div>
              <div class="col-12 fecha-desde">
                16/06/2023
              </div>
              <div class="col-12 fecha-hasta">
                Al 19/06/2023
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-7 shadow">
        <div class="row">
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>Cadena</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>PDO</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>Usuario</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-3">
            <!-- <button class="btn btn-rango btn-sm" @click="displayRangoFechas">Seleccione fechas<i class="bi bi-calendar-range ms-2"></i></button> -->
            <input type="text" name="daterange" value="01/01/2018 - 01/15/2018" />
          </div>
        </div>
      </div>
    </div>


    <div class="row justify-content-center mt-5">
      <div class="indicador-card card col-2 me-2 flex-fill shadow">
        <div class="body mt-1">
          <div><span class="indicador-texto">Locales programados</span></div>
          <div><span class="indicador-numero">20</span></div>
        </div>
      </div>
      <div class="indicador-card card col-2 me-2 flex-fill shadow">
        <div class="body mt-1">
          <div><span class="indicador-texto">Locales completados</span></div>
          <div><span class="indicador-numero">0</span></div>
        </div>
      </div>
      <div class="indicador-card card col-2 me-2 flex-fill shadow">
        <div class="body mt-1">
          <div><span class="indicador-texto">Locales iniciados</span></div>
          <div><span class="indicador-numero">20</span></div>
        </div>
      </div>
      <div class="indicador-card card col-2 me-2 flex-fill shadow">
        <div class="body mt-1">
          <div><span class="indicador-texto">Locales pendientes</span></div>
          <div><span class="indicador-numero">10</span></div>
        </div>
      </div>
    </div>

    <div class="mt-5">
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
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Gráficos por cadena</div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Gráficos por ZONA</div>
      </div>
    </div>

    <div class="card contenedor mt-4 shadow">

      <div class="row align-items-center">
        <div class="col-3 align-self-start mt-4">
          <div class="kpi-cobertura">
            <div class="kpi-cobertura-titulo">
              % Cobertura
            </div>
            <div class="row">
              <div class="col-4 kpi-cobertura-num-grande">60%</div>
              <div class="col-8 kpi-cobertura-num-chico align-self-center"><i
                  class="bi bi-arrow-up-circle flecha-arriba"></i>
                <span class="flecha"> 42%</span>
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
              <div class="col-4 kpi-cobertura-num-grande">74%</div>
              <div class="col-8 kpi-cobertura-num-chico align-self-center"><i
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
        <div class="col-5">
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>

        <div class="col-4">
          <div class="card caja">
            <div class="card-body">
              <div class="card-title">Permanencia por cadena</div>
              <hr>
              <div class="card-text texto-interno">
                <div class="row align-items-center">
                  <div class="col-2">Logo</div>
                  <div class="col-4">
                    <div>Otras cadenas</div>
                    <div class="texto-pequeño">Texto de prueba</div>
                  </div>
                  <div class="col-2">70%</div>
                  <div class="col-3 kpi-cobertura-num-chico align-self-center">
                    <i class="bi bi-arrow-up-circle flecha-arriba"></i> <span class="flecha"> 42%</span>
                  </div>
                </div>

                <div class="row align-items-center mt-2">
                  <div class="col-2">Logo</div>
                  <div class="col-4">
                    <div>Otras cadenas</div>
                    <div class="texto-pequeño">Texto de prueba</div>
                  </div>
                  <div class="col-2">30%</div>
                  <div class="col-3 kpi-cobertura-num-chico align-self-center">
                    <i class="bi bi-arrow-down-circle flecha-abajo"></i> <span class="flecha"> 10%</span>
                  </div>
                </div>

                <div class="row align-items-center mt-2">
                  <div class="col-2">Logo</div>
                  <div class="col-4">
                    <div>Otras cadenas</div>
                    <div class="texto-pequeño">Texto de prueba</div>
                  </div>
                  <div class="col-2">90%</div>
                  <div class="col-3 kpi-cobertura-num-chico align-self-center">
                    <i class="bi bi-arrow-up-circle flecha-arriba"></i> <span class="flecha"> 30%</span>
                  </div>
                </div>

                <div class="row align-items-center mt-2">
                  <div class="col-2">Logo</div>
                  <div class="col-4">
                    <div>Otras cadenas</div>
                    <div class="texto-pequeño">Texto de prueba</div>
                  </div>
                  <div class="col-2">30%</div>
                  <div class="col-3 kpi-cobertura-num-chico align-self-center">
                    <i class="bi bi-arrow-down-circle flecha-abajo"></i> <span class="flecha"> 10%</span>
                  </div>
                </div>

                <div class="row align-items-center mt-2">
                  <div class="col-2">Logo</div>
                  <div class="col-4">
                    <div>Otras cadenas</div>
                    <div class="texto-pequeño">Texto de prueba</div>
                  </div>
                  <div class="col-2">30%</div>
                  <div class="col-3 kpi-cobertura-num-chico align-self-center">
                    <i class="bi bi-arrow-down-circle flecha-abajo"></i> <span class="flecha"> 10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3 shadow">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <table class="table table-hover table-sm">
              <thead>
                <tr class="tabla-indices">
                  <th scope="col">Día</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Locales programados</th>
                  <th scope="col">Locales completados</th>
                  <th scope="col">Locales iniciados</th>
                  <th scope="col">Pendientes</th>
                </tr>
              </thead>

              <tbody class="tabla-data">
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
                <tr>
                  <th scope="row" class="">11/07/2023</th>
                  <td>Rob</td>
                  <td>5</td>
                  <td>1</td>
                  <td>1</td>
                  <td class="table-danger">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card body">
            <HorizontalBar />
          </div>
        </div>
      </div>
    </div>


    <div class="card mt-3 tabla-por-usuario shadow">
      <table class="table titulo-tabla table-hover">
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
          <tr v-for="visita in visitas">
            <th scope="row">{{ visita.fecha }}</th>
            <td>{{ visita.PDO }}</td>
            <td>{{ visita.Usuario }}</td>
            <td>{{ visita.MarcaEntrada }}</td>
            <td>{{ visita.MarcaSalida }}</td>
            <td>{{ visita.TiempoPermanenciaEstablecida }}</td>
            <td class="table-success"><i class="bi bi-stopwatch"></i> {{ visita.TiempoPermanenciaMinutos }} <span
                class="diferencia-positiva">{{ indicadorPermanencia(visita.TiempoPermanenciaMinutos,
                  visita.TiempoPermanenciaEstablecida) }}</span></td>
          </tr>
          <!-- <tr>
            <th scope="row">15/06/2023</th>
            <td>Falabella Ahumada</td>
            <td>Leonel Castro</td>
            <td>09:00</td>
            <td>09:10</td>
            <td>60 min</td>
            <td class="table-danger"><i class="bi bi-stopwatch"></i> 10 min <span class="diferencia-negativa">(-50)</span>
            </td>
          </tr>
          <tr>
            <th scope="row">15/06/2023</th>
            <td>Falabella Ahumada</td>
            <td>Leonel Castro</td>
            <td>09:00</td>
            <td>11:00</td>
            <td>120 min</td>
            <td class="table-success"><i class="bi bi-stopwatch"></i> 120 min <span
                class="diferencia-positiva">(-0)</span></td>
          </tr>
          <tr>
            <th scope="row">15/06/2023</th>
            <td>Falabella Ahumada</td>
            <td>Leonel Castro</td>
            <td>09:00</td>
            <td>10:00</td>
            <td>60 min</td>
            <td class="table-warning"><i class="bi bi-stopwatch"></i> 80 min <span
                class="diferencia-preocupante">(+20)</span></td>
          </tr>
          <tr>
            <th scope="row">15/06/2023</th>
            <td>Falabella Ahumada</td>
            <td>Leonel Castro</td>
            <td>09:00</td>
            <td>10:00</td>
            <td>60 min</td>
            <td class="table-danger"><i class="bi bi-stopwatch"></i> 110 min <span
                class="diferencia-negativa">(-50)</span></td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref } from 'vue';
import HorizontalBar from '../components/HorizontalBar.vue'
import axios from 'axios'
import { useTestData } from '../stores/testdata'

const store = useTestData()
const visitas = store.datosCobertura
//Manejo de consulta


// const options = {
//   method: 'POST',
//   url: 'http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura',
//   headers: {
//     'Access-Control-Allow-Origin\n': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type'
//   },
//   data: {
//     id_cliente: 82,
//     fecha_inicio: '2023-04-01',
//     fecha_fin: '2023-04-01',
//     id_usuarios: [],
//     id_locales: [],
//     id_cadenas: []
//   }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
//   console.log(options);
// }).catch(function (error) {
//   console.log(options)
//   console.error(error);
// });


// Manejo de fechas
function convertirFecha(fecha) {
  let dia = fecha.substring(8, 10);
  let mes = fecha.substring(5, 7);
  let year = fecha.substring(0, 4);
  return dia + '/' + mes + '/' + year;
}

const fechaActual = new Date()
fechaActual.setDate(1)

const dia = fechaActual.getDate()
const mes = fechaActual.getMonth() + 1
const year = fechaActual.getFullYear()

let primerDiaMes = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + year;
let fechaActualFormateada = mes.toString().padStart(2, '0') + '/' + dia.toString().padStart(2, '0') + '/' + year;

const indicadorPermanencia = (establecida, real) => {
  const calculo = real - establecida
  if (calculo < 0) {
    return '+ ' + calculo
  } else if (calculo > 0) {
    return '- ' + calculo
  }
}

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function (start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

const showContent = (selectElement) => {
  const selectedValue = selectElement.value;

  const contentDiv = document.getElementById('content');
  const cardDiv = document.getElementById('card')

  if (selectedValue === "initial") {
    contentDiv.style.display = "block"
    cardDiv.style.display = "none"
  } else if (selectedValue === "card") {
    contentDiv.style.display = "none"
    cardDiv.style.display = "block"
  }

}


const chartData = ref({

  labels: ['Otras cadenas', 'Ripley', 'Paris', 'Falabella'],
  datasets: [{
    label: 'Cobertura por cadena',
    data: [100, 80, 75, 71]
  }],
})

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: true
      },
      beginAtZero: true,
      max: 100
    }
  }
})


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

.table td{
  color: #545454
}

.table th{
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

.tabla-por-usuario {
  max-height: 400px;
  overflow-y: auto
}</style>