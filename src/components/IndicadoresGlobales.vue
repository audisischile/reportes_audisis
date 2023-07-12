<template>
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

          <div class="col">
            <div class="">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true"><i class="bi bi-info-circle"></i>
                    Gráfico</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                    role="tab" aria-controls="profile" aria-selected="false"><i class="bi bi-info-circle"></i> DATOS DEL
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
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'IndicadoresGlobales',
    props: {
        apiResponse: {
            type: Object,
            required: true
        }
    },
    components: {
        GraficoCobertura: () => import('./GraficoCobertura.vue')
    },
    setup(props) {
        
        return {
            apiResponse: props.apiResponse
        }
    }
})



</script>

<style scoped>

</style>