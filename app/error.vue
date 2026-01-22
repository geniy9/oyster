<script setup>
const props = defineProps({
  error: Object
})

const lines = ref([])
const random = (min, max) => Math.random() * (max - min) + min

onMounted(() => {
  const count = 100
  const newLines = []
  for (let i = 0; i < count; i++) {
    const direction = i % 2 === 0 ? 'left' : 'right'
    const hue = Math.floor(random(0, 360))
    const color = `hsl(${hue}, 80%, 75%)`

    newLines.push({
      id: i,
      width: random(20, 80), 
      top: random(0, 100), 
      opacity: random(0.1, 0.5), 
      duration: random(4, 24), 
      delay: random(0, 5) * -1, 
      direction: direction,
      color: color
    })
  }
  lines.value = newLines
})
</script>
<template>
  <div class="flex flex-col gap-6 items-center overflow-hidden justify-center text-center w-screen h-screen bg-black">
    
    <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div
        v-for="line in lines"
        :key="line.id"
        class="absolute h-px bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
        :style="{
          top: `${line.top}%`,
          left: 0,
          width: `${line.width}px`,
          opacity: line.opacity,
          backgroundColor: line.color, 
          boxShadow: `0 0 8px ${line.color}`, 
          animationName: `move-${line.direction}`,
          animationDuration: `${line.duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${line.delay}s`
        }"
      ></div>
    </div>

    <div class="relative z-10 flex flex-col items-center gap-8 text-center px-4">

      <!-- <img src="/404.svg" alt="404" class="w-80" /> -->
      <div class="w-full max-w-150 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 700 280" style="enable-background:new 0 0 700 280;" xml:space="preserve" class="glitch-svg w-full h-auto">
          <g id="svg404">
            <rect x="114.4" y="35.6" class="st0" width="53" height="17"/>
            <rect x="34.7" y="35.6" class="st0" width="53" height="17"/>
            <rect x="137" y="85.9" class="st0" width="53" height="17"/>
            <rect x="57.3" y="85.9" class="st0" width="53" height="17"/>
            <path class="st0" d="M167.4,173.5H34.6v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L167.4,173.5z"/>
            <rect x="125.7" y="102.9" class="st0" width="53" height="23.5"/>
            <rect x="125.7" y="52.5" class="st0" width="53" height="33.4"/>
            <path class="st0" d="M99,9.2c0-1.3-1-2.3-2.3-2.3H48.3c-1.3,0-2.3,1-2.3,2.3v26.4h53L99,9.2L99,9.2z"/>
            <path class="st0" d="M178.7,9.2c0-1.3-1-2.3-2.3-2.3H128c-1.3,0-2.3,1-2.3,2.3v26.4h53L178.7,9.2L178.7,9.2z"/>
            <rect x="46" y="52.5" class="st0" width="53" height="33.4"/>
            <rect x="46" y="102.9" class="st0" width="53" height="23.5"/>
            <path class="st0" d="M48.3,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H46C46.1,191.7,47,192.6,48.3,192.6L48.3,192.6z"/>
            <path class="st0" d="M125.7,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2H46v43.8h132.8v-43.8L125.7,129.7
              L125.7,129.7z"/>
            <path class="st0" d="M125.7,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L125.7,270L125.7,270z"/>
            <rect x="137" y="226.7" class="st0" width="53" height="17"/>
            <rect x="103.1" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="23.4" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="132.5" y="35.6" class="st1" width="53" height="17"/>
            <rect x="52.7" y="35.6" class="st1" width="53" height="17"/>
            <rect x="155.1" y="85.9" class="st1" width="53" height="17"/>
            <rect x="75.4" y="85.9" class="st1" width="53" height="17"/>
            <path class="st1" d="M185.5,173.5H52.7v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L185.5,173.5z"/>
            <rect x="143.8" y="102.9" class="st1" width="53" height="23.5"/>
            <rect x="143.8" y="52.5" class="st1" width="53" height="33.4"/>
            <path class="st1" d="M117.1,9.2c0-1.3-1-2.3-2.3-2.3H66.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L117.1,9.2L117.1,9.2z"/>
            <path class="st1" d="M196.8,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L196.8,9.2L196.8,9.2z"/>
            <rect x="64" y="52.5" class="st1" width="53" height="33.4"/>
            <rect x="64" y="102.9" class="st1" width="53" height="23.5"/>
            <path class="st1" d="M66.4,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H64.1C64.2,191.7,65.1,192.6,66.4,192.6L66.4,192.6z"/>
            <path class="st1" d="M143.8,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2H64v43.8h132.8v-43.8L143.8,129.7
              L143.8,129.7z"/>
            <path class="st1" d="M143.8,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L143.8,270L143.8,270z"/>
            <rect x="155.1" y="226.7" class="st1" width="53" height="17"/>
            <rect x="121.2" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="41.4" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="123.4" y="35.6" class="st2" width="53" height="17"/>
            <rect x="43.7" y="35.6" class="st2" width="53" height="17"/>
            <rect x="146" y="85.9" class="st2" width="53" height="17"/>
            <rect x="66.3" y="85.9" class="st2" width="53" height="17"/>
            <path class="st2" d="M176.5,173.5H43.7v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L176.5,173.5z"/>
            <rect x="134.7" y="102.9" class="st2" width="53" height="23.5"/>
            <rect x="134.7" y="52.5" class="st2" width="53" height="33.4"/>
            <path class="st2" d="M108,9.2c0-1.3-1-2.3-2.3-2.3H57.3c-1.3,0-2.3,1-2.3,2.3v26.4h53L108,9.2L108,9.2z"/>
            <path class="st2" d="M187.8,9.2c0-1.3-1-2.3-2.3-2.3H137c-1.3,0-2.3,1-2.3,2.3v26.4h53L187.8,9.2L187.8,9.2z"/>
            <rect x="55" y="52.5" class="st2" width="53" height="33.4"/>
            <rect x="55" y="102.9" class="st2" width="53" height="23.5"/>
            <path class="st2" d="M57.3,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H55C55.1,191.7,56.1,192.6,57.3,192.6L57.3,192.6z"/>
            <path class="st2" d="M134.7,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2H55v43.8h132.8v-43.8L134.7,129.7
              L134.7,129.7z"/>
            <path class="st2" d="M134.7,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L134.7,270L134.7,270z"/>
            <rect x="146" y="226.7" class="st2" width="53" height="17"/>
            <rect x="112.1" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="32.4" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="84.8" y="206.5" class="st0" width="17.5" height="11.3"/>
            <rect x="37.7" y="257.1" class="st0" width="17.5" height="11.3"/>
            <rect x="9.1" y="58.8" class="st0" width="17.5" height="11.3"/>
            <rect x="201.3" y="62.3" class="st1" width="25.4" height="14.7"/>
            <rect x="576.8" y="35.6" class="st0" width="53" height="17"/>
            <rect x="497.1" y="35.6" class="st0" width="53" height="17"/>
            <rect x="599.4" y="85.9" class="st0" width="53" height="17"/>
            <rect x="519.7" y="85.9" class="st0" width="53" height="17"/>
            <path class="st0" d="M629.9,173.5H497.1v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L629.9,173.5z"/>
            <rect x="588.1" y="102.9" class="st0" width="53" height="23.5"/>
            <rect x="588.1" y="52.5" class="st0" width="53" height="33.4"/>
            <path class="st0" d="M561.4,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L561.4,9.2L561.4,9.2z"/>
            <path class="st0" d="M641.2,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L641.2,9.2L641.2,9.2z"/>
            <rect x="508.4" y="52.5" class="st0" width="53" height="33.4"/>
            <rect x="508.4" y="102.9" class="st0" width="53" height="23.5"/>
            <path class="st0" d="M510.7,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H508.4C508.5,191.7,509.5,192.6,510.7,192.6L510.7,192.6z
              "/>
            <path class="st0" d="M588.1,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2h-53v43.8h132.8v-43.8L588.1,129.7
              L588.1,129.7z"/>
            <path class="st0" d="M588.1,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L588.1,270L588.1,270z"/>
            <rect x="599.4" y="226.7" class="st0" width="53" height="17"/>
            <rect x="565.5" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="485.8" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="594.9" y="35.6" class="st1" width="53" height="17"/>
            <rect x="515.2" y="35.6" class="st1" width="53" height="17"/>
            <rect x="617.5" y="85.9" class="st1" width="53" height="17"/>
            <rect x="537.8" y="85.9" class="st1" width="53" height="17"/>
            <path class="st1" d="M647.9,173.5H515.2v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L647.9,173.5z"/>
            <rect x="606.2" y="102.9" class="st1" width="53" height="23.5"/>
            <rect x="606.2" y="52.5" class="st1" width="53" height="33.4"/>
            <path class="st1" d="M579.5,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L579.5,9.2L579.5,9.2z"/>
            <path class="st1" d="M659.2,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L659.2,9.2L659.2,9.2z"/>
            <rect x="526.5" y="52.5" class="st1" width="53" height="33.4"/>
            <rect x="526.5" y="102.9" class="st1" width="53" height="23.5"/>
            <path class="st1" d="M528.8,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H526.5C526.6,191.7,527.6,192.6,528.8,192.6z"/>
            <path class="st1" d="M606.2,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2h-53v43.8h132.8v-43.8L606.2,129.7
              L606.2,129.7z"/>
            <path class="st1" d="M606.2,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L606.2,270L606.2,270z"/>
            <rect x="617.5" y="226.7" class="st1" width="53" height="17"/>
            <rect x="583.6" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="503.9" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="585.8" y="35.6" class="st2" width="53" height="17"/>
            <rect x="506.1" y="35.6" class="st2" width="53" height="17"/>
            <rect x="608.5" y="85.9" class="st2" width="53" height="17"/>
            <rect x="528.7" y="85.9" class="st2" width="53" height="17"/>
            <path class="st2" d="M638.9,173.5H506.1v16.8c0,0.1,0,0.1,0,0.2h132.8V173.5L638.9,173.5z"/>
            <rect x="597.2" y="102.9" class="st2" width="53" height="23.5"/>
            <rect x="597.2" y="52.5" class="st2" width="53" height="33.4"/>
            <path class="st2" d="M570.5,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L570.5,9.2L570.5,9.2z"/>
            <path class="st2" d="M650.2,9.2c0-1.3-1-2.3-2.3-2.3h-48.4c-1.3,0-2.3,1-2.3,2.3v26.4h53L650.2,9.2L650.2,9.2z"/>
            <rect x="517.4" y="52.5" class="st2" width="53" height="33.4"/>
            <rect x="517.4" y="102.9" class="st2" width="53" height="23.5"/>
            <path class="st2" d="M519.8,192.6h75.1c1.3,0,2.3,1,2.3,2.3v31.7h53v-36.2H517.4C517.5,191.7,518.5,192.6,519.8,192.6L519.8,192.6z
              "/>
            <path class="st2" d="M597.2,129.7v7.2c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-7.2h-53v43.8h132.8v-43.8L597.2,129.7
              L597.2,129.7z"/>
            <path class="st2" d="M597.2,270c0,1.3,1,2.3,2.3,2.3h48.4c1.3,0,2.3-1,2.3-2.3v-26.4h-53L597.2,270L597.2,270z"/>
            <rect x="608.5" y="226.7" class="st2" width="53" height="17"/>
            <rect x="574.5" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="494.8" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="547.2" y="206.5" class="st0" width="17.5" height="11.3"/>
            <rect x="500.1" y="257.1" class="st0" width="17.5" height="11.3"/>
            <rect x="471.6" y="58.8" class="st0" width="17.5" height="11.3"/>
            <rect x="663.7" y="62.3" class="st1" width="25.4" height="14.7"/>
            <rect x="271" y="35.6" class="st0" width="132.8" height="17"/>
            <rect x="293.6" y="85.9" class="st0" width="53" height="17"/>
            <rect x="373.4" y="85.9" class="st0" width="53" height="17"/>
            <rect x="271" y="173.5" class="st0" width="53" height="17"/>
            <rect x="350.8" y="173.5" class="st0" width="53" height="17"/>
            <rect x="282.3" y="102.9" class="st0" width="53" height="23.5"/>
            <rect x="282.3" y="129.7" class="st0" width="53" height="43.8"/>
            <path class="st0" d="M335.4,62.5c0-1.3,1-2.3,2.3-2.3h22c1.3,0,2.3,1,2.3,2.3v23.4h53V52.5H282.3v33.4h53L335.4,62.5L335.4,62.5z"
              />
            <rect x="362.1" y="102.9" class="st0" width="53" height="23.5"/>
            <path class="st0" d="M415.1,33.5c0-7.3-2.7-13.7-8.1-19.1c-5-5-11.2-7.5-18.5-7.5H309c-7.5,0-13.8,2.5-19.1,7.5
              c0,0-0.1,0.1-0.1,0.1c-5,5.4-7.5,11.8-7.5,19.1v2.1h132.8V33.5L415.1,33.5z"/>
            <path class="st0" d="M362.1,216.7c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-26.2h-53v36.2h132.8v-36.2h-53L362.1,216.7
              L362.1,216.7z"/>
            <path class="st0" d="M282.3,245.7c0,7.3,2.5,13.7,7.5,19.1c0,0,0.1,0.1,0.1,0.1c5.2,5,11.6,7.5,19.1,7.5h79.5
              c7.1,0,13.3-2.5,18.5-7.5c5.4-5.4,8.1-11.8,8.1-19.1v-2.1H282.3V245.7L282.3,245.7z"/>
            <rect x="362.1" y="129.7" class="st0" width="53" height="43.8"/>
            <rect x="293.6" y="226.7" class="st0" width="132.8" height="17"/>
            <rect x="259.7" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="339.5" y="126.3" class="st0" width="53" height="3.4"/>
            <rect x="289.1" y="35.6" class="st1" width="132.8" height="17"/>
            <rect x="311.7" y="85.9" class="st1" width="53" height="17"/>
            <rect x="391.5" y="85.9" class="st1" width="53" height="17"/>
            <rect x="289.1" y="173.5" class="st1" width="53" height="17"/>
            <rect x="368.9" y="173.5" class="st1" width="53" height="17"/>
            <rect x="300.4" y="102.9" class="st1" width="53" height="23.5"/>
            <rect x="300.4" y="129.7" class="st1" width="53" height="43.8"/>
            <path class="st1" d="M353.5,62.5c0-1.3,1-2.3,2.3-2.3h22c1.3,0,2.3,1,2.3,2.3v23.4h53V52.5H300.4v33.4h53L353.5,62.5L353.5,62.5z"
              />
            <rect x="380.2" y="102.9" class="st1" width="53" height="23.5"/>
            <path class="st1" d="M433.2,33.5c0-7.3-2.7-13.7-8.1-19.1c-5-5-11.2-7.5-18.5-7.5h-79.5c-7.5,0-13.8,2.5-19.1,7.5
              c0,0-0.1,0.1-0.1,0.1c-5,5.4-7.5,11.8-7.5,19.1v2.1h132.8V33.5L433.2,33.5z"/>
            <path class="st1" d="M380.2,216.7c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-26.2h-53v36.2h132.8v-36.2h-53L380.2,216.7
              L380.2,216.7z"/>
            <path class="st1" d="M300.4,245.7c0,7.3,2.5,13.7,7.5,19.1c0,0,0.1,0.1,0.1,0.1c5.2,5,11.6,7.5,19.1,7.5h79.5
              c7.1,0,13.3-2.5,18.5-7.5c5.4-5.4,8.1-11.8,8.1-19.1v-2.1H300.4V245.7L300.4,245.7z"/>
            <rect x="380.2" y="129.7" class="st1" width="53" height="43.8"/>
            <rect x="311.7" y="226.7" class="st1" width="132.8" height="17"/>
            <rect x="277.8" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="357.5" y="126.3" class="st1" width="53" height="3.4"/>
            <rect x="280.1" y="35.6" class="st2" width="132.8" height="17"/>
            <rect x="302.7" y="85.9" class="st2" width="53" height="17"/>
            <rect x="382.4" y="85.9" class="st2" width="53" height="17"/>
            <rect x="280.1" y="173.5" class="st2" width="53" height="17"/>
            <rect x="359.8" y="173.5" class="st2" width="53" height="17"/>
            <rect x="291.4" y="102.9" class="st2" width="53" height="23.5"/>
            <rect x="291.4" y="129.7" class="st2" width="53" height="43.8"/>
            <path class="st2" d="M344.4,62.5c0-1.3,1-2.3,2.3-2.3h22c1.3,0,2.3,1,2.3,2.3v23.4h53V52.5H291.4v33.4h53L344.4,62.5L344.4,62.5z"
              />
            <rect x="371.1" y="102.9" class="st2" width="53" height="23.5"/>
            <path class="st2" d="M424.2,33.5c0-7.3-2.7-13.7-8.1-19.1c-5-5-11.2-7.5-18.5-7.5H318c-7.5,0-13.8,2.5-19.1,7.5
              c0,0-0.1,0.1-0.1,0.1c-5,5.4-7.5,11.8-7.5,19.1v2.1h132.8V33.5L424.2,33.5z"/>
            <path class="st2" d="M371.1,216.7c0,1.3-1,2.3-2.3,2.3h-22c-1.3,0-2.3-1-2.3-2.3v-26.2h-53v36.2h132.8v-36.2h-53L371.1,216.7
              L371.1,216.7z"/>
            <path class="st2" d="M291.4,245.7c0,7.3,2.5,13.7,7.5,19.1c0,0,0.1,0.1,0.1,0.1c5.2,5,11.6,7.5,19.1,7.5h79.5
              c7.1,0,13.3-2.5,18.5-7.5c5.4-5.4,8.1-11.8,8.1-19.1v-2.1H291.4V245.7L291.4,245.7z"/>
            <rect x="371.1" y="129.7" class="st2" width="53" height="43.8"/>
            <rect x="302.7" y="226.7" class="st2" width="132.8" height="17"/>
            <rect x="268.8" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="348.5" y="126.3" class="st2" width="53" height="3.4"/>
            <rect x="256.4" y="60.5" class="st0" width="17.5" height="11.3"/>
            <rect x="245.9" y="234.8" class="st0" width="17.5" height="11.3"/>
            <rect x="441.6" y="35" class="st1" width="14.7" height="14.7"/>
            <rect x="442.3" y="178.3" class="st1" width="14.7" height="14.7"/>
          </g>
        </svg>
      </div>

      <h1 class="uppercase text-xl md:text-2xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500 tracking-wide">
        {{ $t('text.page_not_found') }}
      </h1>
      <NuxtLink to="/" class="flex items-center justify-center p-2 w-44  rounded-full border border-white/50 hover:bg-black hover:text-white transition-colors duration-300 uppercase text-xs">
        {{ $t('text.go_back_home') }}
      </NuxtLink>
      <pre>{{ error.status }}</pre>

    </div>
  </div>
</template>
<style>
@keyframes move-left {
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
}
@keyframes move-right {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}

/* SVG (Глитч и Мерцание) */
.st0{fill:#00FFFB;}
.st1{fill:#C81AC6;}
.st2{fill:#FFFFFF;}

svg g#svg404 > * {
  animation: svg-flicker 4s infinite linear alternate;
  transform-box: fill-box;
  opacity: 1;
}
/* Четные элементы - быстрое мерцание */
svg g#svg404 > *:nth-child(2n) {
  animation-duration: 2s;
  animation-delay: 0.2s;
}
/* Каждый 3-й элемент - медленное мерцание + легкий сдвиг */
svg g#svg404 > *:nth-child(3n) {
  animation-name: svg-glitch;
  animation-duration: 3s;
  animation-delay: 0.5s;
}
/* Каждый 5-й элемент - быстрое мерцание */
svg g#svg404 > *:nth-child(5n) {
  animation-duration: 0.5s;
  animation-delay: 1.5s;
}
/* Каждый 7-й элемент "скачок" */
svg g#svg404 > *:nth-child(7n) {
  animation-name: svg-glitch-hard;
  animation-duration: 5s;
  animation-delay: 0s;
}
/* мерцание */
@keyframes svg-flicker {
  0%, 10%, 90%, 100% { opacity: 1; }
  45% { opacity: 0.6; }
  50% { opacity: 0.2; }
  55% { opacity: 0.7; }
}
/* Легкий глитч */
@keyframes svg-glitch {
  0%, 95% { 
    opacity: 1; 
    transform: translate(0, 0); 
  }
  96% { 
    opacity: 0.5; 
    transform: translate(-2px, 1px);
  }
  97% { 
    opacity: 1; 
    transform: translate(0, 0); 
  }
  98% { 
    opacity: 0.3; 
    transform: translate(2px, -1px);
  }
  100% { 
    opacity: 1; 
    transform: translate(0, 0); 
  }
}

@keyframes svg-glitch-hard {
  0%, 92% { opacity: 1; transform: translate(0,0); }
  93% { opacity: 0; transform: translate(5px, 0); }
  94% { opacity: 1; transform: translate(-5px, 0); }
  95% { opacity: 1; transform: translate(0,0); }
}
</style>