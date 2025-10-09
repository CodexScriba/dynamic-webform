import { Card, CardContent } from "@/components/ui/card"

const Page = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#e0f2ff_0%,#e2e8f0_40%,#cbd5f5_100%)] px-6 py-16">
      <div className="pointer-events-none absolute -top-20 left-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-[-5rem] h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.38),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-4rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(45,212,191,0.25),_transparent_70%)] blur-3xl" />
      <Card className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_65%,#0f2167_65%,#0f2167_100%)] p-0 shadow-2xl">
        <CardContent className="p-0">
          <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[65%_35%]">
            <div className="flex flex-col justify-center gap-6 p-10 text-slate-900">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Primary Panel
                </span>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                  Pure white canvas
                </h1>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Keep the focus on the essentials with a bright, pristine foundation. Perfect for
                high-contrast copy or minimal forms.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-6 p-10 text-blue-50 md:text-right">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-blue-200/70">
                  Accent Panel
                </span>
                <h2 className="mt-3 text-3xl font-semibold">Deep blue spotlight</h2>
              </div>
              <p className="text-sm leading-relaxed text-blue-100/80">
                Anchor supporting context or visuals against a rich, modern hue. Balanced contrast
                keeps everything feeling cohesive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
