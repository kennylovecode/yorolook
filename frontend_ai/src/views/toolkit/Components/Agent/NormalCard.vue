<template>
    <v-card>
        <div v-if="!error" class="d-flex justify-space-between align-center">
            
        </div>
    </v-card>
</template>

<script lang="ts" setup>

const data = ref<any[]>([])
const error = ref(false)
const props = defineProps<{
    content: string
}>()

onMounted(()=>{
    try {
        if(props.content)
        data.value = JSON.parse(props.content)
    } catch {
        error.value = true
    }
})

</script>