export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="px-4 py-6 lg:px-6">
        <div className="flex items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} evident.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
