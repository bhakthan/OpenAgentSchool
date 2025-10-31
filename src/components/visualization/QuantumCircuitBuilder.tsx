import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash, Play, ArrowClockwise } from '@phosphor-icons/react'

interface Gate {
  id: string
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'RX' | 'RY' | 'RZ'
  qubit: number
  controlQubit?: number // for CNOT
  parameter?: number // for rotation gates
}

const AVAILABLE_GATES = [
  { type: 'H' as const, name: 'Hadamard', description: 'Creates superposition', color: 'bg-blue-500' },
  { type: 'X' as const, name: 'Pauli-X', description: 'Bit flip (NOT gate)', color: 'bg-green-500' },
  { type: 'Y' as const, name: 'Pauli-Y', description: 'Y-axis rotation', color: 'bg-yellow-500' },
  { type: 'Z' as const, name: 'Pauli-Z', description: 'Phase flip', color: 'bg-purple-500' },
  { type: 'CNOT' as const, name: 'CNOT', description: 'Controlled-NOT', color: 'bg-red-500' },
  { type: 'RX' as const, name: 'RX(θ)', description: 'X-rotation by angle', color: 'bg-cyan-500' },
]

export default function QuantumCircuitBuilder() {
  const [numQubits, setNumQubits] = useState(2)
  const [circuit, setCircuit] = useState<Gate[]>([])
  const [selectedGate, setSelectedGate] = useState<typeof AVAILABLE_GATES[0] | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const addGate = (qubitIndex: number) => {
    if (!selectedGate) return

    const newGate: Gate = {
      id: `${selectedGate.type}-${Date.now()}`,
      type: selectedGate.type,
      qubit: qubitIndex,
      parameter: selectedGate.type.startsWith('R') ? Math.PI / 4 : undefined,
      controlQubit: selectedGate.type === 'CNOT' && qubitIndex > 0 ? qubitIndex - 1 : undefined,
    }

    setCircuit([...circuit, newGate])
  }

  const removeGate = (gateId: string) => {
    setCircuit(circuit.filter(g => g.id !== gateId))
  }

  const clearCircuit = () => {
    setCircuit([])
    setIsRunning(false)
  }

  const runCircuit = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 2000)
  }

  const getGatesByQubit = (qubitIndex: number) => {
    return circuit.filter(g => g.qubit === qubitIndex || g.controlQubit === qubitIndex)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quantum Circuit Builder</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearCircuit}>
              <Trash className="w-4 h-4 mr-1" />
              Clear
            </Button>
            <Button variant="default" size="sm" onClick={runCircuit} disabled={circuit.length === 0}>
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gate Palette */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Available Gates</h4>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_GATES.map(gate => (
              <Button
                key={gate.type}
                variant={selectedGate?.type === gate.type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGate(gate)}
                className="text-xs"
              >
                {gate.name}
              </Button>
            ))}
          </div>
          {selectedGate && (
            <p className="text-xs text-muted-foreground mt-2">
              Selected: <strong>{selectedGate.name}</strong> — {selectedGate.description}
            </p>
          )}
        </div>

        {/* Circuit Canvas */}
        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 min-h-[200px]">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold">Circuit ({numQubits} qubits)</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNumQubits(Math.max(1, numQubits - 1))}
                disabled={numQubits <= 1}
              >
                -
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNumQubits(Math.min(4, numQubits + 1))}
                disabled={numQubits >= 4}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: numQubits }).map((_, qubitIndex) => (
              <div key={qubitIndex} className="flex items-center gap-2">
                <Badge variant="outline" className="w-16 text-xs">
                  q{qubitIndex}
                </Badge>
                <div className="flex-1 border-t-2 border-slate-300 dark:border-slate-600 relative h-8">
                  <div className="flex gap-2 absolute left-0 top-1/2 -translate-y-1/2">
                    {getGatesByQubit(qubitIndex).map(gate => (
                      <div
                        key={gate.id}
                        className={`
                          px-3 py-1 rounded text-white text-xs font-bold cursor-pointer
                          ${AVAILABLE_GATES.find(g => g.type === gate.type)?.color || 'bg-gray-500'}
                          ${isRunning ? 'animate-pulse' : ''}
                        `}
                        onClick={() => removeGate(gate.id)}
                        title="Click to remove"
                      >
                        {gate.type}
                        {gate.parameter !== undefined && `(${(gate.parameter / Math.PI).toFixed(2)}π)`}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addGate(qubitIndex)}
                  disabled={!selectedGate}
                  className="text-xs"
                >
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Circuit Summary */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Circuit Stats</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Total Gates:</span> <strong>{circuit.length}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Depth:</span> <strong>{Math.ceil(circuit.length / numQubits)}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Qubits:</span> <strong>{numQubits}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>{' '}
              <Badge variant={isRunning ? 'default' : 'outline'} className="text-xs">
                {isRunning ? 'Running...' : 'Ready'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Qiskit Export */}
        {circuit.length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Qiskit Code</h4>
              <Button variant="ghost" size="sm" className="text-xs">
                Copy
              </Button>
            </div>
            <pre className="text-xs overflow-x-auto">
              <code>
{`from qiskit import QuantumCircuit

qc = QuantumCircuit(${numQubits})
${circuit.map(gate => {
  if (gate.type === 'CNOT' && gate.controlQubit !== undefined) {
    return `qc.cx(${gate.controlQubit}, ${gate.qubit})`
  } else if (gate.type.startsWith('R') && gate.parameter !== undefined) {
    return `qc.${gate.type.toLowerCase()}(${gate.parameter.toFixed(4)}, ${gate.qubit})`
  } else {
    return `qc.${gate.type.toLowerCase()}(${gate.qubit})`
  }
}).join('\n')}

# Measure all qubits
qc.measure_all()
print(qc.draw())`}
              </code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
