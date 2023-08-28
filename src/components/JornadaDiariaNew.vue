<template>
  <div v-if="useStoreApi?.apiResponse">
    <div class="card tabla-por-usuario shadow mb-4">
      <div style="background-color: #BA0011;" class="row">
        <div class="col-11">
          <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
            <span style="color: rgb(244, 244, 244)">JORNADA DIARIA</span>
          </h6>
        </div>
        <div class="col-1">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table titulo-tabla table-hover table-striped"
          style="font-size: 11px; font-family: Roboto, sans-serif;">
          <thead>
            <tr>
              <th scope="col" class="sticky-top col-1">Día</th>
              <th scope="col" class="sticky-top col-1">Usuario</th>
              <th scope="col" class="sticky-top">Hora Entrada</th>
              <th scope="col" class="sticky-top">Hora Salida</th>
              <th scope="col" class="sticky-top">Marca Entrada</th>
              <th scope="col" class="sticky-top">Marca Salida</th>
              <th scope="col" class="sticky-top">Permiso</th>
              <th scope="col" class="sticky-top">HT</th>
              <th scope="col" class="sticky-top">HP</th>
              <th scope="col" class="sticky-top">HNT</th>
              <th scope="col" class="sticky-top">Tiempo de atraso
                <button @click="ordenarTiempoAtraso" class="icon-button mt-2" style="color: wh¡ite;">
                  <i :class="ordenTiempoAtrasoAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
              </th>
              <th scope="col" class="sticky-top">Adelanto de salida
                <button @click="ordenarAdelantoSalida" class="icon-button mt-2" style="color: wh¡ite;">
                  <i :class="ordenAdelantoSalidaAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
              </th>
              <th scope="col" class="sticky-top">
                <div class="col-12">HES</div>
                <button @click="ordenarHES" class="icon-button mt-2" style="color: wh¡ite;">
                  <i :class="ordenAscendenteHES ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
              </th>
              <th scope="col" class="sticky-top">Entrada Colación
                <button @click="ordenarEntradaColacion" class="icon-button mt-2" style="color: wh¡ite;">
                  <i :class="ordenAscendenteEntradaColacion ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
              </th>
              <th scope="col" class="sticky-top">Salida Colación
                <button @click="ordenarSalidaColacion" class="icon-button mt-2" style="color: wh¡ite;">
                  <i :class="ordenAscendenteSalidaColacion ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
              </th>
              <th scope="col" class="sticky-top">TC</th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-for="item in filteredReporteJornadaDiaria">
              <td>{{ item.Fecha }}</td>
              <td>
                <div>{{ item.Rut }}</div>
                <div>{{ corregirCaracter(item.NombreTrabajador).toUpperCase() }}</div>
              </td>
              <td>{{ item.TurnoEntrada }}</td>
              <td>{{ item.TurnoSalida }}</td>
              <td>{{ item.MarcaEntrada }}</td>
              <td>{{ item.MarcaSalida }}</td>
              <td>{{ getResumenPermiso(item.ID_Permiso) }}</td>
              <td>{{ item.HorasTrabajadas }}</td>
              <td>{{ item.HorasTrabajar }}</td>
              <td>{{ item.HorasNoTrabajadas }}</td>
              <td>{{ item.HorasAtraso }}</td>
              <td>{{ item.HorasAdelanto }}</td>
              <td>{{ item.HorasExtras }}</td>
              <td>{{ item.EntradaColacion }}</td>
              <td>{{ item.SalidaColacion }}</td>
              <td>{{ item.TiempoColacion }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="totales text-center">Total</td>
              <td>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="totales">{{ horasTrabajadas }}</td>
              <td></td>
              <td class="totales">{{ horasNoTrabajadas }}</td>
              <td class="totales">{{ horasDeAtraso }}</td>
              <td></td>
              <td class="totales">{{ horasExtra }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
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
          <div class="col-2"><strong>DN:</strong> Día Normal</div>
          <div class="col-2"><strong>ST:</strong> Sin turno</div>
          <div class="col-2"><strong>L:</strong> Licencia</div>
          <div class="col-2"><strong>V:</strong> Vacaciones</div>
          <div class="col-2"><strong>FE:</strong> Feriado</div>
          <div class="col-2"><button @click="toggleLeyendas" class="btn btn-sm"
              style="border-radius: 0; background-color: #ED3632; border-color: #BA0011; color: #fafafa;">{{
                mostrarLeyendas ? "Ver menos" : "Ver más" }}</button>
          </div>
        </div>

        <div class="row mt-4" v-show="mostrarLeyendas">
          <div class="col-2"><strong>ST:</strong> Sin turno</div>
          <div class="col-2"><strong>PR:</strong> Permiso por reunión</div>
          <div class="col-2"><strong>LCGT:</strong> Local cubierto gestor sin teléfono</div>
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
  {{ useStoreApi.apiResponse?.reporte_jornada_diaria }}
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { usePermisosStore } from '@/stores/permisos.js'
import { useApiStore } from '@/stores/conexiones.js';

const useStore = usePermisosStore();
const useStoreApi = useApiStore();

const filteredReporteJornadaDiaria = () => {
  return useApiStore?.apiResponse.reporte_jornada_diaria
}


const corregirCaracter = (texto) => {
  return texto.replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/ÃÁ/g, 'Á')
    .replace(/Ã‰/g, 'É')
    .replace(/ÃÍ/g, 'Í')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã‘/g, 'Ñ');
}
</script>
  
<style scoped>
.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  color: #BA0011;
}

.card {
  border-radius: 0px;
}

.tabla-por-usuario {
  max-height: 500px;
  overflow-y: auto
}

.titulo-por-usuario {
  font-size: 16px;
  font-weight: 600;
  margin-top: 13px;
  margin-left: 10px;
}

.table thead th.sticky-top {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
}

.table tfoot td {
  position: sticky;
  bottom: 0;
  background-color: #f8f9fa;
}

.totales {
  font-weight: 400;
  font-size: 12px;
  color: #BA0011;
}
</style>