<script setup>
import ArcanistIconToggle from '../arcanist/ArcanistIconToggle.vue';
import ItemList from '../item/ItemList.vue'
import { ref, computed } from 'vue';
import { useCalculation, mergeResults, formatResults } from '../../composables/CalculateMaterials';

const props = defineProps({
    selectedArcanists: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['open-edit-overlay']);

const arcanists = ref(props.selectedArcanists);

const handleLeftClick = (arcanist) => {
    emit('open-edit-overlay', arcanist);
};

const handleRightClick = (arcanist) => {
    // console.log('right clicked');
    arcanist.isVisible = !arcanist.isVisible;
};

const totalMaterials = computed(() => {
    const result = arcanists.value.map(arc => {
        if (!arc.isVisible) return [];
        return useCalculation(arc);
    });
    const mergedResult = mergeResults(result);
    const formattedResult = formatResults(mergedResult);
    return formattedResult;
});

</script>

<template>
    <div class="p-2">
        <div class="flex flex-row flex-wrap justify-center space-x-2">
            <ArcanistIconToggle v-for="arcanist in arcanists" :key="arcanist.Id" :arcanist="arcanist.Id"
                :visible="arcanist.isVisible" @click="handleLeftClick(arcanist)"
                @contextmenu.prevent="handleRightClick(arcanist)" />
            <div class="flex justify-center items-center">
                <button class="btn btn-ghost custom-gradient-button btn-sm text-white" onclick="goalMaterials.showModal()">Goal</button>
                <dialog id="goalMaterials" class="modal">
                    <div class="modal-box custom-gradient-gray-blue custom-border custom-scrollbar">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                        </form>
                        <h3 class="font-bold text-lg text-white text-center">Total Goal Materials</h3>
                        <div class="flex flex-col">
                            <ItemList v-if="totalMaterials" :materialList="totalMaterials" />
                        </div>
                        <form method="dialog" class="flex justify-center">
                            <button class="btn btn-sm btn-success text-black">Close</button>
                        </form>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>

        <p class="text-center text-slate-300 text-sm opacity-70 mt-2">Left click to edit, right click to show / hide.</p>
    </div>
</template>

<style scoped></style>
