<script setup lang="ts" name="WarehouseItem">
import { ref, computed, watch } from 'vue';
import { normalizeDisplayMaterial } from '../../../composables/materials';

const props = defineProps({
    material: {
        type: Object,
        required: true
    }
});

const emit = defineEmits<{(e: 'update:quantity', quantity: number): void}>()

const quantity = ref(props.material.Quantity);

const normalizedMaterial = computed(() => {
    const result = normalizeDisplayMaterial(props.material);
    return result;
});

const updateQuantity = () => {
    const newQuantity = Number(quantity.value)
    if (!isNaN(newQuantity)) {
        emit('update:quantity', Number(quantity.value));
    }
};

// Must listen to parent component's prop changes, or the quantity won't update instantly
watch(() => props.material, (newValue) => {
    quantity.value = newValue.Quantity
})

</script>

<template>
    <div class="pb-6">
        <div class="relative inline-block">
            <img :src="normalizedMaterial.borderImagePath" alt="Border Image" class="w-20 h-20 absolute" />
            <img :src="normalizedMaterial.itemImagePath" alt="Material Image" class="w-20 h-20" />
            <input v-model="quantity" @input="updateQuantity" type="text" placeholder=""
                class="bg-slate-600 text-white absolute -bottom-3 left-3 w-14 input input-xs rounded-t-none text-center" />
        </div>
    </div>
</template>
