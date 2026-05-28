import { create } from 'zustand'

export type Identity = 'tusi' | 'hanren' | 'shaoshu' | 'guanyuan' | null

export interface Choice {
  page: number
  choice: string
  identity: Identity
}

export interface GameState {
  currentPage: number
  identity: Identity
  choices: Choice[]
  stats: {
    cultural: number  // 文化融合度
    pioneer: number   // 开拓精神
    tradition: number // 传统守护
    unity: number     // 共同体意识
  }
  setPage: (page: number) => void
  setIdentity: (identity: Identity) => void
  addChoice: (choice: Choice) => void
  updateStats: (stats: Partial<GameState['stats']>) => void
  reset: () => void
  getResult: () => ResultType
}

export type ResultType = 'cultural' | 'pioneer' | 'guardian' | 'connector'

const initialStats = {
  cultural: 0,
  pioneer: 0,
  tradition: 0,
  unity: 0,
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPage: 0,
  identity: null,
  choices: [],
  stats: initialStats,
  
  setPage: (page) => set({ currentPage: page }),
  
  setIdentity: (identity) => set({ identity }),
  
  addChoice: (choice) => set((state) => ({
    choices: [...state.choices, choice],
  })),
  
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats },
  })),
  
  reset: () => set({
    currentPage: 0,
    identity: null,
    choices: [],
    stats: initialStats,
  }),
  
  getResult: () => {
    const { stats } = get()
    const max = Math.max(stats.cultural, stats.pioneer, stats.tradition, stats.unity)
    
    if (max === stats.cultural) return 'cultural'
    if (max === stats.pioneer) return 'pioneer'
    if (max === stats.tradition) return 'guardian'
    return 'connector'
  },
}))

export const identityInfo = {
  tusi: {
    name: '土司家族后代',
    keywords: ['权力', '传统', '变革'],
    description: '你出生于世袭土司家族，掌握着一方土地的治理大权。',
  },
  hanren: {
    name: '汉人移民',
    keywords: ['迁徙', '经商', '生存'],
    description: '你从中原远道而来，带着对新生活的期望踏上边疆。',
  },
  shaoshu: {
    name: '少数民族青年',
    keywords: ['文化', '身份', '归属'],
    description: '你生长于边疆山寨，在传统与变革之间寻找自己的位置。',
  },
  guanyuan: {
    name: '朝廷驻防官员',
    keywords: ['治理', '秩序', '冲突'],
    description: '你受朝廷委派，前往边疆推行改土归流政策。',
  },
}

export const resultInfo = {
  cultural: {
    title: '文化融合者',
    description: '你在不同文化之间搭建桥梁，促进了民族间的相互理解与尊重。你的包容与智慧让边疆成为文化交汇的热土。',
    trait: '包容·智慧·和谐',
  },
  pioneer: {
    title: '边疆开拓者',
    description: '你以勇气和毅力在边疆开辟新天地，无论是商贸还是农耕，你都为这片土地带来了生机与繁荣。',
    trait: '勇气·毅力·开拓',
  },
  guardian: {
    title: '传统守护者',
    description: '你守护着祖先的文化与传统，在变革的浪潮中保留了民族的根脉，让后人得以追溯历史的记忆。',
    trait: '坚守·传承·敬畏',
  },
  connector: {
    title: '共同体连接者',
    description: '你致力于将不同的族群团结在一起，通过对话与合作，你让中华民族共同体的意识在边疆生根发芽。',
    trait: '团结·协作·远见',
  },
}
