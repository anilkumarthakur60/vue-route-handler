import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

Route.view({ path: '/', view: HomePage }).name('home')
Route.view({ path: 'file-picker', view: FilePickerPage }).name('file-picker')
Route.view({ path: 'confirm-dialog', view: ConfirmDialogPage }).name('confirm-dialog')
Route.view({ path: 'dialog-box', view: DialogBoxPage }).name('dialog-box')
Route.view({ path: 'notify-page', view: NotifyPage }).name('notify-page')

const router = createRouter({
  routes: Factory.routes(),
  history: createWebHistory()
})

export default router
