<script setup>
import { computed, ref } from 'vue'
import { logout } from '@/services/auth'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUser()
const user = computed(() => userStore.user)
const menuUser = ref(null)
const toggleMenu = (event) => {
  menuUser.value.toggle(event)
}

const exit = () => {
  logout()
  router.push({ name: 'login' })
}
</script>
<template>
  <div class="min-h-screen flex flex-column">
    <div class="bg-blue-600" style="height: 180px">
      <div
        class="py-3 px-5 flex align-items-center justify-content-between relative lg:static"
        style="min-height: 80px"
      >
        <div class="flex align-content-center align-items-center mr-4">
          <img src="/images/icon-withe.svg" alt="Image" height="40" class="mr-0 lg:mr-1" />
          <div class="text-green-50 text-3xl font-medium app-font mb-2">UFacil</div>
        </div>

        <a
          class="cursor-pointer block lg:hidden text-blue-50 p-ripple"
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
            hideOnOutsideClick: true
          }"
        >
          <i class="pi pi-bars text-4xl"></i>
        </a>
        <div
          class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-blue-600 left-0 top-100 z-1"
        >
          <ul
            class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row"
          >
            <li>
              <a
                v-ripple
                class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-blue-100 hover:text-blue-50 hover:bg-blue-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
              >
                <i class="pi pi-home mr-2"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-blue-100 hover:text-blue-50 hover:bg-blue-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
              >
                <i class="pi pi-users mr-2"></i>
                <span>Usuarios</span>
              </a>
            </li>
          </ul>
          <ul
            class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 border-blue-400 lg:border-top-none"
          >
            <li class="border-blue-400 lg:border-top-none">
              <a
                class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center hover:bg-blue-400 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
                @click="toggleMenu"
              >
                <Avatar label="UF" shape="circle" size="medium" class="mr-3" />
                <div class="block">
                  <div class="text-blue-50 font-medium">{{ user.name }}</div>
                  <small class="text-blue-50 text-sm">{{ user.email }}</small>
                  <small class="text-blue-100 font-medium text-sm"> | {{ user.role }}</small>
                </div>
              </a>
              <Menu ref="menuUser" :popup="true" aria-selected="false">
                <template #end>
                  <button
                    @click="exit"
                    class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
                  >
                    <i class="pi pi-sign-out" />
                    <span class="ml-2">Salir</span>
                  </button>
                </template>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-5 flex flex-column flex-auto" style="margin-top: -8rem">
      <div class="border-2 surface-border border-round surface-section flex-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
