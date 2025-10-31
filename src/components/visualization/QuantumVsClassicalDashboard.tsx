import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartBar, Lightning, Cpu, Timer, TrendUp } from '@phosphor-icons/react'

interface AlgorithmComparison {
  name: string
  problem: string
  classicalComplexity: string
  quantumComplexity: string
  advantage: 'exponential' | 'quadratic' | 'polynomial' | 'marginal'
  maturity: 'production' | 'experimental' | 'theoretical'
  applications: string[]
}

const COMPARISONS: AlgorithmComparison[] = [
  {
    name: 'Shor\'s Algorithm',
    problem: 'Integer Factorization',
    classicalComplexity: 'O(exp(n^(1/3)))',
    quantumComplexity: 'O(n³)',
    advantage: 'exponential',
    maturity: 'experimental',
    applications: ['Cryptography', 'Security Analysis'],
  },
  {
    name: 'Grover\'s Search',
    problem: 'Unstructured Search',
    classicalComplexity: 'O(N)',
    quantumComplexity: 'O(√N)',
    advantage: 'quadratic',
    maturity: 'experimental',
    applications: ['Database Search', 'Optimization', 'Robot Path Planning'],
  },
  {
    name: 'QAOA',
    problem: 'Combinatorial Optimization',
    classicalComplexity: 'O(2^n)',
    quantumComplexity: 'O(poly(n))*',
    advantage: 'exponential',
    maturity: 'experimental',
    applications: ['Task Scheduling', 'Resource Allocation', 'Fleet Routing'],
  },
  {
    name: 'Quantum Annealing',
    problem: 'QUBO Problems',
    classicalComplexity: 'O(2^n)',
    quantumComplexity: 'O(poly(n))*',
    advantage: 'polynomial',
    maturity: 'production',
    applications: ['Supply Chain', 'Traffic Optimization', 'Robot Coordination'],
  },
  {
    name: 'Quantum ML (QKE)',
    problem: 'Kernel Evaluation',
    classicalComplexity: 'O(N²d)',
    quantumComplexity: 'O(N²)',
    advantage: 'marginal',
    maturity: 'experimental',
    applications: ['Classification', 'Anomaly Detection', 'Sensor Fusion'],
  },
]

const advantageColor = {
  exponential: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
  quadratic: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
  polynomial: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
  marginal: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
}

const maturityColor = {
  production: 'bg-green-500',
  experimental: 'bg-yellow-500',
  theoretical: 'bg-red-500',
}

export default function QuantumVsClassicalDashboard() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmComparison | null>(null)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightning className="w-4 h-4 text-yellow-500" />
              Quantum Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2-3 algos</div>
            <p className="text-xs text-muted-foreground">with proven speedup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              Hardware Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~100-1000 qubits</div>
            <p className="text-xs text-muted-foreground">current NISQ devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendUp className="w-4 h-4 text-green-500" />
              Robotics Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2-5 years</div>
            <p className="text-xs text-muted-foreground">to practical deployment</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="w-5 h-5" />
            Quantum vs. Classical Algorithms
          </CardTitle>
          <CardDescription>
            Side-by-side complexity analysis for robotics-relevant problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Algorithm</th>
                  <th className="text-left p-2">Problem</th>
                  <th className="text-left p-2">Classical</th>
                  <th className="text-left p-2">Quantum</th>
                  <th className="text-left p-2">Advantage</th>
                  <th className="text-left p-2">Maturity</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISONS.map((algo, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer ${
                      selectedAlgo?.name === algo.name ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                    }`}
                    onClick={() => setSelectedAlgo(algo)}
                  >
                    <td className="p-2 font-semibold">{algo.name}</td>
                    <td className="p-2 text-muted-foreground">{algo.problem}</td>
                    <td className="p-2">
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {algo.classicalComplexity}
                      </code>
                    </td>
                    <td className="p-2">
                      <code className="text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                        {algo.quantumComplexity}
                      </code>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline" className={advantageColor[algo.advantage]}>
                        {algo.advantage}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${maturityColor[algo.maturity]}`} />
                        <span className="text-xs capitalize">{algo.maturity}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Algorithm Detail */}
      {selectedAlgo && (
        <Card className="border-2 border-blue-500 dark:border-blue-700">
          <CardHeader>
            <CardTitle>{selectedAlgo.name}</CardTitle>
            <CardDescription>{selectedAlgo.problem}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Classical Complexity
                </h4>
                <code className="text-lg font-mono">{selectedAlgo.classicalComplexity}</code>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Lightning className="w-4 h-4" />
                  Quantum Complexity
                </h4>
                <code className="text-lg font-mono">{selectedAlgo.quantumComplexity}</code>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Robotics Applications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAlgo.applications.map((app, i) => (
                  <Badge key={i} variant="secondary">
                    {app}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-2">Implementation Considerations</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Quantum advantage depends on problem structure and size</li>
                <li>• NISQ-era devices have limited qubit count and coherence time</li>
                <li>• Error mitigation required for reliable results</li>
                <li>• Consider hybrid classical-quantum approaches</li>
                {selectedAlgo.maturity === 'production' && (
                  <li className="text-green-700 dark:text-green-400">
                    ✓ Ready for real-world experimentation (D-Wave annealers)
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>
            • <strong>Exponential speedup</strong> proven for factoring (Shor) but not yet practically useful for
            robotics.
          </p>
          <p>
            • <strong>Quadratic speedup</strong> (Grover) applicable to search and optimization—modest but measurable
            gains.
          </p>
          <p>
            • <strong>QAOA & Annealing</strong> show promise for combinatorial problems (routing, scheduling) at
            ~100-1000 variable scale.
          </p>
          <p>
            • <strong>Quantum ML kernels</strong> are still experimental; classical GPUs often faster for now.
          </p>
          <p>
            • <strong>Production use</strong>: D-Wave annealers for optimization; gate-based systems still in research
            phase.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
