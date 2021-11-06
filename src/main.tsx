import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
import 'spectre.css/dist/spectre-icons.min.css'

import { render } from 'preact'

import { App } from './components/app'
import './styles/index.css'

render(<App />, document.getElementById('app')!)
