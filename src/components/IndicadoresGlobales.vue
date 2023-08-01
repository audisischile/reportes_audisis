<template>
  <div class="row justify-content-center" style="padding-left: 10px; padding-right: 7px;">
        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: rgb(240, 240, 240)">
              {{ apiResponse.usuario_local[0].locales_programadas }}
              </span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto">Locales programados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">
              {{ apiResponse.usuario_local[0].locales_completados}}
            </span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto">Locales completados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">
              {{ apiResponse.usuario_local[0].locales_iniciados}}
            </span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto">Locales iniciados</span>
            </div>
          </div>
        </div>

        <div class="indicador-card card col-2 me-2 flex-fill shadow">
          <div class="mt-1 d-flex align-items-center justify-content-between">
            <div>
              <span class="indicador-numero" style="color: white">
              {{ apiResponse.usuario_local[0].locales_pendientes}}
            </span>
            </div>
            <div>
              <i class="bi bi-bar-chart indicador-icono"></i>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="col-6">
              <span class="indicador-texto">Locales pendientes</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
const props = defineProps(['apiResponse'])

</script>

<style scoped>
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
  color: rgb(227, 227, 227);
  font-family: "Fira Sans", sans-serif;
}

.indicador-numero {
  font-size: 30px;
  color: rgb(136, 136, 136);
  font-family: "Oswald", sans-serif;
}

.indicador-icono {
  font-size: 30px;
  background-image: linear-gradient(to bottom, rgba(250, 250, 250, 0.5), rgba(255, 255, 255, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.card {
  border-radius: 0px;
}

</style>