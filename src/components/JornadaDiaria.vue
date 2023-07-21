<template>
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
          <tr v-for="item in props.apiResponse.reporte_jornada_diaria">
            <td>{{ item.Fecha }}</td>
            <td>
              <div>{{ item.Rut }}</div>
              <div>{{ item.NombreTrabajador }}</div>
            </td>
            <td>{{ item.TurnoEntrada }}</td>
            <td>{{ item.MarcaEntrada }}</td>
            <td>{{ item.TurnoSalida }}</td>
            <td>{{ item.MarcaSalida }}</td>
            <td>P</td>
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
          <td>Total</td>
          <td>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  apiResponse: {
    type: Object,
    required: true
  }
})

const mostrarLeyendas = ref(false);
const toggleLeyendas = () => {
  mostrarLeyendas.value = !mostrarLeyendas.value;
}

const formatHoras = (horas) => {
  if (horas !== null) {
    const tiempo = new Date(0);
    tiempo.setSeconds(horas); // Convierte los segundos a formato HH:MM:SS
    const horasStr = tiempo.getUTCHours().toString().padStart(2, '0');
    const minutosStr = tiempo.getUTCMinutes().toString().padStart(2, '0');
    const segundosStr = tiempo.getUTCSeconds().toString().padStart(2, '0');
    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }
  return '00:00:00';
};

</script>

<style scoped>
.card {
  border-radius: 0px;
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
</style>