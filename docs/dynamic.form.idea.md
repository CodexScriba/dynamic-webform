Interactive Multi‑Step “Request a Quote” (4 pages)

> Implementation note: **Follow the existing **``** design system** (components, spacing, typography, tokens). Do **not** introduce custom visual styles here. Animations may use **Framer Motion** as specified below.

---

## Global Field IDs / State (for implementation)

* `orgName`
* `hasAccount` (boolean)
* `clientId`
* `requestorName`
* `requestorEmail`
* `requestorPhone`
* `serviceType` ∈ {`otp`, `vri`, `onsite`}
* `timezone`, `date`, `time`, `duration`
* `address`, `locationDetails`
* `languages` (multi)
* `preference`
* `followUpNeeded` (boolean)
* `pointOfContact` (text)
* `providerName`
* `comments`, `costCenter`, `altPhone`
* `vriRLCProvidesLink` (boolean)
* `vriLink` (url)
* `billingAddress`, `billingContactName`, `billingPhone`, `billingEmail`
* `aiAssistMode` (boolean) — when **true**, hide the form and show free‑text paste area
* `aiAssistInput` (string) — raw text pasted by user for AI parsing

**Visibility Logic (summary):**

* Show `clientId` **iff** `hasAccount = true`.
* Show VRI link controls **iff** `serviceType = vri`.

  * If `vriRLCProvidesLink = true`, **hide** `vriLink`.
  * If `vriRLCProvidesLink = false`, **show** `vriLink`.
* Show **Billing Information** **only if** `clientId` is empty/undefined (no account ID provided).
* When `aiAssistMode = true`, hide multi‑page form UI; show **AI Assist Panel** with a large free‑text area and the action button **Use AI to fill out the form**.

---

# Page 1 — Intro & Basics

## Header

* **Title:** Request a Quote
* **Subtitle:** Connect with our expert team for professional language services

## Organization Information

* **Organization Name** (`orgName`: text)
* **Do you have an account with us?** (`hasAccount`: toggle Yes/No)

  * **Client ID** (`clientId`: text) — *visible only when* `hasAccount = true`

## Requestor Information

* **Requestor Name** (`requestorName`: text)
* **Email** (`requestorEmail`: email)
* **Phone** (`requestorPhone`: tel)

## Service Type

* **Service Type** (`serviceType`: radio/segmented)

  * Options: **Over‑the‑Phone (**`**) | Video/VRI (**`**) | Onsite (**``**)**

**Primary:** Continue → Page 2
**Secondary:** Save draft / Cancel
**Tertiary:** **AI Assisted Submit** → sets `aiAssistMode = true`

---

# Page 2 — Appointment, Location & VRI Options

## Appointment Details (always)

* **Timezone** (`timezone`: select)
* **Date** (`date`: date)
* **Time** (`time`: time)
* **Duration** (`duration`: select)

## Location

* **Address/Location** (`address`: text)
* **Location Details** (`locationDetails`: textarea) — building, department, floor, suite/room #

## Languages & Preferences (always)

* **Languages Needed** (`languages`: multi-select/chips)
* **Preference** (`preference`: dropdown/toggle)

## VRI‑specific (only when `serviceType = vri`)

* **Will Random Language Company provide a HIPAA‑compliant video link?** (`vriRLCProvidesLink`: toggle Yes/No)

  * **Appointment VRI Link** (`vriLink`: url) — *visible only when* `vriRLCProvidesLink = false`

**Primary:** Continue → Page 3
**Secondary:** Back

---

# Page 3 — Contacts & Notes

## Contacts

* **Point of Contact** (`pointOfContact`: text)
  *Replaces separate “Onsite Contact” and “Point of Contact” — single combined field.*
* **Doctor/Provider Name** (`providerName`: text)

## Additional Information

* **Comments** (`comments`: textarea) — *Do not include PHI or patient identifiers.*
* **Cost Center Number** (`costCenter`: text)
* **Alternate Phone** (`altPhone`: tel, optional)

**Primary:** Continue → Page 4
**Secondary:** Back

---

# Page 4 — Billing & Review

> **Billing Information is shown only when the customer has *****no Client ID*****.** If a `clientId` is present (user has an account), skip straight to Review.

## Billing Information (conditional: show when `!clientId`)

* **Billing Address** (`billingAddress`: text)
* **Billing Contact Name** (`billingContactName`: text)
* **Billing Phone** (`billingPhone`: tel)
* **Billing Email** (`billingEmail`: email)

## Review & Submit

* Read‑only summary of Pages 1–3 (and Billing if shown)
* Edit links per section
* **Consent/Attestation** checkbox
* **Submit Request** (primary)

---

# AI Assist Mode (Form Replacement)

When `aiAssistMode = true` (triggered by **AI Assisted Submit**):

* Hide the multi‑page form navigation and fields.
* Show a single panel with:

  * **Instructions** (top):

    * “Paste the scheduling details from your system (EHR/CRM/email/ticket). We’ll parse it and fill the form for you.”
    * “Avoid PHI (patient names, DOBs, MRNs). You may include language, date/time, timezone, address, meeting links, and contacts.”
  * **Free‑Text Area** (`aiAssistInput`): large multi‑line input.
  * **Action Button:** **Use AI to fill out the form** — runs parsing, maps recognized fields to state, sets `aiAssistMode = false`, returns user to the appropriate page with fields pre‑filled and surfaced validation flags.
  * **Secondary:** Cancel AI Assist — sets `aiAssistMode = false` and restores the form unchanged.

**Parsing outcomes**

* On success: populate known fields; show a short summary of what was extracted and which fields still need attention.
* On partial/failed parse: show non‑blocking message and keep the pasted text available for manual copy.

---

## Validation & Behavior (non‑visual)

* Inline errors beneath fields; block progression until required fields are valid.
* **PHI guardrails:** helper text; optionally flag classic PHI patterns client‑side.
* **Autosave** draft at each step; pre‑fill known org/requestor details if available.
* **Accessibility:** labels/aria associations and keyboard‑navigable controls.

**Animation (Framer Motion)**

* Page transitions (slide/fade) between steps.
* Conditional field reveal/hide (e.g., `clientId`, VRI link) with subtle expand/collapse.
* AI Assist mode swap: cross‑fade form ↔ free‑text panel.

---

# Right‑Side Panel (Contextual Guidance & CTAs)

> Sticky panel that updates based on page, choices, and **AI Assist mode**.

## Default (Page 1 — first visit)

**Why us?**
Trusted by insurance companies and Fortune 500 companies.

📅 **High Success Rate**
90% success rate when given 3 days or more.

💰 **Risk‑Free Booking**
Free cancellation up to 24 hours.

📱 **Flexible Service Options**
Video, phone, and on‑site interpretation available.

ISO Certified · On‑Site Specialists · 24/7 Availability

**What you’ll need next**
• Appointment date/time
• Language(s) requested
• Point of Contact
• Address (if onsite) or meeting link (if VRI)

**Privacy reminder**
Please do **not** include PHI (patient names, DOBs, MRNs, etc.).

**CTAs**

* **Submit Request** (disabled until Review)
* **AI Assisted Submit** — switch to AI Assist mode to paste unstructured details.
* **Refresh**

---

## Page 2 (Appointment/Location) — dynamic tips

### If `serviceType = vri`

**VRI Setup**
• Toggle **“RLC provides HIPAA‑compliant link”** if you want us to generate and send the secure link.
• If toggled **Yes** → you won’t need to paste a link here.
• If **No** → provide your **VRI link** so the interpreter can join.

**Best practice**
Join 5 minutes early to confirm audio/video and interpreter admission.

### If `serviceType = otp`

**Phone Interpreting Tips**
Have a quiet room and a backup phone number ready in case of connectivity issues.

### If `serviceType = onsite`

**On‑Site Checklist**
Provide building, department, floor, and room to reduce check‑in time. Add parking/entry instructions if any.

**Scheduling guidance**
We hit **~90% fill** with **3+ days** lead time; urgent requests are attempted immediately.

---

## Page 3 (Contacts & Notes) — guidance

**Point of Contact**
Use the on‑site or meeting host who can reach the interpreter day‑of. Example: “Maria Lopez, Radiology Front Desk”.

**Comments field**
Do **not** include PHI. Helpful examples: campus map link, parking code, front‑desk phone.

**Cost Center**
If required by your org, enter the code so billing routes correctly.

---

## Page 4 (Billing & Review) — conditional messaging

### If `clientId` **is present**

**Billing on file**
We’ll use your existing account billing. You can still review all details before submitting.

### If `clientId` **is empty**

**First‑time Billing**
Provide billing address, contact, phone, and email so we can process the request. We store details securely.

**Final check**
Confirm date/time, timezone, service type, and languages. Look for room numbers or link accuracy.

**CTAs**

* **Submit Request** — sends to scheduling
* **AI Assisted Submit** — available earlier; switches to AI Assist mode

---

## Right‑Side Panel — **AI Assist Mode** content (when `aiAssistMode = true`)

**Paste details to auto‑fill**
Copy the request info from your system (EHR/CRM/email/ticket). We’ll parse date/time, timezone, service type, language(s), address or link, and contact details.

**What to include (examples)**
• Language(s): “Spanish, ASL”
• Date/time & timezone: “10/18/2025 2:30 PM PT”
• Location or meeting link
• Point of Contact and callback number
• Any onsite instructions (parking, building/room)

**What to exclude**
Please do **not** paste PHI (patient names, DOBs, MRNs, clinical notes).

**Next step**
Click **Use AI to fill out the form**. We’ll pre‑fill fields and show anything we couldn’t determine.

---

Follow the design avaialble in 

/home/cynic/workspace/dynamic-webform/app/dynamic-webform/page.tsx

Output the results in 

/home/cynic/workspace/dynamic-webform/app/webform/page.tsx

