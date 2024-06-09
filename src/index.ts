import { App } from 'vue'
import { ConfirmDialog, DialogBox, FilePicker, SelectedMedia } from './components'
import {
  DialogBoxProps,
  FilePickerProps,
  FileUpload,
  Link,
  Media,
  Medias,
  Meta,
  SelectOption
} from './types/main'
import useFilePicker, { selectTypes } from './hooks/useFilePicker.ts'
import useDialogBox from './hooks/useDialogBox.ts'
import useConfirmDialog from './hooks/useConfirmDialog.ts'

const dialoguePlugin = {
  install: (app: App) => {
    app.component('FilePicker', FilePicker)
    app.component('DialogBox', DialogBox)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('SelectedMedia', SelectedMedia)
  }
}

export {
  ConfirmDialog,
  DialogBox,
  FilePicker,
  SelectedMedia,
  useFilePicker,
  useDialogBox,
  useConfirmDialog,
  selectTypes,
  dialoguePlugin
}
export type { Link, Meta, Media, Medias, SelectOption, FilePickerProps, FileUpload, DialogBoxProps }
