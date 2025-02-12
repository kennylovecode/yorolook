<script setup lang="ts">
import SalesCard from "@/components/dashboard/SalesCard.vue";
import SourcesCard from "@/components/dashboard/SourcesCard.vue";
import ActivityCard from "@/components/dashboard/ActivityCard.vue";
import TableCard from "@/components/dashboard/TableCard.vue";
import TicketsCard from "@/components/dashboard/TicketsCard.vue";
// import TrackCard from "@/components/dashboard/TrackCard.vue";
import TodoCard from "@/components/dashboard/TodoCard.vue";
import TaskCard from "@/components/dashboard/ChartCard.vue";
import WalletCard from "@/components/dashboard/WalletCard.vue";

</script>
<template>
  <v-card class="card-shadow overflow-y-scroll" height="calc(100vh - 104px)"><wallet-card></wallet-card>
  </v-card>
</template>
<style lang="scss" scoped></style>
