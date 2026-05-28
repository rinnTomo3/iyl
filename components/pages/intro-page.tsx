'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '../animations'

interface IntroPageProps {
  onStart: () => void
}

export function IntroPage({ onStart }: IntroPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      {/* 动态地图背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M50 200 Q100 150 150 180 T250 160 T350 200' stroke='%23b49150' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M30 250 Q80 220 130 240 T230 220 T330 250' stroke='%23b49150' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3Ccircle cx='100' cy='180' r='3' fill='%23b49150' opacity='0.4'/%3E%3Ccircle cx='200' cy='160' r='4' fill='%23c9a45c' opacity='0.5'/%3E%3Ccircle cx='300' cy='190' r='3' fill='%23b49150' opacity='0.4'/%3E%3Ccircle cx='150' cy='220' r='2' fill='%23b49150' opacity='0.3'/%3E%3C/svg%3E")
            `,
            backgroundSize: '100% auto',
            backgroundPosition: 'center',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* 火光效果 */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 150, 50, 0.8) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 120, 30, 0.7) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </div>
      
      {/* 风沙效果 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: '-5%',
            }}
            animate={{
              x: ['0vw', '110vw'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center max-w-sm">
        <FadeIn delay={0.3}>
          <p className="text-primary/80 text-sm tracking-[0.5em] mb-8 font-serif">
            公元1726年
          </p>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <h1 className="text-3xl font-serif text-foreground mb-4 leading-relaxed">
            <span className="gold-text">你生活在</span>
            <br />
            <span className="gold-text text-4xl">清代西南边疆</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.9}>
          <p className="text-muted-foreground text-lg mb-12 font-serif">
            命运，即将开始。
          </p>
        </FadeIn>
        
        <FadeIn delay={1.2}>
          <motion.button
            onClick={onStart}
            className="relative px-12 py-4 border border-primary/50 text-primary bg-background/50 backdrop-blur-sm font-serif text-lg tracking-widest overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">进入历史</span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 border border-primary/30"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(180, 145, 80, 0.2)',
                  '0 0 30px rgba(180, 145, 80, 0.4)',
                  '0 0 10px rgba(180, 145, 80, 0.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        </FadeIn>
        
        <FadeIn delay={1.5}>
          <p className="text-muted-foreground/60 text-xs mt-12 tracking-wider">
            一场关于身份、选择与民族交融的沉浸式互动体验
          </p>
        </FadeIn>
      </div>
      
      {/* 底部装饰线 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
