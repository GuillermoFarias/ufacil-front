<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { ref } from 'vue'

const loading = ref(false)

const submit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const table = ref(null)
const total = ref(0)
const dateFormat = ref('dd/mm/yy')
const entries = ref([
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }
])

const amount = ref(1)
const selectedDate = ref(new Date())
const selectedTab = ref('convert')

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value)
}

const changeTab = (tab) => {
  selectedTab.value = tab
}

const exportCSV = () => {
  table.value.exportCSV()
}
</script>
<template>
  <AppLayout>
    <div
      class="surface-ground sm:py-1 sm:px-1 md:px-8 md:py-8 lg:px-8 lg:py-8 xl:px-8 xl:py-8 h-screen"
    >
      <div class="p-fluid flex flex-column lg:flex-row">
        <ul
          class="list-none m-0 p-0 flex flex-row lg:flex-column justify-content-evenly md:justify-content-between lg:justify-content-start mb-5 lg:pr-8 lg:mb-0"
        >
          <li>
            <a
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors p-ripple"
              @click="changeTab('convert')"
            >
              <i class="pi pi-sync md:mr-2"></i>
              <span class="font-medium">Convertidor</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              class="flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors p-ripple"
              @click="changeTab('history')"
            >
              <i class="pi pi-history md:mr-2"></i>
              <span class="font-medium">Historial</span>
            </a>
          </li>
        </ul>
        <div
          v-if="selectedTab === 'convert'"
          class="surface-card p-5 shadow-2 border-round fadein animation-duration-900"
        >
          <div class="text-900 font-semibold text-lg mt-3">
            <i class="pi pi-sync mr-2"></i>
            Covertidor
          </div>
          <Divider></Divider>
          <div class="flex">
            <div class="grid">
              <div class="col">
                <div class="field">
                  <label for="email" class="block font-medium text-900 mb-2">Fecha</label>
                  <Calendar
                    v-model="selectedDate"
                    showIcon
                    iconDisplay="input"
                    :date-format="dateFormat"
                    :class="selectedDate === null ? 'p-invalid' : ''"
                  />
                </div>
                <div class="field mt-4">
                  <label for="website" class="block font-medium text-900 mb-2">Cantidad UF</label>
                  <!-- disabled icurrencies if not available -->
                  <InputNumber
                    v-model="amount"
                    :min="0"
                    :max="1000000"
                    :step="0.1"
                    :show-buttons="true"
                    :button-layout="'stacked'"
                    :minFractionDigits="2"
                    :maxFractionDigits="5"
                    locale="es-CL"
                    :class="amount <= 0 ? 'p-invalid' : ''"
                  />
                </div>
              </div>
              <div class="col-2 sm:col-12 md:col-3" style="min-width: 11rem">
                <div class="flex align-items-center justify-content-center h-11rem">
                  <Button
                    :label="loading ? '' : 'Convertir a CLP'"
                    class="fadein animation-duration-800"
                    :icon="loading ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'"
                    rounded
                    :outlined="!loading"
                    @click="submit"
                  ></Button>
                </div>
              </div>
              <div class="col text-cente h-full">
                <div class="flex flex-column shadow-1 border-round-lg overflow-hidden">
                  <div class="bg-primary p-5">
                    <div
                      class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center"
                    >
                      <div class="text-4xl font-bold">$</div>
                      <div class="text-4xl font-bold">{{ total }}</div>
                    </div>
                    <p>
                      La tasa de cambio para el día <strong>fecha</strong> es de
                      <strong>{{ 0 }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- History -->
        <div
          v-if="selectedTab === 'history'"
          class="surface-card p-5 shadow-2 border-round fadein animation-duration-900"
        >
          <div class="text-900 font-semibold text-lg mt-3">
            <i class="pi pi-history mr-2"></i>
            Historial
          </div>
          <Divider></Divider>
          <div class="flex">
            <div class="grid">
              <div class="card">
                <DataTable
                  :value="entries"
                  tableStyle="min-width: 50rem"
                  :striped-rows="true"
                  :show-gridlines="true"
                  class="overflow-x-auto"
                  ref="table"
                  :paginator="true"
                  scrollable
                  :rows="10"
                >
                  <template #header>
                    <div style="text-align: left">
                      <Button
                        icon="pi pi-external-link"
                        label="Export"
                        size="small"
                        class="w-auto"
                        outlined
                        rounded
                        @click="exportCSV($event)"
                      />
                    </div>
                  </template>
                  <Column field="code" header="Code" style="width: 20%"></Column>
                  <Column field="name" header="Name" style="width: 20%"></Column>
                  <Column field="price" header="Price">
                    <template #body="slotProps">
                      {{ formatCurrency(slotProps.data.price) }}
                    </template>
                  </Column>
                  <Column field="category" header="Category" style="width: 20%"></Column>
                  <Column field="quantity" header="Quantity" style="width: 20%"></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
