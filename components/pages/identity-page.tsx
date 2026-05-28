'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '../animations'
import { Identity, identityInfo } from '@/lib/game-store'

interface IdentityPageProps {
  onSelect: (identity: Identity) => void
}

const identities: { id: Identity; icon: string }[] = [
  { id: 'tusi', icon: '⚔' },
  { id: 'hanren', icon: '🏮' },
  { id: 'shaoshu', icon: '🏔' },
  { id: 'guanyuan', icon: '📜' },
]

export function IdentityPage({ onSelect }: IdentityPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      {/* 流动水墨背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 30% 20%, rgba(180, 145, 80, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(100, 50, 30, 0.06) 0%, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* 民族纹样装饰 */}
        <svg className="absolute top-10 left-6 w-16 h-16 opacity-10" viewBox="0 0 100 100">
          <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" fill="none" strokeWidth="1" className="text-primary" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" fill="none" strokeWidth="1" className="text-primary" />
        </svg>
        <svg className="absolute bottom-20 right-6 w-20 h-20 opacity-10" viewBox="0 0 100 100">
          <path d="M20 20 Q50 10 80 20 Q90 50 80 80 Q50 90 20 80 Q10 50 20 20" stroke="currentColor" fill="none" strokeWidth="1" className="text-primary" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full max-w-sm">
        <FadeIn delay={0.2}>
          <h2 className="text-2xl font-serif text-center mb-2 gold-text">
            请选择你的身份
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-8">
            你将以此身份体验清代边疆生活
          </p>
        </FadeIn>
        
        <StaggerContainer staggerDelay={0.15} className="space-y-4">
          {identities.map((item) => {
            const info = identityInfo[item.id as keyof typeof identityInfo]
            return (
              <StaggerItem key={item.id}>
                <motion.button
                  onClick={() => onSelect(item.id)}
                  className="w-full relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative border border-primary/30 bg-card/80 backdrop-blur-sm p-5 text-left transition-all duration-300 group-hover:border-primary/60">
                    {/* 发光效果 */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(180, 145, 80, 0.1) 0%, transparent 70%)',
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                            {info.name}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            {info.keywords.map((keyword, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-0.5 border border-primary/20 text-primary/70"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                    
                    {/* 边框发光动画 */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      animate={{
                        boxShadow: [
                          'inset 0 0 0px rgba(180, 145, 80, 0)',
                          'inset 0 0 20px rgba(180, 145, 80, 0.2)',
                          'inset 0 0 0px rgba(180, 145, 80, 0)',
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </motion.button>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
        
        <FadeIn delay={1}>
          <p className="text-center text-muted-foreground/50 text-xs mt-8">
            不同身份将开启不同的历史命运
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
