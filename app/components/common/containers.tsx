

export function StandardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-4">
      {children}
    </div>
  )
}