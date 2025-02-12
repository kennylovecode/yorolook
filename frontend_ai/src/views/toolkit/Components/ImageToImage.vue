
<script setup lang="ts">
import { txt2imgApi } from "@/api/stableDiffusionApi";
import { useStableDiffusionStore } from "@/stores/stableDiffusionStore";
const sdStore = useStableDiffusionStore();
const params = reactive({
  seed: -1,
  enable_hr: false,
  height: 200,
  negative_prompt: "",
  prompt: "1cat",
  width: 200,
  steps: 20,
});

const imageGenerate = async () => {
  const res = await txt2imgApi(params);
  sdStore.updateImgList(res.data.images);
};
</script>

<template>
  <v-card>
    <v-card-text>
      <!-- ---------------------------------------------- -->
      <!-- Prompt  -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">{{ $t('toolkit.prompt') }}</v-label>
      <v-textarea
        v-model="params.prompt"
        color="primary"
        variant="outlined"
        density="compact"
        type="text"
        placeholder="Prompt"
        hide-details
      />
      <!-- ---------------------------------------------- -->
      <!-- Negative Prompt  -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">{{ $t('toolkit.negative_prompt')}}</v-label>
      <v-textarea
        v-model="params.negative_prompt"
        color="primary"
        variant="outlined"
        density="compact"
        type="text"
        placeholder="Negative Prompt"
        hide-details
      />
      <v-btn style="margin-top: 1rem;"  size="x-large" color="primary" block @click="imageGenerate"
        >Generate</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss"></style>
