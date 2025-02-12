<template>
    <v-card>
        <v-card-text>
            <v-img v-for="src in props.images" :src="src"></v-img>
            <div style="white-space: pre-wrap;">
                {{ props.descript }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const props = defineProps<{
    images?: string[]
    descript?: string
}>()
</script>