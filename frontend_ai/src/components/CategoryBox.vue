<template>
    <v-subheader class="category-filter-header">选择类别</v-subheader>
    <div class="flex justify-start">
        <v-chip v-for="category in categories" size="large" class="mr-2 mt-2"
            :color="isSelected(category.value) ? 'success' : 'primary'" @click="toggleSelection(category.value)" close
            close-icon="mdi-close" @click:close="removeSelection(category.value)">
            <v-avatar class="category-avatar">
                <img :src="category.image" alt="Category Image" />
            </v-avatar>
            {{ category.text }}
        </v-chip>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CategoryFilter',
    setup() {
        const categories = [
            { text: '科技', value: 'tech', image: 'https://via.placeholder.com/50?text=Tech' },
            { text: '体育', value: 'sports', image: 'https://via.placeholder.com/50?text=Sports' },
            { text: '娱乐', value: 'entertainment', image: 'https://via.placeholder.com/50?text=Entertainment' },
            { text: '教育', value: 'education', image: 'https://via.placeholder.com/50?text=Education' }
        ];

        const selectedCategories = ref<string[]>([]);

        const isSelected = (value: string) => {
            return selectedCategories.value.includes(value);
        };

        const toggleSelection = (value: string) => {
            if (isSelected(value)) {
                removeSelection(value);
            } else {
                addSelection(value);
            }
        };

        const addSelection = (value: string) => {
            selectedCategories.value.push(value);
        };

        const removeSelection = (value: string) => {
            selectedCategories.value = selectedCategories.value.filter(v => v !== value);
        };

        return {
            categories,
            selectedCategories,
            isSelected,
            toggleSelection,
            addSelection,
            removeSelection
        };
    }
});
</script>

<style scoped>
.category-filter-container {
    padding: 20px;
}

.category-filter-header {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
}

.category-chip:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-avatar {
    margin-right: 10px;
}
</style>