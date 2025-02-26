import { defineStore } from 'pinia'

interface INeededMaterialsMapping {
    [materialName: string]: number,
}

interface IGlobalStore {
    isEditingWarehouse: boolean,
    isEditingMaterial: string,
    neededRawMaterialsMapping: INeededMaterialsMapping,
    neededMaterialsMapping: INeededMaterialsMapping,
}

// can set some global state here, but never let it persist
export const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        isEditingWarehouse: false,
        isEditingMaterial: '',
        neededRawMaterialsMapping: {}, // return quantity for raw materials
        neededMaterialsMapping: {} // consider in-process crafting needs
    }),
    actions: {
        setIsEditingWarehouse (isEditing: boolean) {
            this.isEditingWarehouse = isEditing
        },
        setIsEditingMaterial (editingMaterial?: string) {
            this.isEditingMaterial = editingMaterial || ''
        },
        getNeededRawMaterialsQuantity (materialName) {
            return this.neededRawMaterialsMapping[materialName] || 0
        },
        updateNeededRawMaterialsMapping (mapping) {
            this.neededRawMaterialsMapping = {
                ...mapping
            }
        },
        getNeededMaterialsQuantity (materialName) {
            return this.neededMaterialsMapping[materialName] || 0
        },
        updateNeededMaterialsMapping (mapping) {
            this.neededMaterialsMapping = {
                ...mapping
            }
        }
    }
})
