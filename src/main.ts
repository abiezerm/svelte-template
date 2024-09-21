import { mount } from 'svelte';
import "./locale/i18n";

import App from './App.svelte'

const app = mount(App, {target: document.getElementById('app')!});
