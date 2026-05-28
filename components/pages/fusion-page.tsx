'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '../animations'

interface FusionPageProps {
  onComplete: () => void
}

export function FusionPage({ onComplete }: FusionPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* 背景动画 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(180, 145, 80, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* 民族纹样融合动画 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-80 h-80" viewBox="0 0 200 200">
          {/* 外圈 - 不同民族纹样 */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          
          {/* 四个方向的纹样 - 代表四个身份 */}
          <motion.path
            d="M100 10 L110 30 L100 50 L90 30 Z"
            fill="currentColor"
            className="text-primary/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: '100px 30px' }}
          />
          <motion.path
            d="M190 100 L170 110 L150 100 L170 90 Z"
            fill="currentColor"
            className="text-secondary/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ transformOrigin: '170px 100px' }}
          />
          <motion.path
            d="M100 190 L90 170 L100 150 L110 170 Z"
            fill="currentColor"
            className="text-primary/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{ transformOrigin: '100px 170px' }}
          />
          <motion.path
            d="M10 100 L30 90 L50 100 L30 110 Z"
            fill="currentColor"
            className="text-secondary/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ transformOrigin: '30px 100px' }}
          />
          
          {/* 连接线 - 逐渐形成 */}
          <motion.path
            d="M100 50 Q120 80 150 100 Q120 120 100 150 Q80 120 50 100 Q80 80 100 50"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.8, duration: 1.5, ease: 'easeInOut' }}
          />
          
          {/* 中心圆 - 共同体 */}
          <motion.circle
            cx="100"
            cy="100"
            r="25"
            fill="currentColor"
            className="text-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3, duration: 1, ease: 'easeOut' }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="15"
            fill="currentColor"
            className="text-primary/40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.3, duration: 1, ease: 'easeOut' }}
          />
        </svg>
      </div>
      
      {/* 地图连接动画 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${30 + Math.floor(i / 4) * 40}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2 + i * 0.2, duration: 0.5 }}
          />
        ))}
        
        {/* 连接线 */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="25%" y1="35%" x2="40%" y2="35%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
          />
          <motion.line
            x1="45%" y1="35%" x2="60%" y2="35%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          />
          <motion.line
            x1="65%" y1="35%" x2="80%" y2="35%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 3.4, duration: 0.5 }}
          />
          <motion.line
            x1="25%" y1="65%" x2="40%" y2="65%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 3.6, duration: 0.5 }}
          />
          <motion.line
            x1="45%" y1="65%" x2="60%" y2="65%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 3.8, duration: 0.5 }}
          />
          <motion.line
            x1="65%" y1="65%" x2="80%" y2="65%"
            stroke="currentColor" strokeWidth="1" className="text-primary/30"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
          />
        </svg>
      </div>
      
      {/* 文字内容 */}
      <div className="relative z-10 text-center max-w-xs mt-48">
        <FadeIn delay={4.5}>
          <p className="text-primary/60 text-xs tracking-[0.3em] mb-4">
            民族交融
          </p>
        </FadeIn>
        
        <FadeIn delay={4.8}>
          <h2 className="text-2xl font-serif gold-text mb-4">
            中华民族共同体
          </h2>
        </FadeIn>
        
        <FadeIn delay={5.1}>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            不同的民族，共同的命运<br />
            在这片土地上交汇、融合、共生
          </p>
        </FadeIn>
        
        <FadeIn delay={5.4}>
          <motion.button
            onClick={onComplete}
            className="px-8 py-3 border border-primary/50 text-primary bg-background/50 backdrop-blur-sm text-sm tracking-widest"
            whileHover={{ scale: 1.02, borderColor: 'rgba(180, 145, 80, 0.8)' }}
            whileTap={{ scale: 0.98 }}
          >
            查看你的命运
          </motion.button>
        </FadeIn>
      </div>
    </div>
  )
}
