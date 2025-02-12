<template>
  <div class="d-flex text-center flex-grow-1">
    <v-sheet class="layout-side d-none d-md-flex flex-column justify-space-between">
      <div class="mt-3 mt-md-10 pa-2">
        <div class="text-primary text-h4 font-weight-bold">
          <span class="gradient-text">{{ $t('system.title') }}</span>
        </div>
        <div class="title my-2">
          {{ $t('system.welcome') }}
        </div>
      </div>
    </v-sheet>
    <v-card variant="outlined" class="flex-grow-1 d-flex align-center justify-center flex-column rounded-0">
      <div class="layout-content ma-auto w-full">
        <slot></slot>
      </div>
      <div class="pa-5">{{ $t('system.copyright') }}</div>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.layout-side {
  width: 38.6%;
  background-size: cover
}

.layout-content {
  max-width: 480px;
}

.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
