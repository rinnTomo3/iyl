'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '../animations'
import { Identity } from '@/lib/game-store'

export interface StoryChoice {
  id: string
  text: string
  stats: {
    cultural?: number
    pioneer?: number
    tradition?: number
    unity?: number
  }
}

export interface StorySceneProps {
  identity: Identity
  sceneIndex: number
  onChoice: (choice: StoryChoice) => void
}

interface SceneData {
  title: string
  description: string
  choices: StoryChoice[]
  background: string
}

const storyScenes: Record<string, SceneData[]> = {
  tusi: [
    {
      title: '改土归流',
      description: '雍正帝推行改土归流政策，朝廷派来的官员已到达你家族的领地。世袭数代的土司权力面临前所未有的挑战。祖辈留下的土地、子民、还有那份荣耀，都悬于一线。',
      background: '宫殿与山寨',
      choices: [
        { id: 'accept', text: '接受改革，配合朝廷完成权力交接', stats: { unity: 2, cultural: 1 } },
        { id: 'negotiate', text: '与朝廷官员谈判，争取保留部分权益', stats: { tradition: 1, pioneer: 1 } },
        { id: 'resist', text: '联合其他土司，共同抵制改革', stats: { tradition: 2 } },
      ],
    },
    {
      title: '族人的期望',
      description: '改革的消息传遍山寨，族人们聚集在你的府邸前。老人们担忧祖先的祭祀，年轻人渴望外面的世界。他们都在等待你的决定。',
      background: '山寨集会',
      choices: [
        { id: 'tradition', text: '承诺保护传统习俗和祭祀活动', stats: { tradition: 2, cultural: 1 } },
        { id: 'future', text: '鼓励年轻人学习汉文，开拓视野', stats: { cultural: 2, pioneer: 1 } },
        { id: 'unity', text: '召集族人商议，共同制定发展计划', stats: { unity: 2 } },
      ],
    },
    {
      title: '商贸通道',
      description: '改革后，边疆的商路逐渐畅通。来自中原的商队带来了丝绸、茶叶，也带来了新的贸易机会。你可以利用家族的人脉开辟新的商道。',
      background: '驿道商队',
      choices: [
        { id: 'trade', text: '与汉商合作，建立边疆贸易站', stats: { pioneer: 2, cultural: 1 } },
        { id: 'local', text: '保护本地手工艺品，发展特色产业', stats: { tradition: 1, pioneer: 1, cultural: 1 } },
        { id: 'connect', text: '搭建各族商人交流平台', stats: { unity: 2, cultural: 1 } },
      ],
    },
    {
      title: '联姻抉择',
      description: '朝廷官员提议，若你的子女与驻防官员之家联姻，可以获得更多支持。这在边疆并非罕见，但族中长老对此有不同看法。',
      background: '议事厅',
      choices: [
        { id: 'marry', text: '同意联姻，促进民族融合', stats: { cultural: 2, unity: 1 } },
        { id: 'internal', text: '坚持族内婚姻传统', stats: { tradition: 2 } },
        { id: 'freedom', text: '让子女自己选择', stats: { pioneer: 1, cultural: 1, unity: 1 } },
      ],
    },
    {
      title: '节庆共融',
      description: '火把节将至，往年只有本族人参与的盛大庆典，如今有汉商和官员希望参加。族人们对此看法不一。',
      background: '火把节',
      choices: [
        { id: 'open', text: '开放节庆，邀请各族共同欢庆', stats: { cultural: 2, unity: 2 } },
        { id: 'separate', text: '保持传统，仅限本族参与', stats: { tradition: 2 } },
        { id: 'mixed', text: '设立交流区，分区域庆祝', stats: { cultural: 1, tradition: 1, unity: 1 } },
      ],
    },
  ],
  hanren: [
    {
      title: '初到边疆',
      description: '离开故土，你带着全部积蓄来到这片陌生的边疆。山高路远，语言不通，但这里有无限的机遇。站在山口，你需要决定落脚之处。',
      background: '边疆山口',
      choices: [
        { id: 'city', text: '前往府城，寻找商机', stats: { pioneer: 2, cultural: 1 } },
        { id: 'village', text: '在少数民族村寨附近定居', stats: { cultural: 2, unity: 1 } },
        { id: 'road', text: '沿驿道开设客栈', stats: { pioneer: 1, unity: 1, cultural: 1 } },
      ],
    },
    {
      title: '语言障碍',
      description: '在市集上，你想买些当地的药材，但语言不通让交易困难重重。一位会说汉语的当地青年主动前来帮忙。',
      background: '边疆市集',
      choices: [
        { id: 'learn', text: '请他教你当地语言', stats: { cultural: 2, unity: 1 } },
        { id: 'hire', text: '雇他做长期翻译', stats: { pioneer: 1, cultural: 1 } },
        { id: 'friend', text: '与他结交为友，互相学习', stats: { unity: 2, cultural: 1 } },
      ],
    },
    {
      title: '文化冲突',
      description: '你的邻居是一户本地人家，他们的某些习俗与你截然不同。一次误会导致了小摩擦，需要妥善解决。',
      background: '村落房舍',
      choices: [
        { id: 'adapt', text: '主动了解并尊重当地习俗', stats: { cultural: 2, unity: 1 } },
        { id: 'invite', text: '邀请他们体验中原文化', stats: { cultural: 1, unity: 2 } },
        { id: 'mediate', text: '请村中长者调解', stats: { tradition: 1, unity: 2 } },
      ],
    },
    {
      title: '危机时刻',
      description: '山洪爆发，道路中断。你储存的粮食足够自家度过难关，但邻近的村寨也面临断粮的困境。',
      background: '灾后山村',
      choices: [
        { id: 'share', text: '分享粮食，共渡难关', stats: { unity: 2, cultural: 1 } },
        { id: 'trade', text: '以粮食换取当地珍贵药材', stats: { pioneer: 2 } },
        { id: 'organize', text: '组织各村互助，共同应对', stats: { unity: 2, pioneer: 1 } },
      ],
    },
    {
      title: '扎根边疆',
      description: '多年过去，你在边疆已有了一番事业。一封家书从故乡寄来，询问你是否打算返回。',
      background: '夕阳山寨',
      choices: [
        { id: 'stay', text: '决定永久定居，这里已是故乡', stats: { cultural: 2, unity: 1 } },
        { id: 'bridge', text: '往返两地，搭建商贸桥梁', stats: { pioneer: 2, unity: 1 } },
        { id: 'family', text: '接家人来边疆团聚', stats: { unity: 1, cultural: 1, pioneer: 1 } },
      ],
    },
  ],
  shaoshu: [
    {
      title: '新世界的大门',
      description: '朝廷在边疆设立了学堂，教授汉文和儒学。村中长老认为这会动摇传统，但你对外面的世界充满好奇。',
      background: '学堂门前',
      choices: [
        { id: 'study', text: '报名学堂，学习汉文', stats: { cultural: 2, pioneer: 1 } },
        { id: 'elder', text: '留在村中，跟随长老学习传统', stats: { tradition: 2 } },
        { id: 'both', text: '白天学汉文，晚间习传统', stats: { cultural: 1, tradition: 1, pioneer: 1 } },
      ],
    },
    {
      title: '身份认同',
      description: '在学堂里，有同学嘲笑你的口音和服饰。你感到困惑：是否要改变自己来融入他们？',
      background: '学堂内',
      choices: [
        { id: 'proud', text: '坚持穿民族服饰，自豪地介绍自己的文化', stats: { tradition: 2, cultural: 1 } },
        { id: 'adapt', text: '换上汉式服装，减少差异', stats: { cultural: 1, pioneer: 1 } },
        { id: 'share', text: '邀请同学参加民族节日，增进理解', stats: { unity: 2, cultural: 1 } },
      ],
    },
    {
      title: '古老技艺',
      description: '村中的织锦老人年事已高，她精通的民族织锦技艺面临失传。她希望你能继承，但你也有其他志向。',
      background: '织锦坊',
      choices: [
        { id: 'learn', text: '拜师学艺，传承织锦技艺', stats: { tradition: 2 } },
        { id: 'innovate', text: '学习技艺并与外地商人合作销售', stats: { tradition: 1, pioneer: 2 } },
        { id: 'record', text: '用新学的文字记录织锦技法', stats: { tradition: 1, cultural: 1, pioneer: 1 } },
      ],
    },
    {
      title: '婚姻大事',
      description: '你到了谈婚论嫁的年纪。父母希望你按传统与本族人成婚，但你在学堂结识了一位汉族青年，彼此心生好感。',
      background: '山间小路',
      choices: [
        { id: 'tradition', text: '遵从父母之命，与本族人成婚', stats: { tradition: 2 } },
        { id: 'love', text: '说服父母，与心仪之人在一起', stats: { cultural: 2, pioneer: 1 } },
        { id: 'time', text: '请求给予时间，让双方家庭相互了解', stats: { unity: 2, cultural: 1 } },
      ],
    },
    {
      title: '归属何方',
      description: '学成之后，府城官员邀请你担任通译。这是难得的机会，但意味着离开生长的村寨。',
      background: '府城衙门',
      choices: [
        { id: 'official', text: '接受职位，为两族沟通搭桥', stats: { unity: 2, cultural: 1 } },
        { id: 'village', text: '返回村寨，用所学造福乡亲', stats: { tradition: 1, unity: 1, pioneer: 1 } },
        { id: 'teacher', text: '在家乡开设学堂，教授两种文化', stats: { cultural: 2, unity: 1 } },
      ],
    },
  ],
  guanyuan: [
    {
      title: '初任边疆',
      description: '奉朝廷之命，你来到西南边疆推行改土归流。这里山高林密，民族众多，情况比想象中复杂得多。',
      background: '边疆府衙',
      choices: [
        { id: 'strict', text: '严格执行朝廷政令，快速推进改革', stats: { pioneer: 2 } },
        { id: 'moderate', text: '循序渐进，先了解当地情况', stats: { unity: 1, cultural: 1, pioneer: 1 } },
        { id: 'consult', text: '召集土司和长老商议，共同制定方案', stats: { unity: 2, cultural: 1 } },
      ],
    },
    {
      title: '土司抵制',
      description: '一位实力强大的土司公开抵制改革，周边土司都在观望你的反应。处理不当可能引发动乱。',
      background: '对峙场景',
      choices: [
        { id: 'force', text: '调动驻军，武力震慑', stats: { pioneer: 1 } },
        { id: 'negotiate', text: '亲自前往谈判，晓以利害', stats: { unity: 2, cultural: 1 } },
        { id: 'isolate', text: '联合其他土司，孤立反对者', stats: { pioneer: 1, unity: 1 } },
      ],
    },
    {
      title: '文化政策',
      description: '朝廷要求推广汉学，但当地的传统习俗和语言是民众的精神寄托。强制推行可能激化矛盾。',
      background: '学堂场景',
      choices: [
        { id: 'force', text: '全面推行汉学，禁止地方习俗', stats: { pioneer: 1 } },
        { id: 'coexist', text: '允许双语教育，保留部分习俗', stats: { cultural: 2, unity: 1 } },
        { id: 'integrate', text: '将地方文化纳入教育内容', stats: { cultural: 2, tradition: 1, unity: 1 } },
      ],
    },
    {
      title: '民间疾苦',
      description: '改革带来变化，也带来阵痛。一些失去土地的农民生活困难，向衙门请愿。',
      background: '衙门前',
      choices: [
        { id: 'relief', text: '开仓赈济，安抚民心', stats: { unity: 2 } },
        { id: 'work', text: '组织以工代赈，修建道路', stats: { pioneer: 2, unity: 1 } },
        { id: 'land', text: '重新分配土地，确保耕者有其田', stats: { unity: 1, pioneer: 1, cultural: 1 } },
      ],
    },
    {
      title: '历史评价',
      description: '任期将满，朝廷询问改革成效。你需要为这段历史写下总结，也为后任留下方向。',
      background: '书房夜景',
      choices: [
        { id: 'unity', text: '强调民族团结，建议尊重各族文化', stats: { unity: 2, cultural: 1 } },
        { id: 'progress', text: '突出发展成就，建议加快开发', stats: { pioneer: 2 } },
        { id: 'balance', text: '提出传统与变革并重的治理之道', stats: { tradition: 1, cultural: 1, unity: 1 } },
      ],
    },
  ],
}

export function StoryPage({ identity, sceneIndex, onChoice }: StorySceneProps) {
  if (!identity) return null
  
  const scenes = storyScenes[identity] || []
  const scene = scenes[sceneIndex]
  
  if (!scene) return null

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 relative">
      {/* 场景背景 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%),
              radial-gradient(ellipse at 50% 30%, rgba(180, 145, 80, 0.1) 0%, transparent 60%)
            `,
          }}
        />
        
        {/* 动态山脉剪影 */}
        <svg className="absolute bottom-0 left-0 right-0 h-32 opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
          <motion.path
            d="M0 100 L0 60 Q50 40 100 50 T200 40 T300 55 T400 45 L400 100 Z"
            fill="currentColor"
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* 进度指示 */}
        <FadeIn>
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-8 h-1 rounded-full ${i <= sceneIndex ? 'bg-primary' : 'bg-muted'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* 场景标题 */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-6">
            <span className="text-xs text-primary/60 tracking-[0.3em] uppercase">
              第{sceneIndex + 1}章
            </span>
            <h2 className="text-2xl font-serif gold-text mt-2">
              {scene.title}
            </h2>
          </div>
        </FadeIn>
        
        {/* 场景描述 */}
        <FadeIn delay={0.4}>
          <div className="relative mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <p className="text-foreground/90 leading-relaxed pl-4 text-sm">
              {scene.description}
            </p>
          </div>
        </FadeIn>
        
        {/* 选项 */}
        <div className="flex-1 flex flex-col justify-end">
          <StaggerContainer staggerDelay={0.15} className="space-y-3">
            {scene.choices.map((choice, idx) => (
              <StaggerItem key={choice.id}>
                <motion.button
                  onClick={() => onChoice(choice)}
                  className="w-full relative overflow-hidden group text-left"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="relative border border-primary/20 bg-card/60 backdrop-blur-sm p-4 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/80">
                    <div className="flex items-start gap-3">
                      <span className="text-primary/60 text-sm font-mono">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <p className="text-sm text-foreground/90 leading-relaxed flex-1">
                        {choice.text}
                      </p>
                    </div>
                    
                    {/* 悬停发光 */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'linear-gradient(90deg, rgba(180, 145, 80, 0.05) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        {/* 装饰元素 */}
        <motion.div
          className="absolute top-1/2 right-4 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

export { storyScenes }
