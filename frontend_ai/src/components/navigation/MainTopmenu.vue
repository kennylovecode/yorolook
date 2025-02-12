<template>
    <div class="d-none d-sm-flex">
        <Logo />
        <v-tabs v-model="activeTab" color="primary" align-tabs="center" class="d-none d-sm-flex">
            <v-tab v-for="(item, index) in appsMenu" :key="index" :value="item.link" :to="item.link" :ripple="false">
                {{ $t(item.text) }}
            </v-tab>
        </v-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import appsMenu from '@/configs/menus/apps.menu';
import Logo from '../Logo.vue';

const router = useRouter();
const route = useRoute()

const activeTab = computed(() => route.path)

const isActive = (link) => {
    return route.path === link
}
</script>