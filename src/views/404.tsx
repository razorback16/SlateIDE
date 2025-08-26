import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Decorative gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="-inset-[10px] absolute opacity-50">
          <div className="absolute top-0 h-[40rem] w-full bg-gradient-to-b from-blue-900/30 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        {/* 404 Content */}
        <div className="text-center">
          <p className="font-bold text-2xl text-blue-400">404</p>
          <h1 className="mt-4 font-bold text-3xl text-white tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base text-gray-300 leading-7">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Button
              onClick={handleBack}
              className="min-w-[160px]"
            >
              Go back
            </Button>
            <Button
              variant="outline"
              asChild
              className="min-w-[160px]"
            >
              <a href="#">View Documentation</a>
            </Button>
          </div>
        </div>

        {/* Decorative 404 background */}
        <div className="pointer-events-none absolute select-none">
          <h2 className="font-bold text-[24rem] text-blue-900/20">404</h2>
        </div>
      </div>
    </div>
  )
}
