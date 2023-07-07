<template>
    <div class="col-7">
        <div class="row">
          <div class="col-3">
            <select class="form-select filtros" aria-label="Default select example">
              <option selected>Cadena</option>
              <option v-for="item in obtenerCadenas">One</option>
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
            <input type="text" name="daterange" value="04/01/2023- 04/01/2023" class="form-select filtros" />
          </div>
        </div>
      </div>
</template>

<script setup>

</script>

<style scoped>

</style>