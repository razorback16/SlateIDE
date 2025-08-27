import { cn } from '@/lib/utils'
import { useTheme } from '#/components/theme/provider'

interface SlateLogoProps {
  className?: string
  width?: number
  height?: number
}

const SlateLogo = ({ className, width = 64, height = 64 }: SlateLogoProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  return (
    <img
      src="/images/slate-logo.svg"
      alt="Slate IDE Logo"
      width={width}
      height={height}
      className={cn('transition-all duration-300', isDark ? 'brightness-110 invert' : '', className)}
    />
  )
}

export default SlateLogo
