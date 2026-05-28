'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ParticleBackground } from '@/components/particle-background'
import { IntroPage } from '@/components/pages/intro-page'
import { IdentityPage } from '@/components/pages/identity-page'
import { StoryPage, StoryChoice, storyScenes } from '@/components/pages/story-page'
import { FusionPage } from '@/components/pages/fusion-page'
import { ResultPage } from '@/components/pages/result-page'
import { EndingPage } from '@/components/pages/ending-page'
import { useGameStore, Identity, ResultType } from '@/lib/game-store'

type PageType = 'intro' | 'identity' | 'story' | 'fusion' | 'result' | 'ending'

export function GameContainer() {
  const [currentPage, setCurrentPage] = useState<PageType>('intro')
  const [storyIndex, setStoryIndex] = useState(0)
  
  const { 
    identity, 
    setIdentity, 
    stats,
    updateStats, 
    reset,
    getResult,
  } = useGameStore()

  const handleStart = useCallback(() => {
    setCurrentPage('identity')
  }, [])

  const handleIdentitySelect = useCallback((selectedIdentity: Identity) => {
    setIdentity(selectedIdentity)
    setStoryIndex(0)
    setCurrentPage('story')
  }, [setIdentity])

  const handleStoryChoice = useCallback((choice: StoryChoice) => {
    // 更新统计数据
    const newStats = { ...stats }
    if (choice.stats.cultural) newStats.cultural += choice.stats.cultural
    if (choice.stats.pioneer) newStats.pioneer += choice.stats.pioneer
    if (choice.stats.tradition) newStats.tradition += choice.stats.tradition
    if (choice.stats.unity) newStats.unity += choice.stats.unity
    updateStats(newStats)

    // 检查是否还有更多场景
    const scenes = identity ? storyScenes[identity] : []
    if (storyIndex < scenes.length - 1) {
      setStoryIndex(storyIndex + 1)
    } else {
      setCurrentPage('fusion')
    }
  }, [identity, storyIndex, stats, updateStats])

  const handleFusionComplete = useCallback(() => {
    setCurrentPage('result')
  }, [])

  const handleShare = useCallback(() => {
    // 这里可以实现分享功能
    alert('分享功能开发中，敬请期待！')
  }, [])

  const handleRestart = useCallback(() => {
    reset()
    setStoryIndex(0)
    setCurrentPage('intro')
  }, [reset])

  const handleToEnding = useCallback(() => {
    setCurrentPage('ending')
  }, [])

  const result: ResultType = getResult()

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {currentPage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IntroPage onStart={handleStart} />
          </motion.div>
        )}
        
        {currentPage === 'identity' && (
          <motion.div
            key="identity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IdentityPage onSelect={handleIdentitySelect} />
          </motion.div>
        )}
        
        {currentPage === 'story' && (
          <motion.div
            key={`story-${storyIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <StoryPage 
              identity={identity} 
              sceneIndex={storyIndex}
              onChoice={handleStoryChoice}
            />
          </motion.div>
        )}
        
        {currentPage === 'fusion' && (
          <motion.div
            key="fusion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FusionPage onComplete={handleFusionComplete} />
          </motion.div>
        )}
        
        {currentPage === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultPage 
              result={result}
              identity={identity}
              onShare={handleShare}
              onRestart={handleToEnding}
            />
          </motion.div>
        )}
        
        {currentPage === 'ending' && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EndingPage onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
