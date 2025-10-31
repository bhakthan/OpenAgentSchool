import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/components/theme/ThemeProvider'

interface QubitState {
  theta: number  // Polar angle (0 to π)
  phi: number    // Azimuthal angle (0 to 2π)
}

export default function BlochSphereVisualizer() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [qubitState, setQubitState] = useState<QubitState>({ theta: 0, phi: 0 })
  const [selectedGate, setSelectedGate] = useState<string>('')

  // Gate definitions
  const gates = {
    X: { name: 'X (NOT)', transform: (s: QubitState) => ({ theta: Math.PI - s.theta, phi: s.phi + Math.PI }) },
    Y: { name: 'Y', transform: (s: QubitState) => ({ theta: Math.PI - s.theta, phi: s.phi }) },
    Z: { name: 'Z', transform: (s: QubitState) => ({ theta: s.theta, phi: s.phi + Math.PI }) },
    H: { name: 'H (Hadamard)', transform: (s: QubitState) => ({ theta: Math.PI / 2, phi: 0 }) },
    S: { name: 'S (Phase)', transform: (s: QubitState) => ({ theta: s.theta, phi: s.phi + Math.PI / 2 }) },
    T: { name: 'T', transform: (s: QubitState) => ({ theta: s.theta, phi: s.phi + Math.PI / 4 }) },
  }

  const applyGate = (gateName: keyof typeof gates) => {
    setSelectedGate(gateName)
    const gate = gates[gateName]
    setQubitState(gate.transform(qubitState))
    
    setTimeout(() => setSelectedGate(''), 500)
  }

  const reset = () => {
    setQubitState({ theta: 0, phi: 0 })
    setSelectedGate('')
  }

  // Draw the Bloch sphere
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Color scheme
    const axisColor = isDarkMode ? '#9CA3AF' : '#6B7280'
    const sphereColor = isDarkMode ? '#374151' : '#E5E7EB'
    const stateColor = '#EF4444'
    const textColor = isDarkMode ? '#F9FAFB' : '#111827'

    // Draw sphere outline
    ctx.strokeStyle = sphereColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Draw equator circles
    ctx.strokeStyle = isDarkMode ? '#4B5563' : '#D1D5DB'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    
    // XY plane
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, 2 * Math.PI)
    ctx.stroke()

    // XZ plane
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radius * 0.3, radius, 0, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.setLineDash([])

    // Draw axes
    ctx.strokeStyle = axisColor
    ctx.lineWidth = 2

    // X axis (red)
    ctx.strokeStyle = '#EF4444'
    ctx.beginPath()
    ctx.moveTo(centerX - radius, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.stroke()

    // Y axis (green)
    ctx.strokeStyle = '#10B981'
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius * 0.3)
    ctx.lineTo(centerX, centerY + radius * 0.3)
    ctx.stroke()

    // Z axis (blue)
    ctx.strokeStyle = '#3B82F6'
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius)
    ctx.lineTo(centerX, centerY + radius)
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = textColor
    ctx.font = '14px sans-serif'
    ctx.fillText('|0⟩', centerX - 5, centerY - radius - 10)
    ctx.fillText('|1⟩', centerX - 5, centerY + radius + 20)
    ctx.fillText('|+⟩', centerX + radius + 10, centerY + 5)
    ctx.fillText('|−⟩', centerX - radius - 25, centerY + 5)

    // Calculate state vector position
    const x = radius * Math.sin(qubitState.theta) * Math.cos(qubitState.phi)
    const y = radius * Math.sin(qubitState.theta) * Math.sin(qubitState.phi) * 0.3
    const z = radius * Math.cos(qubitState.theta)

    const stateX = centerX + x
    const stateY = centerY - z

    // Draw state vector
    ctx.strokeStyle = stateColor
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(stateX, stateY)
    ctx.stroke()

    // Draw state point
    ctx.fillStyle = stateColor
    ctx.beginPath()
    ctx.arc(stateX, stateY, 8, 0, 2 * Math.PI)
    ctx.fill()

    // Draw projection on equator (phase)
    ctx.strokeStyle = isDarkMode ? '#9CA3AF' : '#6B7280'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(stateX, stateY)
    ctx.lineTo(centerX + x, centerY)
    ctx.stroke()
    ctx.setLineDash([])

  }, [qubitState, isDarkMode])

  // Get state description
  const getStateDescription = () => {
    const { theta, phi } = qubitState
    
    if (theta < 0.1) return '|0⟩ (North pole)'
    if (theta > Math.PI - 0.1) return '|1⟩ (South pole)'
    if (Math.abs(theta - Math.PI / 2) < 0.1 && Math.abs(phi) < 0.1) return '|+⟩ = (|0⟩ + |1⟩)/√2'
    if (Math.abs(theta - Math.PI / 2) < 0.1 && Math.abs(phi - Math.PI) < 0.1) return '|−⟩ = (|0⟩ − |1⟩)/√2'
    if (Math.abs(theta - Math.PI / 2) < 0.1 && Math.abs(phi - Math.PI / 2) < 0.1) return '|i+⟩ = (|0⟩ + i|1⟩)/√2'
    if (Math.abs(theta - Math.PI / 2) < 0.1 && Math.abs(phi - 3 * Math.PI / 2) < 0.1) return '|i−⟩ = (|0⟩ − i|1⟩)/√2'
    
    const alpha = Math.cos(theta / 2)
    const beta = Math.sin(theta / 2)
    return `${alpha.toFixed(2)}|0⟩ + ${beta.toFixed(2)}e^(i·${phi.toFixed(2)})|1⟩`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {(Object.keys(gates) as Array<keyof typeof gates>).map((gateName) => (
          <Button
            key={gateName}
            variant={selectedGate === gateName ? "default" : "outline"}
            size="sm"
            onClick={() => applyGate(gateName)}
            className="font-mono"
          >
            {gateName}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className="font-mono text-xs">
            {getStateDescription()}
          </Badge>
          <span className="text-xs text-muted-foreground">
            θ = {qubitState.theta.toFixed(2)}, φ = {qubitState.phi.toFixed(2)}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset to |0⟩
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>How to use:</strong> Click gate buttons to apply quantum operations to the qubit state.</p>
        <p><strong>Visual guide:</strong> Red vector shows current state, axes show basis states (|0⟩, |1⟩, |+⟩, |−⟩).</p>
      </div>
    </div>
  )
}
