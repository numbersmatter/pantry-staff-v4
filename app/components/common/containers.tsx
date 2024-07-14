import { cn } from "~/lib/utils"


export function StandardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-4">
      {children}
    </div>
  )
}

export function ContainerPadded({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
}