# Webform Architecture

## Overview
`app/webform/page.tsx` renders the public Request a Quote experience. It orchestrates the form lifecycle, manages draft persistence, and switches between standard entry and AI assist modes. The page is split between a form panel and the contextual `RightSidebar`, while a multi-step workflow is coordinated through React Hook Form state.

## Core Form Flow
- **React Hook Form (`useForm`)** — binds the step components to the shared `QuoteFormSchema` and exposes helpers (`form.handleSubmit`, `form.watch`, etc.).
- **`quoteFormSchema`/`defaultFormValues`** — zod schema and defaults ensure typed values and drive `resolver` validation.
- **Step components** — each receives the form instance and renders scoped fields:
  - `Page1IntroBasics`: organization info and account toggle (pre-fills client ID visibility).
  - `Page2ServiceAppointment`: service type, languages, scheduling, and conditional VRI options.
  - `Page3Contacts`: location fields, check-in instructions, point of contact, and provider details.
  - `Page4Billing`: billing metadata with existing/new customer branches.
  - `Page5Review`: read-only summary assembled from `form.getValues()`.
- **Navigation state** — `currentPage` controls which step renders, the `StepIndicator`, and which sidebar template (`Page{1-5}SidebarContent`) is shown.
- **Draft persistence (`saveDraft`, `loadDraft`, `clearDraft`, `hasDraft`)** — debounced watcher writes form values + current page, offering resume prompts on mount.
- **Submission (`handleSubmit`)** — clears drafts, emits toast confirmation, and resets the wizard after a short delay.

## AI Assist Mode
- **`AIAssistPanel`** — toggled via `aiAssistMode`. Accepts free-form text, posts to `/api/parse-quote`, and applies returned fields through `form.setValue`. Successful parsing resets the step flow to page 1.
- **CTA buttons** in both columns toggle assist mode (`onAIAssist`) or call `handleSubmit`.

## Sidebar System (`RightSidebar`)
- Receives `currentPage`, `serviceType`, `hasClientId`, `aiAssistMode`, and handlers.
- Chooses one of five contextual components or the AI assist content:
  - `Page1SidebarContent`: value props, hero badges.
  - `Page2SidebarContent`: dynamic tips keyed by service type selection.
  - `Page3SidebarContent`: location prep checklist tailored to accurate directions.
  - `Page4SidebarContent`: billing reminders keyed by `hasClientId` flag.
  - `Page5SidebarContent`: final review checklist before submission.
  - `AIAssistSidebarContent`: guidance for pasting source text safely.
- The sidebar also surfaces call-to-action buttons that mirror the primary form actions.

## Shared UI & Utilities
- **`Form` / ShadCN inputs** — unify styling and validation messaging across steps.
- **`StepIndicator`** — renders numbered progress markers; its props come from the `STEPS` array defined in the page.
- **`Toaster` (sonner)** — surfaces success/error notifications for draft actions, AI parsing, and submission.
- **`AnimatePresence` (framer-motion)** — cross-fades between steps and the AI assist panel.

## External Touchpoints
- **`/api/parse-quote`** — back-end endpoint expected to parse free-form text into structured fields.
- **Icons (`lucide-react`)** — consistent visuals across sidebar cards and inputs.
- **Styling** — Tailwind utility classes provide layout, theming, and responsive behaviour; gradients and accent colors align with the brand palette (#002060 navy, #E67800 accent).

## Deployment Notes
- All interactive components rely solely on client-side state; there is no SSR-specific logic to adjust when moving to a demo server.
- Persisted drafts depend on browser storage; ensure the demo domain shares the same origin policy you expect for draft recovery.
- API requests target relative paths (`/api/parse-quote`), so the hosting environment must proxy Next.js API routes or expose an equivalent endpoint.
