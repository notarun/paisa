import '@splidejs/splide/dist/css/splide.min.css'
import 'spectre.css/dist/spectre-icons.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
import 'spectre.css/dist/spectre.min.css'

import isBetween from 'dayjs/plugin/isBetween'
import { render } from 'preact'
import dayjs from 'dayjs'

import { App } from './components/app'
import './styles/index.css'

dayjs.extend(isBetween)
render(<App />, document.getElementById('app')!)
