import { mount } from 'svelte'
import './styles/globals.scss'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) {
    throw new Error(
        'Failed to find #app element. Make sure your HTML includes <div id="app"></div>'
    )
}

const app = mount(App, { target })

export default app
