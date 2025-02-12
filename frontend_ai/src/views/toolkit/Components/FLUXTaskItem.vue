<template>
    <div>
        <template v-if="row.status === 255 && (row.result?.url || row.result?.imageUrl || row.result?.cdnImage)">
            <v-card-actions class="d-flex flex-wrap" v-if="row.result?.components?.length > 0">
                <v-btn size="small" @click="action(row, btn, $t('toolkit.FLUX.' + btn))"
                    v-for="btn in row.result.components" class="text-none mb-4" color="primary" variant="flat">{{
                        $t("toolkit.FLUX." + btn) }} -50Y{{
                        $t("system.coin") }}</v-btn>
            </v-card-actions>
            <v-card-actions class="d-flex flex-wrap" v-if="row.result?.buttons?.length > 0">
                <v-btn size="small"
                    @click="action(row, btn.customId, $t(`toolkit.FLUX.${btn.label.replace('.', '') || btn.emoji}`))"
                    v-for="btn in row.result.buttons" class="text-none mb-4" color="primary" variant="flat">{{ btn.emoji
                        +
                        $t("toolkit.FLUX." + (btn.label.replace(".", "") ||btn.emoji)) }} -50Y{{
                        $t("system.coin") }}</v-btn>
            </v-card-actions>
        </template>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    row: {},
})
const row = ref<any>()
onBeforeMount(()=>{
    if(props.row)
        row.value = props.row
})

const emits = defineEmits(["action"])
const action = (task: any, action: string, title?: string)=>{
    emits("action", task, action, title)
}
</script>