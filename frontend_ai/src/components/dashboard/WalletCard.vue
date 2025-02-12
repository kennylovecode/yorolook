<script setup lang="ts">
import CopyLabel from "@/components/common/CopyLabel.vue";
import { getWallets } from "~/src/api/user";
const loading = ref(false);

const headers = [
  { text: "编号", align: "start", value: "id" },
  {
    text: "名称",
    sortable: false,
    value: "title",
  },
  {
    text: "类型",
    sortable: false,
    value: "type",
  },
  { text: "原额度", value: "before" },
  { text: "变动额度", value: "value" },
  { text: "变动后额度", value: "after" },
  { text: "账单时间", value: "updated_at" },
];
const items = ref<any>([]);

const open = (item) => {};

onMounted(() => {
  loading.value = true
  getWallets({
    idx: 1,
    size: 10,
  }).then((res) => {
    items.value = res.data;
    console.log(items.value)
    loading.value = false
  })
});
</script>

<template>
  <!-- loading spinner -->
  <div v-if="loading" class="h-full d-flex flex-grow-1 align-center justify-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <h6 class="text-h6 font-weight-bold pa-5 d-flex align-center">
      <span class="flex-fill">我的账单</span>
    </h6>
    <v-table class="pa-3">
      <thead>
        <tr>
          <th class="text-left" v-for="header in headers" :key="header.text">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="font-weight-bold">
            <copy-label :text="`# ${item.id}`" />
          </td>
          <td>
            <copy-label :text="item.title" />
          </td>
          <td>
            <v-chip size="small" :color="item.value>0 ? 'pink' : 'warning'" class="font-weight-bold">
              {{ item.type === "amount" ? "Y币" : "积分" }}{{ item.value>0 ? '充值' : '消费' }}</v-chip>
          </td>

          <td class="font-weight-bold">
            {{ (item.before / 100).toFixed(2) }}
          </td>
          <td class="font-weight-bold">
            {{ (item.value / 100).toFixed(2) }}
          </td>
          <td class="font-weight-bold">
            {{ (item.after / 100).toFixed(2) }}
          </td>
          <td>{{ item.updated_at }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped>
.v-table {
  table {
    padding: 4px;
    padding-bottom: 8px;

    th {
      text-transform: uppercase;
      white-space: nowrap;
    }

    td {
      border-bottom: 0 !important;
    }

    tbody {
      tr {
        transition: box-shadow 0.2s, transform 0.2s;

        &:not(.v-data-table__selected):hover {
          box-shadow: 0 3px 15px -2px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
      }
    }
  }
}
</style>
