<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { computed, ref, watch } from 'vue'
import { converter, getHistory } from '@/services/converter'
import { useToast } from 'primevue/usetoast'
import { useUser } from '@/stores/user'

const userStore = useUser()
const user = computed(() => userStore.user)
const loading = ref(false)
const table = ref(null)
const total = ref(0)
const ufValue = ref(0)
const dateFormat = ref('dd/mm/yy')
const toast = useToast()
const conversions = ref([])

const formatDate = (value) => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  return `${day}/${month}/${year}`
}

const formatDateTime = (value) => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

const amount = ref(1)
const selectedDate = ref(new Date())
const selectedDateFormatted = ref(formatDate(selectedDate.value))
const selectedTab = ref('convert')

watch(selectedDate, (value) => {
  selectedDateFormatted.value = formatDate(value)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 2
  })
    .format(value)
    .replace('$', '')
}

const changeTab = async (tab) => {
  if (tab === 'history') {
    await loadHistory()
  }
  selectedTab.value = tab
}

const exportCSV = () => {
  table.value.exportCSV()
}

const submit = async () => {
  loading.value = true
  if (!selectedDate.value || amount.value <= 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Debe ingresar una fecha y una cantidad válida',
      life: 3000
    })
    loading.value = false
    return
  }
  const date = new Date(selectedDate.value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const dateFormatted = `${year}-${month}-${day}`
  const conversion = await converter(dateFormatted, amount.value)

  console.log(conversion)
  if (!conversion) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo realizar la conversión',
      life: 3000
    })
    return
  }

  total.value = conversion.converted_amount
  ufValue.value = conversion.uf_value
  loading.value = false
}

const loadHistory = async () => {
  const response = await getHistory()

  console.log(response)
  conversions.value = response
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
          <li v-if="user.role == 'admin'">
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
              <div class="mt-2 sm:col-12 md:col lg:col xl:col">
                <div class="field">
                  <label for="email" class="block font-medium text-900 mb-2">Fecha</label>
                  <Calendar
                    v-model="selectedDate"
                    showIcon
                    iconDisplay="input"
                    :date-format="dateFormat"
                    :class="selectedDate === null ? 'p-invalid' : ''"
                    :max-date="new Date()"
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
                <div class="flex flex-column shadow-1 border-round-lg overflow-hidden w-full">
                  <div class="bg-primary p-5">
                    <div
                      class="flex justify-content-between flex-wrap gap-3 mb-4 align-items-center"
                    >
                      <div class="text-4xl font-bold">$</div>
                      <div class="text-4xl font-bold fadein animation-duration-800">
                        {{ formatCurrency(total) }}
                      </div>
                    </div>
                    <p>
                      El valor de la uf para la fecha
                      <strong>{{ selectedDateFormatted }}</strong> es de
                      <strong>{{ formatCurrency(ufValue) }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- History -->
        <div
          v-if="selectedTab === 'history' && user.role == 'admin'"
          class="surface-card p-5 shadow-2 border-round fadein animation-duration-900 w-full"
        >
          <div class="text-900 font-semibold text-lg mt-3">
            <i class="pi pi-history mr-2"></i>
            Historial
          </div>
          <Divider></Divider>
          <div class="card">
            <DataTable
              :value="conversions"
              :striped-rows="true"
              responsive-layout="scroll"
              :show-gridlines="true"
              class="p-datatable"
              ref="table"
              :paginator="true"
              scrollable
              :rows="5"
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
              <Column field="user.name" sortable header="Usuario" style="width: 20%">
                <template #body="slotProps">
                  {{ slotProps.data.user.name }}
                  <br />
                  <small>{{ slotProps.data.user.email }}</small>
                </template>
              </Column>
              <Column field="date" sortable header="Fecha UF" style="width: 15%">
                <template #body="slotProps">
                  {{ formatDate(slotProps.data.date) }}
                </template>
              </Column>
              <Column
                field="uf_value"
                header="Valor UF del día"
                class="text-center"
                style="width: 15%"
                sortable
              >
                <template #body="slotProps">
                  $ {{ formatCurrency(slotProps.data.uf_value) }}
                </template>
              </Column>
              <Column
                field="amount"
                header="Cantidad UF"
                sortable
                style="width: 15%"
                class="text-center"
              />
              <Column field="converted_amount" header="Conversión" style="width: 15%">
                <template #body="slotProps">
                  $ {{ formatCurrency(slotProps.data.converted_amount) }}
                </template>
              </Column>
              <Column field="created_at" header="Fecha Consulta" sortable style="width: 35%">
                <template #body="slotProps">
                  {{ formatDateTime(slotProps.data.created_at) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </AppLayout>
</template>
