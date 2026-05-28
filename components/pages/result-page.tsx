'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '../animations'
import { ResultType, resultInfo, identityInfo, Identity } from '@/lib/game-store'

interface ResultPageProps {
  result: ResultType
  identity: Identity
  onShare: () => void
  onRestart: () => void
}

export function ResultPage({ result, identity, onShare, onRestart }: ResultPageProps) {
  const resultData = resultInfo[result]
  const identityData = identity ? identityInfo[identity] : null

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 20%, rgba(180, 145, 80, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 80%, rgba(100, 50, 30, 0.1) 0%, transparent 40%)
            `,
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="relative z-10 w-full max-w-sm">
        <FadeIn delay={0.2}>
          <p className="text-center text-primary/60 text-xs tracking-[0.5em] mb-6">
            你的边疆人生
          </p>
        </FadeIn>
        
        {/* 结果卡片 - 可分享海报 */}
        <FadeIn delay={0.4}>
          <motion.div
            className="relative border border-primary/40 bg-card/90 backdrop-blur-sm overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 卡片顶部装饰 */}
            <div className="h-2 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
            
            <div className="p-6">
              {/* 身份标签 */}
              {identityData && (
                <div className="text-center mb-4">
                  <span className="text-xs text-muted-foreground">
                    身份：{identityData.name}
                  </span>
                </div>
              )}
              
              {/* 结果标题 */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-block"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(180, 145, 80, 0.2)',
                      '0 0 40px rgba(180, 145, 80, 0.4)',
                      '0 0 20px rgba(180, 145, 80, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <h2 className="text-3xl font-serif gold-text px-4 py-2">
                    {resultData.title}
                  </h2>
                </motion.div>
              </div>
              
              {/* 特质标签 */}
              <div className="flex justify-center gap-2 mb-6">
                {resultData.trait.split('·').map((trait, idx) => (
                  <motion.span
                    key={idx}
                    className="px-3 py-1 border border-primary/30 text-primary/80 text-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
              
              {/* 描述 */}
              <p className="text-sm text-foreground/80 leading-relaxed text-center mb-6">
                {resultData.description}
              </p>
              
              {/* 装饰分隔线 */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
                <div className="w-2 h-2 rotate-45 border border-primary/30" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
              </div>
              
              {/* 底部信息 */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground/60">
                  《如果你生活在清代边疆》
                </p>
                <p className="text-xs text-muted-foreground/40 mt-1">
                  一场关于身份、选择与民族交融的沉浸式体验
                </p>
              </div>
            </div>
            
            {/* 卡片底部装饰 */}
            <div className="h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
          </motion.div>
        </FadeIn>
        
        {/* 操作按钮 */}
        <FadeIn delay={1}>
          <div className="flex flex-col gap-3 mt-8">
            <motion.button
              onClick={onShare}
              className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              生成分享海报
            </motion.button>
            
            <motion.button
              onClick={onRestart}
              className="w-full py-3 border border-primary/30 text-primary/80 text-sm tracking-wider"
              whileHover={{ scale: 1.01, borderColor: 'rgba(180, 145, 80, 0.6)' }}
              whileTap={{ scale: 0.99 }}
            >
              重新体验
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
