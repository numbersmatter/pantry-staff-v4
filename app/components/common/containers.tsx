

export function StandardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-4">
      {children}
    </div>
  )
}

export function ContainerPadded({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
}