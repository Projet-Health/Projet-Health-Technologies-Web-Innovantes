import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import {AuthProvider} from "@/contexts/auth.context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <App />
        </AuthProvider>
  <Toaster />
  </React.StrictMode>,
)
