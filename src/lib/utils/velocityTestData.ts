// Sample data generator for Agent Velocity Engineering features
// Run this in the browser console to populate localStorage with test data

export function generateSampleVelocityData() {
  const sampleData = {
    completedPatterns: [
      'prompt-chaining',
      'routing',
      'parallelization',
      'modern-tool-use',
      'structured-output',
      'react-agent',
      'orchestrator-workers',
      'evaluator-optimizer',
      'agentic-rag',
      'hierarchical-agent',
      'self-reflection',
      'human-in-the-loop'
    ],
    implementationTimes: {
      'prompt-chaining': 1.5,
      'routing': 3.0,
      'parallelization': 4.5,
      'modern-tool-use': 2.0,
      'structured-output': 1.0,
      'react-agent': 4.0,
      'orchestrator-workers': 5.5,
      'evaluator-optimizer': 6.0,
      'agentic-rag': 8.0,
      'hierarchical-agent': 10.0,
      'self-reflection': 3.5,
      'human-in-the-loop': 2.5
    },
    assessmentScore: 73, // Proficient level (60-79%)
    practiceExperience: {
      'pattern-fluency': 'proficient',
      'architecture-templates': 'learning',
      'failure-libraries': 'learning',
      'evaluation-automation': 'proficient',
      'operational-instrumentation': 'expert'
    },
    lastUpdated: new Date().toISOString()
  }

  localStorage.setItem('user_velocity_data', JSON.stringify(sampleData))
  console.log('✅ Sample velocity data created!')
  console.log('📊 Dashboard Stats:')
  console.log(`  - Completed Patterns: ${sampleData.completedPatterns.length}/48`)
  console.log(`  - Assessment Score: ${sampleData.assessmentScore}/100 (Proficient)`)
  console.log(`  - Practice Coverage: 5/5 (all practices experienced)`)
  console.log(`  - Velocity Score: ~${Math.round((sampleData.completedPatterns.length / 48) * 40 + (sampleData.assessmentScore / 100) * 30 + 30)}/100`)
  
  return sampleData
}

export function generateBeginnerData() {
  const beginnerData = {
    completedPatterns: [
      'prompt-chaining',
      'structured-output'
    ],
    implementationTimes: {
      'prompt-chaining': 3.0,
      'structured-output': 2.5
    },
    assessmentScore: 35, // Beginning level
    practiceExperience: {
      'pattern-fluency': 'learning',
      'architecture-templates': 'none',
      'failure-libraries': 'none',
      'evaluation-automation': 'none',
      'operational-instrumentation': 'learning'
    },
    lastUpdated: new Date().toISOString()
  }

  localStorage.setItem('user_velocity_data', JSON.stringify(beginnerData))
  console.log('✅ Beginner velocity data created!')
  console.log('📊 Dashboard Stats:')
  console.log(`  - Completed Patterns: ${beginnerData.completedPatterns.length}/48`)
  console.log(`  - Assessment Score: ${beginnerData.assessmentScore}/100 (Beginning)`)
  console.log(`  - Practice Coverage: 2/5`)
  
  return beginnerData
}

export function generateExpertData() {
  const allPatterns = [
    'prompt-chaining', 'routing', 'parallelization', 'orchestrator-workers', 'evaluator-optimizer',
    'react-agent', 'modern-tool-use', 'structured-output', 'agentic-rag', 'hierarchical-agent',
    'self-reflection', 'human-in-the-loop', 'policy-gated', 'budget-constrained', 'deep-agents',
    'swarm-intelligence', 'code-generation', 'multimodal', 'streaming', 'error-recovery',
    'context-management', 'memory-systems', 'tool-calling', 'function-composition', 'state-machines',
    'event-driven', 'async-workflows', 'batch-processing', 'real-time', 'scheduled-agents',
    'multi-tenant', 'collaborative', 'competitive', 'federated', 'edge-deployment',
    'cloud-native', 'containerized', 'serverless', 'microservices', 'monolithic',
    'data-pipelines', 'etl-agents', 'monitoring', 'observability', 'testing',
    'deployment', 'scaling', 'optimization'
  ]

  const expertData = {
    completedPatterns: allPatterns.slice(0, 42), // 42/65 patterns
    implementationTimes: Object.fromEntries(
      allPatterns.slice(0, 42).map(pattern => [pattern, Math.random() * 3 + 0.5])
    ),
    assessmentScore: 95, // Expert level
    practiceExperience: {
      'pattern-fluency': 'expert',
      'architecture-templates': 'expert',
      'failure-libraries': 'proficient',
      'evaluation-automation': 'expert',
      'operational-instrumentation': 'expert'
    },
    lastUpdated: new Date().toISOString()
  }

  localStorage.setItem('user_velocity_data', JSON.stringify(expertData))
  console.log('✅ Expert velocity data created!')
  console.log('📊 Dashboard Stats:')
  console.log(`  - Completed Patterns: ${expertData.completedPatterns.length}/65`)
  console.log(`  - Assessment Score: ${expertData.assessmentScore}/100 (Expert)`)
  console.log(`  - Practice Coverage: 5/5 (all expert/proficient)`)
  
  return expertData
}

export function clearVelocityData() {
  localStorage.removeItem('user_velocity_data')
  console.log('🗑️  Velocity data cleared')
}

export function showCurrentData() {
  const data = localStorage.getItem('user_velocity_data')
  if (data) {
    const parsed = JSON.parse(data)
    console.log('📊 Current Velocity Data:')
    console.log(parsed)
    return parsed
  } else {
    console.log('❌ No velocity data found')
    return null
  }
}

// Auto-run sample data generation if this file is loaded
if (typeof window !== 'undefined') {
  console.log('🚀 Velocity Data Test Helpers Loaded!')
  console.log('Available commands:')
  console.log('  - generateSampleVelocityData() - Create proficient user data')
  console.log('  - generateBeginnerData() - Create beginner user data')
  console.log('  - generateExpertData() - Create expert user data')
  console.log('  - clearVelocityData() - Remove all data')
  console.log('  - showCurrentData() - Display current data')
}

// Export for module usage
export default {
  generateSampleVelocityData,
  generateBeginnerData,
  generateExpertData,
  clearVelocityData,
  showCurrentData
}
