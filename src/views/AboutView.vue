<template>
    <div class="col-4" style="height: 100%;">
        <div class="card full-height" style="overflow-y: auto;">
            <div class="card-body">
                <GraficoUsuarios :datosUsuarios="apiResponse.porcentaje_locales" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import GraficoUsuarios from '@/components/GraficoUsuarios.vue'




</script>

<style scoped></style>