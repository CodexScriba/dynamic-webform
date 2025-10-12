# Dynamic Multi-Step Quote Request Form — Implementation Todo

## Context

### Relevant Patterns
- **Design System**: Follow the existing design in `/app/dynamic-webform/page.tsx` (app/dynamic-webform/page.tsx:1-893). Maintain consistent:
  - Color tokens: `#002060` (navy), `#FF9500` (orange accent), `#f0f2f5` (background)
  - Border radius: `rounded-2xl` for inputs, `rounded-lg` for buttons
  - Shadow: `shadow-inner` for inputs, custom shadows for cards
  - Typography: existing label/input/button styles
  - Component spacing: `space-y-6` patterns, `p-[50px]` main padding
- **Component Library**: Project uses **shadcn/ui** with Radix UI primitives (confirmed in package.json:11-59)
  - Form components: `react-hook-form` (v7.65.0) with `@hookform/resolvers`
  - UI components: Button, Input, Select, RadioGroup, Switch, Textarea, Form controls
- **Animation**: **Framer Motion** (v12.23.24) is installed—use for page transitions, conditional field reveals, and AI mode swaps
- **Validation**: Zod (v4.1.12) available for schema validation with react-hook-form
- **Icons**: `lucide-react` (v0.545.0) for all icons

### Existing Component Structure
Reference form at `/app/dynamic-webform/page.tsx` shows:
- Two-column layout: 65% form + 35% sidebar
- Multi-step navigation with visual step indicator (app/dynamic-webform/page.tsx:91-201)
- Form state managed via `useForm` hook
- Conditional field rendering based on service type (app/dynamic-webform/page.tsx:635-704)

### Integration Points
- **Output location**: `/app/webform/page.tsx` (currently empty, line 3 shows placeholder)
- **OpenAI Integration**: Will need API route at `/app/api/parse-quote/route.ts` for AI parsing
- **LocalStorage**: Draft autosave using `localStorage` with key pattern like `quote-draft-{timestamp}`

### Key Differences from Reference
The new form requires:
1. **4 pages** (vs. reference's implicit steps) with distinct content per page
2. **Conditional logic**: `hasAccount` toggle controls `clientId` visibility, `vriRLCProvidesLink` controls VRI link field, billing section only shown when no client ID
3. **AI Assist Mode**: Toggle entire UI between traditional form and free-text input
4. **Dynamic right sidebar**: Content changes based on current page and selections
5. **More complex field set**: Organization info, multiple contact fields, location details, billing information

---

## User Stories

- As a **healthcare coordinator**, I want to request interpreter services through a guided multi-step form so I can provide all necessary details without being overwhelmed
- As a **first-time user**, I want to toggle whether I have an account so the form only asks for relevant information
- As a **busy scheduler**, I want to paste unstructured scheduling details and have AI parse them so I can save time on manual data entry
- As a **VRI coordinator**, I want to specify who provides the meeting link so there's no confusion about video call setup
- As a **billing contact**, I want the form to skip billing fields when I have an account ID so I don't re-enter known information
- As a **form user**, I want my draft saved automatically so I don't lose progress if I navigate away

---

## Phase 1: Foundation & Project Setup

### 1.1 Type Definitions & Form Schema
- [ ] Create `/types/quote-form.ts` with TypeScript interface for all 27+ form fields (matching idea spec lines 7-28)
- [ ] Create Zod validation schema in `/lib/schemas/quote-form-schema.ts`:
  - Required field validations (orgName, requestorName, requestorEmail, serviceType, etc.)
  - Conditional validations (clientId required if hasAccount, vriLink required if vriRLCProvidesLink=false and serviceType=vri)
  - Email pattern, phone pattern, URL pattern for relevant fields
  - PHI detection patterns (optional guardrails: flag DOB formats, MRN patterns, SSN patterns in comments field)

### 1.2 API Route for AI Parsing
- [ ] Create `/app/api/parse-quote/route.ts` as Next.js API route
- [ ] Implement OpenAI API call using `openai` package:
  - Accept `aiAssistInput` string in POST body
  - Construct prompt: "Extract appointment scheduling fields from this text. Return JSON with keys: orgName, serviceType (otp/vri/onsite), languages (array), timezone, date, time, duration, address, locationDetails, pointOfContact, providerName, comments. Set null for any field not found. Do not extract PHI like patient names or DOBs."
  - Parse response and return extracted fields
  - Handle errors gracefully (return partial results + error flag)
- [ ] Add environment variable `OPENAI_API_KEY` to `.env.local` (document in README if needed)

### 1.3 Utility Functions
- [ ] Create `/lib/utils/draft-storage.ts`:
  - `saveDraft(formData)`: save to localStorage with timestamp
  - `loadDraft()`: retrieve latest draft
  - `clearDraft()`: remove from localStorage
- [ ] Create `/lib/utils/phi-detection.ts` (optional):
  - `detectPHI(text: string): string[]` — return array of warnings if common PHI patterns detected

---

## Phase 2: Core Form Structure (Pages 1-4)

### 2.1 Main Layout & State Management
- [ ] In `/app/webform/page.tsx`, set up component structure:
  - Two-column grid layout (65% form, 35% sidebar)
  - State: `currentPage` (1-4), `formData` (controlled by react-hook-form), `aiAssistMode` (boolean)
  - Initialize `useForm` with Zod schema resolver and default values
  - Add `useEffect` to load draft on mount, save draft on formData change (debounced)

### 2.2 Step Indicator Component
- [ ] Create `/components/quote-form/StepIndicator.tsx`:
  - Props: `currentStep`, `steps` array (4 steps: Intro & Basics, Appointment & Location, Contacts & Notes, Billing & Review)
  - Visual: numbered circles with connecting lines (reference app/dynamic-webform/page.tsx:165-201)
  - Highlight active/completed steps with orange accent
  - Use Framer Motion for step transition animations

### 2.3 Page 1: Intro & Basics
- [ ] Create `/components/quote-form/Page1IntroBasics.tsx`:
  - **Organization Information** section:
    - `orgName` (text input with icon)
    - `hasAccount` (toggle/switch Yes/No)
    - `clientId` (text input) — conditional: show only if `hasAccount = true`, use Framer Motion for reveal/hide
  - **Requestor Information** section:
    - `requestorName`, `requestorEmail`, `requestorPhone` (all with appropriate icons)
  - **Service Type** section:
    - Radio group with 3 visual cards: Over-the-Phone (otp), Video/VRI (vri), Onsite (onsite)
    - Icons: Phone, Video, MapPin (reference app/dynamic-webform/page.tsx:323-367)
  - Navigation: Continue button (validates Page 1 fields before advancing)
  - Secondary actions: Save draft, Cancel, **AI Assisted Submit** button (sets `aiAssistMode = true`)

### 2.4 Page 2: Appointment, Location & VRI Options
- [ ] Create `/components/quote-form/Page2Appointment.tsx`:
  - **Appointment Details** section:
    - `timezone` (select dropdown with timezone options from reference)
    - `date` (date input), `time` (time input), `duration` (select dropdown)
    - Use icons: Calendar, Clock (reference app/dynamic-webform/page.tsx:530-627)
  - **Location** section:
    - `address` (text input)
    - `locationDetails` (textarea with placeholder: "Building, department, floor, suite/room #")
  - **Languages & Preferences** section:
    - `languages` (multi-select or comma-separated input with chips)
    - `preference` (dropdown/toggle)
  - **VRI-specific section** (conditional: show only when `serviceType = vri`):
    - `vriRLCProvidesLink` (toggle Yes/No: "Will Random Language Company provide a HIPAA-compliant video link?")
    - `vriLink` (URL input) — conditional: show only when `vriRLCProvidesLink = false`, Framer Motion reveal
  - Navigation: Back, Continue buttons

### 2.5 Page 3: Contacts & Notes
- [ ] Create `/components/quote-form/Page3Contacts.tsx`:
  - **Contacts** section:
    - `pointOfContact` (text input with helper text: "Onsite or meeting host contact")
    - `providerName` (text input: "Doctor/Provider Name")
  - **Additional Information** section:
    - `comments` (textarea with PHI warning: "Do not include PHI or patient identifiers")
    - `costCenter` (text input: "Cost Center Number")
    - `altPhone` (tel input, optional: "Alternate Phone")
  - Navigation: Back, Continue buttons

### 2.6 Page 4: Billing & Review
- [ ] Create `/components/quote-form/Page4BillingReview.tsx`:
  - **Billing Information** section (conditional: show only when `clientId` is empty/undefined):
    - `billingAddress`, `billingContactName`, `billingPhone`, `billingEmail` (all with appropriate inputs/icons)
    - Use Framer Motion to animate section in/out based on `clientId` presence
  - **Review & Submit** section:
    - Read-only summary cards for Pages 1-3 data (and billing if shown)
    - Edit links per section (navigate back to relevant page)
    - Consent/attestation checkbox (required before submit)
    - **Submit Request** button (primary action)
  - Navigation: Back button, Submit button (disabled until consent checked and all validations pass)

---

## Phase 3: AI Assist Mode

### 3.1 AI Assist UI Component
- [ ] Create `/components/quote-form/AIAssistPanel.tsx`:
  - Shown when `aiAssistMode = true` (hides multi-page form navigation and fields)
  - Layout: single panel with instructions, large textarea, and action buttons
  - **Instructions** section:
    - Text: "Paste the scheduling details from your system (EHR/CRM/email/ticket). We'll parse it and fill the form for you."
    - Text: "Avoid PHI (patient names, DOBs, MRNs). You may include language, date/time, timezone, address, meeting links, and contacts."
  - **Free-text input**: `aiAssistInput` (large multi-line textarea, min 200px height)
  - **Action buttons**:
    - **Use AI to fill out the form** (primary button) — calls API, parses, populates form state, sets `aiAssistMode = false`, shows success/partial parse message
    - **Cancel AI Assist** (secondary button) — sets `aiAssistMode = false`, returns to form unchanged
  - Use Framer Motion for cross-fade transition between form and AI panel

### 3.2 AI Parsing Integration
- [ ] Implement parsing logic in main form component:
  - On "Use AI to fill out the form" click:
    - Call `/api/parse-quote` with `aiAssistInput`
    - On success: merge extracted fields into form state using `form.setValue()` for each field
    - Display toast/banner: "Successfully extracted [X] fields. Please review [list of fields needing attention]."
    - If partial/failed parse: show non-blocking message, keep pasted text visible for manual copy
    - Navigate to Page 1 with pre-filled fields highlighted (subtle background color or badge indicator)
  - Handle API errors: show user-friendly error message, allow retry

---

## Phase 4: Dynamic Right Sidebar

### 4.1 Sidebar Container & Default Content
- [ ] Create `/components/quote-form/RightSidebar.tsx`:
  - Props: `currentPage`, `serviceType`, `hasClientId`, `aiAssistMode`
  - Navy background (`#002060`), white text, decorative gradient orbs (reference app/dynamic-webform/page.tsx:825-827)
  - Default content (Page 1 on first visit):
    - **Why us?** header with orange accent bar
    - Trust statement: "Trusted by insurance companies and Fortune 500 companies."
    - 3 feature cards with icons: High Success Rate, Risk-Free Booking, Flexible Service Options (reference app/dynamic-webform/page.tsx:14-29)
    - Certification badges: ISO Certified, On-Site Specialists, 24/7 Availability
    - **What you'll need next** list (bullets: appointment date/time, languages, point of contact, address/link)
    - **Privacy reminder**: "Please do not include PHI (patient names, DOBs, MRNs, etc.)"
  - **CTAs** (bottom section):
    - **Submit Request** button (disabled until Review page)
    - **AI Assisted Submit** button (switches to AI Assist mode)
    - **Refresh** button (tertiary style)

### 4.2 Dynamic Content per Page
- [ ] Implement conditional sidebar content based on `currentPage` and `serviceType`:
  - **Page 2 content**:
    - If `serviceType = vri`: show VRI Setup tips (toggle explanation, best practice: join 5 min early)
    - If `serviceType = otp`: show Phone Interpreting Tips (quiet room, backup number)
    - If `serviceType = onsite`: show On-Site Checklist (building/room details, parking instructions)
    - Always show: **Scheduling guidance** ("~90% fill with 3+ days lead time")
  - **Page 3 content**:
    - **Point of Contact** guidance: "Use on-site or meeting host contact, e.g., 'Maria Lopez, Radiology Front Desk'"
    - **Comments field** reminder: "Do not include PHI. Helpful: campus map link, parking code, front-desk phone"
    - **Cost Center** tip: "Enter code so billing routes correctly"
  - **Page 4 content**:
    - If `hasClientId = true`: "Billing on file — we'll use your existing account billing"
    - If `hasClientId = false`: "First-time Billing — provide billing address, contact, phone, email for secure processing"
    - **Final check** reminder: "Confirm date/time, timezone, service type, languages, room numbers/link accuracy"

### 4.3 AI Assist Mode Sidebar Content
- [ ] Create conditional content when `aiAssistMode = true`:
  - **Header**: "Paste details to auto-fill"
  - **Instructions**:
    - "Copy request info from your system (EHR/CRM/email/ticket). We'll parse date/time, timezone, service type, language(s), address or link, and contact details."
  - **What to include** examples: Languages, Date/time & timezone, Location/link, Point of Contact, onsite instructions
  - **What to exclude**: "Do not paste PHI (patient names, DOBs, MRNs, clinical notes)"
  - **Next step**: "Click 'Use AI to fill out the form'. We'll pre-fill fields and show anything we couldn't determine."

---

## Phase 5: Animations & Transitions

### 5.1 Page Transitions
- [ ] Implement Framer Motion animations for page changes:
  - Slide left/fade out when advancing (Next button)
  - Slide right/fade in when going back (Back button)
  - Use `AnimatePresence` wrapper around form pages
  - Animation duration: 300-400ms, easing: `ease-in-out`

### 5.2 Conditional Field Animations
- [ ] Add Framer Motion animations for:
  - `clientId` field reveal/hide (when `hasAccount` toggles)
  - `vriLink` field reveal/hide (when `vriRLCProvidesLink` toggles and `serviceType = vri`)
  - Billing section reveal/hide (based on `clientId` presence)
  - Interpreter name field (when `preferredInterpreter` toggles, if implemented)
- [ ] Animation style: subtle expand/collapse with opacity fade (200ms duration)

### 5.3 AI Mode Swap Animation
- [ ] Implement cross-fade transition (400ms) when toggling `aiAssistMode`:
  - Fade out current view (form or AI panel)
  - Fade in new view
  - Use Framer Motion `motion.div` with `initial`, `animate`, `exit` props

---

## Phase 6: Validation & Behavior

### 6.1 Inline Validation
- [ ] Configure react-hook-form validation:
  - Inline errors beneath fields (use `<FormMessage />` from shadcn/ui)
  - Block progression (disable Next/Continue button) until current page fields are valid
  - Required field markers (`*` in labels)
  - Real-time validation on blur or onChange (use `mode: "onChange"` in useForm)

### 6.2 PHI Guardrails
- [ ] Implement optional client-side PHI detection in `comments` field:
  - On blur or input change, run `detectPHI()` utility
  - If patterns detected, show non-blocking warning banner: "Warning: Detected possible PHI patterns. Please remove patient identifiers."
  - Do not block submission (warning only)

### 6.3 Autosave Draft
- [ ] Implement draft autosave:
  - On form state change, debounce 2 seconds, then call `saveDraft(formData)`
  - On component mount, check for existing draft, prompt user: "We found a saved draft. Would you like to restore it?" (Yes/No buttons)
  - On successful submit, call `clearDraft()` to remove saved data
  - Store draft with timestamp key: `quote-draft-{Date.now()}` — keep only latest

### 6.4 Accessibility
- [ ] Ensure WCAG compliance:
  - All inputs have associated labels (use `<FormLabel />`)
  - ARIA attributes on custom controls (radio group, switches, toggles)
  - Keyboard navigation: Tab order follows visual flow, Enter key submits form/advances page
  - Focus management: when navigating between pages, focus first field of new page
  - Error announcements: use ARIA live regions for validation errors
  - Color contrast: verify all text meets WCAG AA standards (test navy on white, white on navy)

---

## Phase 7: Testing & Refinement

### 7.1 Manual Testing Scenarios
- [ ] Test all 4 pages: verify field visibility, validation, navigation
- [ ] Test conditional logic:
  - Toggle `hasAccount` → verify `clientId` appears/disappears
  - Select `serviceType = vri` → verify VRI section appears on Page 2
  - Toggle `vriRLCProvidesLink` → verify `vriLink` field appears/disappears
  - Leave `clientId` empty on Page 4 → verify Billing section appears
  - Provide `clientId` → verify Billing section hidden
- [ ] Test AI Assist Mode:
  - Paste sample scheduling text (e.g., "Spanish interpreter needed 10/18/2025 2:30 PM PT at 123 Main St, Room 405, contact Dr. Smith 555-1234")
  - Verify parsed fields populate correctly
  - Test partial parse scenario (incomplete text) → verify graceful handling
  - Test API error scenario → verify error message displayed
- [ ] Test draft autosave:
  - Fill form partially, navigate away, return → verify draft restore prompt
  - Complete and submit form → verify draft cleared
- [ ] Test all sidebar content variations (4 pages × 3 service types × 2 client ID states)

### 7.2 Responsive Design
- [ ] Test on mobile/tablet breakpoints:
  - Verify two-column layout collapses to single column on small screens
  - Verify sidebar content remains accessible (possibly bottom sheet or accordion on mobile)
  - Verify touch targets for buttons/toggles meet minimum size (44×44px)

### 7.3 Performance Optimization
- [ ] Lazy-load page components if bundle size is large (use dynamic imports)
- [ ] Memoize sidebar content calculations to prevent unnecessary re-renders
- [ ] Debounce draft save to avoid excessive localStorage writes

---

## Technical Specifications

### Component Architecture
```
app/webform/page.tsx (main container)
├── components/quote-form/StepIndicator.tsx
├── components/quote-form/Page1IntroBasics.tsx
├── components/quote-form/Page2Appointment.tsx
├── components/quote-form/Page3Contacts.tsx
├── components/quote-form/Page4BillingReview.tsx
├── components/quote-form/AIAssistPanel.tsx
└── components/quote-form/RightSidebar.tsx
```

### State Management
- **Form state**: `react-hook-form` with Zod validation schema
- **UI state**: React `useState` for `currentPage`, `aiAssistMode`
- **Persistence**: `localStorage` for draft autosave

### Dependencies (already installed per package.json)
- `react-hook-form` (v7.65.0)
- `@hookform/resolvers` (v5.2.2)
- `zod` (v4.1.12)
- `framer-motion` (v12.23.24)
- `lucide-react` (v0.545.0) for icons
- shadcn/ui components (Button, Input, Select, Textarea, Switch, RadioGroup, Form controls)

### API Integration
- **Endpoint**: `POST /api/parse-quote`
- **Request body**: `{ aiAssistInput: string }`
- **Response**: `{ success: boolean, fields: Partial<FormData>, errors?: string[] }`
- **OpenAI model**: Recommend `gpt-4o-mini` for cost efficiency (or `gpt-4o` for better accuracy)

### Validation Rules (Summary)
- **Required**: orgName, requestorName, requestorEmail, requestorPhone, serviceType, languages, preference, date, time, address
- **Conditional required**:
  - `clientId` if `hasAccount = true`
  - `vriLink` if `serviceType = vri` AND `vriRLCProvidesLink = false`
  - Billing fields (billingAddress, billingContactName, billingPhone, billingEmail) if `clientId` is empty
- **Format validations**: email pattern, phone pattern (flexible), URL pattern for `vriLink`

### Performance Considerations
- Form state updates should be batched to avoid excessive re-renders
- Sidebar content should be memoized based on dependencies (`currentPage`, `serviceType`, `hasClientId`, `aiAssistMode`)
- Draft autosave should be debounced (2s minimum) to reduce localStorage writes
- OpenAI API calls should have timeout (10s recommended) and retry logic (1 retry)

---

## Notes for Implementation

1. **Design Consistency**: Strictly follow the visual patterns in `/app/dynamic-webform/page.tsx` — do not introduce new color schemes, border styles, or typography. The existing form demonstrates the approved design system.

2. **Field Mapping**: The idea spec (docs/dynamic.form.idea.md:7-28) lists all 27 fields. Ensure each field has a corresponding form control with proper validation.

3. **VRI Logic**: The VRI link visibility is nested conditional (serviceType = vri AND vriRLCProvidesLink = false). Test this thoroughly.

4. **Billing Logic**: Billing section should be completely hidden (not just disabled) when `clientId` is present. Use Framer Motion to smoothly transition.

5. **AI Parsing Prompt**: The OpenAI prompt should explicitly instruct the model to avoid extracting PHI. Consider adding examples of what to extract vs. what to skip.

6. **Error Handling**: All API calls and form submissions should have user-friendly error messages. Avoid exposing raw error stacks to users.

7. **Accessibility**: This form will likely be used by healthcare staff with varying technical skills. Prioritize clear labels, intuitive navigation, and keyboard accessibility.

8. **Mobile Experience**: While the reference form is desktop-optimized, ensure the new form is usable on tablets (common in healthcare settings). Consider a bottom-positioned sticky navigation bar for small screens.

9. **Draft Restoration**: When restoring a draft, preserve the `currentPage` state so users return to where they left off.

10. **Submission Flow**: On successful submit, show confirmation message/page and provide a way to submit another request (clear form) or view submitted request details (if backend returns a request ID).
