<script setup>
import Button from 'primevue/button'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

const router = useRouter()
const loading = ref(false)
const userData = reactive({
  email: '',
  password: ''
})

const userPressets = {
  user: {
    email: 'tstark@ufacil.com',
    password: 'tony'
  },
  admin: {
    email: 'srogers@ufacil.com',
    password: 'steve'
  }
}

const assignUser = () => {
  userData.email = userPressets.user.email
  userData.password = userPressets.user.password
}

const assignAdmin = () => {
  userData.email = userPressets.admin.email
  userData.password = userPressets.admin.password
}

const submit = async () => {
  loading.value = true
  const response = await login(userData.email, userData.password)

  if (!response) {
    return
  }

  setTimeout(() => {
    loading.value = false
    router.push({ name: 'dashboard' })
  }, 300)
}
</script>
<template>
  <div class="flex justify-content-center align-content-center h-screen">
    <div class="flex flex-column xl:col-3 lg:col-3 md:col-2 sm:col-6 mt-8">
      <div class="flex align-items-center justify-content-center pb-0 mb-0">
        <img src="/images/icon.svg" alt="Image" height="80" class="mr-1" />
      </div>
      <div class="flex align-items-center justify-content-center mt-0 pt-0 mb-5">
        <div class="text-800 text-3xl font-medium app-font">UFacil</div>
      </div>
      <div class="flex justify-content-center">
        <div class="surface-card p-4 shadow-2 border-round">
          <div class="text-center mb-5">
            <div class="text-700 text-3xl font-medium mb-3">Bienvenido</div>
            <!-- <span class="text-600 font-medium line-height-3">No tienes una cuenta?</span> -->
            <!-- <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Registrate</a> -->
          </div>

          <div>
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText
              v-model="userData.email"
              id="email"
              type="text"
              placeholder="email@domain.com"
              class="w-full mb-3"
            />

            <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
            <InputText
              v-model="userData.password"
              id="password"
              type="password"
              placeholder="********"
              class="w-full mb-3"
            />

            <Button
              label="Acceder"
              :icon="loading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'"
              class="w-full mt-5"
              :disabled="loading"
              @click="submit"
            ></Button>
            <div class="flex justify-content-between mt-3">
              <Button
                size="small"
                label="Usuario"
                icon="pi pi-copy"
                class="w-full mr-2"
                outlined
                @click="assignUser"
              ></Button>
              <Button
                size="small"
                label="Administrador"
                icon="pi pi-copy"
                class="w-full ml-2"
                outlined
                @click="assignAdmin"
              ></Button>
            </div>
            <div class="flex flex-column mt-3">
              <InlineMessage severity="info" class="w-full"
                >Puedes rellenar los datos de ingreso seleccionado uno de los dos perfiles
                disponibles</InlineMessage
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-content-center">
        <small class="text-500 font-medium line-height-3 mt-3"
          >by
          <a
            href="https://gfarias.cl"
            target="_blank"
            class="font-medium no-underline text-blue-500 cursor-pointer"
            >Guillermo Farías</a
          ></small
        >
      </div>
    </div>
  </div>
</template>
