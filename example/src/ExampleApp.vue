<template>
  <div class="dark-mode">
    <nav class="navbar">
      <div class="navbar-brand">
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleSidebarMenu">
          <i class="fas fa-bars"></i>
        </button>
        <RouterLink
          to="/"
          class="navbar-item">
          Home
        </RouterLink>
      </div>
      <div :class="['offcanvas', { show: isSidebarMenuVisible }]">
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close"
            @click="toggleSidebarMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <RouterLink
            v-for="(item, index) in routeLists"
            :to="item.path"
            class="navbar-item"
            :class="activeRoute(item.name)"
            :key="index"
            @click="toggleSidebarMenu">
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
      <div class="navbar-menu">
        <RouterLink
          v-for="(item, index) in routeLists"
          :to="item.path"
          class="navbar-item"
          :class="activeRoute(item.name)"
          :key="index">
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'

  const routeLists = [
    { path: '/', label: 'Home', name: 'home' },
    { path: '/file-picker', label: 'File Picker', name: 'file-picker' },
    { path: '/confirm-dialog', label: 'Confirm Dialog', name: 'confirm-dialog' },
    { path: '/dialog-box', label: 'Dialog Box', name: 'dialog-box' },
    { path: '/toast-page', label: 'Toast Page', name: 'toast-page' }
  ] as { path: string; label: string; name: string }[]

  const route = useRoute()
  const activeRoute: (routeName: string) => string = (routeName: string) => {
    return route.name === routeName ? 'active' : ''
  }

  const isSidebarMenuVisible: Ref<boolean> = ref(false)
  const toggleSidebarMenu: () => void = () => {
    isSidebarMenuVisible.value = !isSidebarMenuVisible.value
  }
</script>

<style lang="scss" scoped></style>
