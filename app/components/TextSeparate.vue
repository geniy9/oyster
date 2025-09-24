<template>
  <div class="main_title relative">
    <h1 class="relative inset-0 text-black z-10"><slot /></h1>
    <h1 data-speed="0.95" class="inset-0 text-transparent"><slot /></h1>
    <h1 data-speed="0.9" class="inset-0 text-transparent"><slot /></h1>
    <h1 data-speed="0.85" class="inset-0 text-transparent"><slot /></h1>
    <h1 data-speed="0.8" class="inset-0 text-transparent"><slot /></h1>
    <h1 data-speed="0.75" class="inset-0 text-transparent"><slot /></h1>
    <h1 data-speed="0.7" class="inset-0 text-transparent z-5"><slot /></h1>
  </div>
</template>
<style>
.main_title h1 {
  position: absolute;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgba(0,0,0,.3);
  /* -webkit-text-stroke-color: rgba(255,255,255,1); */
}
</style>