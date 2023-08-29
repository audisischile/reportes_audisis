<template>
    <div class="progress-outer">
        <div class="progress">
            <div class="progress-bar" :style="{ width: progressValue + '%' }">
            </div>
            <div class="progress-value">
                <span>{{ counter }}</span>%
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['initialValue']);

const counter = ref(0);
const progressValue = ref(0);

watch(
    () => props.initialValue,
    (newValue) => {
        progressValue.value = newValue;
        let start = 0;
        const duration = 1000;
        const step = 100;
        const increment = (newValue - start) / (duration / step);

        const intervalId = setInterval(() => {
            start += increment;
            counter.value = Math.ceil(start);
            if (counter.value >= newValue) {
                clearInterval(intervalId);
            }
        }, step);
    },
    { immediate: true }
);
</script>
  
<style>
.progress-outer {
    background: #fff;
    padding: 5px 60px 5px 5px;
    border: 0px solid #bebfbf;
    margin-bottom: 0px;
    position: relative;
}

.progress {
    background: #bebfbf;
    border-radius: 0px;
    margin: 0;
}

.progress .progress-bar {
    background-color: #F97013;
    border-radius: 0px;
    box-shadow: none;
    animation: animate-positive 2s;
}

.progress .progress-value {
    font-size: 12px;
    font-weight: 500;
    color: #6b7880;
    position: absolute;
    top: 3px;
    right: 10px;
    font-family: Roboto, sans-serif;
}

@keyframes animate-positive {
    0% {
        width: 0;
    }
}
</style>
  