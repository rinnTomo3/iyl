'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '../animations'

interface EndingPageProps {
  onRestart: () => void
}

export function EndingPage({ onRestart }: EndingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      {/* 深黑背景 */}
      <div className="absolute inset-0 bg-background" />
      
      {/* 微妙的金色光晕 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(180, 145, 80, 0.08) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="relative z-10 text-center max-w-xs">
        <FadeIn delay={0.5}>
          <p className="text-foreground/90 text-lg font-serif leading-relaxed mb-4">
            历史上的民族交融，
          </p>
        </FadeIn>
        
        <FadeIn delay={1}>
          <p className="text-foreground/90 text-lg font-serif leading-relaxed mb-4">
            从来不是宏大的口号。
          </p>
        </FadeIn>
        
        <FadeIn delay={1.5}>
          <p className="text-foreground/90 text-lg font-serif leading-relaxed mb-4">
            而是无数普通人的选择。
          </p>
        </FadeIn>
        
        <FadeIn delay={2}>
          <motion.p 
            className="text-2xl font-serif gold-text mt-8 mb-12"
            animate={{
              textShadow: [
                '0 0 10px rgba(180, 145, 80, 0.3)',
                '0 0 20px rgba(180, 145, 80, 0.5)',
                '0 0 10px rgba(180, 145, 80, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            你，也是其中之一。
          </motion.p>
        </FadeIn>
        
        <FadeIn delay={2.5}>
          <motion.button
            onClick={onRestart}
            className="px-10 py-4 border border-primary/50 text-primary bg-transparent font-serif tracking-widest"
            whileHover={{ 
              scale: 1.02,
              borderColor: 'rgba(180, 145, 80, 0.8)',
              backgroundColor: 'rgba(180, 145, 80, 0.1)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            重新进入历史
          </motion.button>
        </FadeIn>
      </div>
      
      {/* 底部装饰 */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-1.5 h-1.5 rotate-45 border border-primary/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </motion.div>
    </div>
  )
}
