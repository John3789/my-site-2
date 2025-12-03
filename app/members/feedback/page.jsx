"use client";

import { useRef, useState } from "react";
import { useIosZoomVars } from "../../../components/useIosZoom";
import MembersHomeLink from "../MembersHomeLink";

const AREA_OPTIONS = [
  { key: "overall", label: "1. Overall Experience" },
  { key: "welcome", label: "2. Welcome and Orientation" },
  { key: "website", label: "3. RISE Membership Website & Members Area" },
  { key: "ai", label: "4. Dr. Salerno AI" },
  { key: "liveSessions", label: "5. Monthly Live Inner Growth Sessions" },
  { key: "customMeditations", label: "6. Custom Meditations + Vision Calls" },
  { key: "transformationCalls", label: "7. Transformation Calls" },
  { key: "meditationLibrary", label: "8. Meditation Library" },
  { key: "weeklyWisdom", label: "9. Weekly Wisdom Emails" },
  { key: "socialMediaSpace", label: "10. Social Media Inspiration Space" },
  { key: "mhGuides", label: "11. Mental Health & Alignment Guides" },
  { key: "somethingElse", label: "12. Something Else" }
];

const SCALE_HELPFUL = [
  { value: "1", label: "1 – Not at all helpful" },
  { value: "2", label: "2 – A little helpful" },
  { value: "3", label: "3 – Somewhat helpful" },
  { value: "4", label: "4 – Very helpful" },
  { value: "5", label: "5 – Extremely helpful" }
];

const SCALE_EXPERIENCE = [
  { value: "1", label: "1 – Very poor" },
  { value: "2", label: "2 – Poor" },
  { value: "3", label: "3 – Fair" },
  { value: "4", label: "4 – Good" },
  { value: "5", label: "5 – Very good" }
];

const SCALE_FREQUENCY = [
  { value: "1", label: "1 – Not at all" },
  { value: "2", label: "2 – Rarely" },
  { value: "3", label: "3 – Sometimes" },
  { value: "4", label: "4 – Often" },
  { value: "5", label: "5 – Very often" }
];

const initialFormState = {
  // Monthly Live Inner Growth Sessions
  live_attended: "",
  live_attendedCount: "",
  live_watchedRecording: "",
  live_recordingCount: "",
  live_experienceRating: "",
  live_helpfulRating: "",
  live_mostMeaningful: "",
  live_improvements: "",
  live_moreOf: "",
  live_moreMeaningful: "",

  // Meditation Library
  med_helpfulRating: "",
  med_supportiveThemes: "",
  med_moreOf: "",
  med_improve: "",

  // Dr. Salerno AI
  ai_helpfulRating: "",
  ai_love: "",
  ai_moreIntuitive: "",
  ai_newFeatures: "",
  ai_improveExperience: "",

  // Weekly Wisdom Emails
  ww_helpfulRating: "",
  ww_frequency: "",
  ww_moreOf: "",
  ww_moreMeaningful: "",

  // Transformation Calls
  tc_hadCall: "",
  tc_experienceRating: "",
  tc_mostMeaningful: "",
  tc_improve: "",

  // Custom Meditations + Vision Calls
  cm_hadCustom: "",
  cm_visionRating: "",
  cm_meditationAccuracy: "",
  cm_processBetter: "",
  cm_visionImprove: "",

  // Website & Members Area
  web_membershipPageRating: "",
  web_membershipPageImprove: "",
  web_membersAreaRating: "",
  web_membersAreaEase: "",
  web_confusingFlows: "",
  web_membersAreaImprove: "",
  web_device: "",
  web_deviceMultiDetail: "",
  web_mobileImprove: "",

  // Overall Experience
  overall_experience: "",
  overall_mostImpactful: "",
  overall_unclear: "",
  overall_morePowerful: "",
  overall_enhanceValue: "",

  // Social Media Inspiration Space
  sm_frequency: "",
  sm_helpfulRating: "",
  sm_supportiveThemes: "",
  sm_moreOf: "",
  sm_moreMeaningful: "",

  // Mental Health & Alignment Guides
  mh_frequency: "",
  mh_helpfulRating: "",
  mh_supportiveThemes: "",
  mh_moreOf: "",
  mh_moreMeaningful: "",

  // Welcome & Orientation
  welcome_overallRating: "",
  welcome_emailHelpful: "",
  welcome_videoHelpful: "",
  welcome_roadmapHelpful: "",
  welcome_startHereHelpful: "",
  welcome_moreMeaningful: "",
  welcome_improve: "",

  // Something else
  somethingElse_text: "",

  // Final
  final_newTools: "",
  final_anythingElse: "",
  final_followup: "",
  final_email: ""
};

export default function MembersFeedbackPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggleArea(key) {
    setSelectedAreas(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  }

  function handleFieldChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const res = await fetch("/api/forms/members-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedAreas,
          ...formData
        })
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setFormData(initialFormState);
      setSelectedAreas([]);
    } catch (err) {
      console.error(err);
      setError("There was an issue sending your feedback. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  function areaSelected(key) {
    return selectedAreas.includes(key);
  }

  return (
    <div ref={wrapRef} className="min-h-screen bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[900px] px-6 py-10">
        <header className="mb-8">
<div className="mb-6 flex justify-start">
  <MembersHomeLink
    className="mt-9 inline-flex items-center rounded-full border border-[var(--color-gold)] bg-transparent px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.14em] text-[var(--color-gold)]"
  />
</div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">RISE Member Experience Feedback Survey</p>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl">A space to help shape the future of RISE.</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-cream)]/85">
            Thank you for being part of RISE. Your presence, your voice, and your experience matter more than you know. This survey is a space for you to share what&apos;s working beautifully, what could feel even better, and what you&apos;d love to see next. Your feedback helps refine the journey, elevate the tools, and co-create a program that truly supports your growth and transformation.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10">
          {/* MAIN CHOICE */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">What part of RISE would you like to share feedback on today?</h2>
            <p className="text-xs text-[var(--color-cream)]/70">You can select one or more areas below and then scroll down.</p>
            <div className="mt-4 space-y-2">
  {AREA_OPTIONS.map(area => {
    const active = areaSelected(area.key);
    const baseClasses =
      "flex w-full items-start justify-between gap-3 rounded-lg border px-4 py-2 text-xs font-semibold tracking-wide";
    const activeClasses =
      "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-cream)] shadow-sm";
    const inactiveClasses =
      "border-white/20 bg-white/5 text-[var(--color-cream)]/90 hover:bg-white/10";

    return (
      <button
        key={area.key}
        type="button"
        onClick={() => toggleArea(area.key)}
        className={active ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`}
      >
        {/* Left: number + label, always left-aligned and allowed to wrap */}
<span className="flex-1 flex text-left leading-snug">

  {/* Number block — only 10,11,12 get extra width */}
  <span
    className="inline-block shrink-0 tabular-nums text-left"
    style={{
      width:
        area.label.startsWith("1") && area.label[1] !== "."
          ? "2.6ch" // for 10, 11, 12
          : "1.8ch" // for 1–9
    }}
  >
    {area.label.split(".")[0]}.
  </span>

  {/* Text block */}
  <span className="ml-1 break-words">
    {area.label.split(". ").slice(1).join(". ")}
  </span>
</span>



        {/* Right: status pill, fixed width so it doesn’t shift */}
        <span className="shrink-0 ml-3 text-right text-[10px] uppercase tracking-[0.2em]">
          {active ? "Chosen" : "Select"}
        </span>
      </button>
    );
  })}
</div>

            <p className="mt-2 text-[11px] text-[var(--color-cream)]/60">Choose at least one area above to share your reflections. You can come back to this page anytime.</p>
          </section>

          {/* A – OVERALL EXPERIENCE */}
          {areaSelected("overall") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">A. Overall Experience</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">A1. How would you describe your experience in RISE so far?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.overall_experience} onChange={e => handleFieldChange("overall_experience", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">A2. What has been the most impactful part of your journey?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.overall_mostImpactful} onChange={e => handleFieldChange("overall_mostImpactful", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">A3. Is there anything that feels unclear, overwhelming, or less relevant to you?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.overall_unclear} onChange={e => handleFieldChange("overall_unclear", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">A4. What would make RISE feel even more powerful or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.overall_morePowerful} onChange={e => handleFieldChange("overall_morePowerful", e.target.value)} />
              </div>
            </section>
          )}

          {/* B – WELCOME AND ORIENTATION */}
          {areaSelected("welcome") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">B. Welcome and Orientation</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">B1. How would you rate your welcome and orientation to the RISE Membership Program?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_overallRating} onChange={e => handleFieldChange("welcome_overallRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_EXPERIENCE.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B2. How helpful was the welcome email you received after signing up for RISE?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_emailHelpful} onChange={e => handleFieldChange("welcome_emailHelpful", e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1 - Not at all helpful</option>
                  <option value="2">2 - A little helpful</option>
                  <option value="3">3 - Somewhat helpful</option>
                  <option value="4">4 - Very helpful</option>
                  <option value="5">5 - Extremely helpful</option>
                  <option value="did-not-read">Did not read</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B3. How helpful was the welcome video?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_videoHelpful} onChange={e => handleFieldChange("welcome_videoHelpful", e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1 - Not at all helpful</option>
                  <option value="2">2 - A little helpful</option>
                  <option value="3">3 - Somewhat helpful</option>
                  <option value="4">4 - Very helpful</option>
                  <option value="5">5 - Extremely helpful</option>
                  <option value="did-not-watch">Did not watch</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B4. How helpful was the RISE Roadmap?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_roadmapHelpful} onChange={e => handleFieldChange("welcome_roadmapHelpful", e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1 - Not at all helpful</option>
                  <option value="2">2 - A little helpful</option>
                  <option value="3">3 - Somewhat helpful</option>
                  <option value="4">4 - Very helpful</option>
                  <option value="5">5 - Extremely helpful</option>
                  <option value="did-not-use">Did not use</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B5. How helpful was the &quot;Start Here – your first 7 days&quot; section in the RISE Members Area?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_startHereHelpful} onChange={e => handleFieldChange("welcome_startHereHelpful", e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1 - Not at all helpful</option>
                  <option value="2">2 - A little helpful</option>
                  <option value="3">3 - Somewhat helpful</option>
                  <option value="4">4 - Very helpful</option>
                  <option value="5">5 - Extremely helpful</option>
                  <option value="did-not-use">Did not use</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B6. What would make the Welcome and Orientation process even more meaningful or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_moreMeaningful} onChange={e => handleFieldChange("welcome_moreMeaningful", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">B7. What could be improved in the Welcome and Orientation process in the future?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_improve} onChange={e => handleFieldChange("welcome_improve", e.target.value)} />
              </div>
            </section>
          )}

          {/* C – WEBSITE & MEMBERS AREA */}
          {areaSelected("website") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">C. RISE Membership Website & Members Area</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">C1. How would you rate the RISE Membership page (where you sign up or login)?</label> 
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_membershipPageRating} onChange={e => handleFieldChange("web_membershipPageRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_EXPERIENCE.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C2. How could we improve the RISE Membership page (where you sign up or login)?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_membershipPageImprove} onChange={e => handleFieldChange("web_membershipPageImprove", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C3. How would you rate the RISE Members Area (after you login)?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_membersAreaRating} onChange={e => handleFieldChange("web_membersAreaRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_EXPERIENCE.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C4. How easy is it for you to navigate the RISE Members Area (after you login)?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.welcome_emailHelpful} onChange={e => handleFieldChange("welcome_emailHelpful", e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1 - Very difficult</option>
                  <option value="2">2 - Difficult</option>
                  <option value="3">3 - Neutral</option>
                  <option value="4">4 - Easy</option>
                  <option value="5">5 - Very easy</option>
                  <option value="did-not-read">Did not read</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C5. Which pages or flows feel overwhelming, unclear, or confusing in the RISE Members Area (after you login)?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_confusingFlows} onChange={e => handleFieldChange("web_confusingFlows", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C6. How could we improve the RISE Members Area (after you login)?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_membersAreaImprove} onChange={e => handleFieldChange("web_membersAreaImprove", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C7. What specific device do you access your membership on most often?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_device} onChange={e => handleFieldChange("web_device", e.target.value)}>
                  <option value="">Select</option>
                  <option value="iPhone">iPhone</option>
                  <option value="Android">Android</option>
                  <option value="iPad">iPad</option>
                  <option value="Laptop/Desktop">Laptop/Desktop</option>
                  <option value="multiple">Multiple devices equally (please specify)</option>
                </select>
                {formData.web_device === "multiple" && (
                  <div className="mt-2 space-y-1">
                    <label className="text-xs text-[var(--color-cream)]/80">Please specify which devices you use most often:</label>
                    <input type="text" className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_deviceMultiDetail} onChange={e => handleFieldChange("web_deviceMultiDetail", e.target.value)} placeholder="For example: iPhone and MacBook" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">C8. Anything about your mobile/tablet experience that you&apos;d like to see improve?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.web_mobileImprove} onChange={e => handleFieldChange("web_mobileImprove", e.target.value)} />
              </div>
            </section>
          )}

          {/* D – DR. SALERNO AI */}
          {areaSelected("ai") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">D. Dr. Salerno AI</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">D1. How helpful has Dr. Salerno AI been for you? </label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ai_helpfulRating} onChange={e => handleFieldChange("ai_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">D2. What do you love about Dr. Salerno AI so far?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ai_love} onChange={e => handleFieldChange("ai_love", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">D3. What could make Dr. Salerno AI even more intuitive or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ai_moreIntuitive} onChange={e => handleFieldChange("ai_moreIntuitive", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">D4. Are there any new features you wish Dr. Salerno AI had?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ai_newFeatures} onChange={e => handleFieldChange("ai_newFeatures", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">D5. How can we improve your experience using Dr. Salerno AI?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ai_improveExperience} onChange={e => handleFieldChange("ai_improveExperience", e.target.value)} />
              </div>
            </section>
          )}

          {/* E – MONTHLY LIVE INNER GROWTH SESSIONS */}
          {areaSelected("liveSessions") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">E. Monthly Live Inner Growth Sessions</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">E1. Have you attended a Monthly Live Inner Growth Session?</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Yes", "No"].map(val => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input type="radio" name="live_attended" value={val} checked={formData.live_attended === val} onChange={e => handleFieldChange("live_attended", e.target.value)} className="h-3 w-3" />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.live_attended === "Yes" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">E2. If yes, how many Live Sessions have you attended in total? (0–6)</label>
                  <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_attendedCount} onChange={e => handleFieldChange("live_attendedCount", e.target.value)}>
                    <option value="">Select</option>
                    {["0", "1", "2-4", "5-7", "8-10", "11-13", "14+"].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">E3. Have you watched a recording from a Monthly Live Inner Growth Session?</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Yes", "No"].map(val => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input type="radio" name="live_watchedRecording" value={val} checked={formData.live_watchedRecording === val} onChange={e => handleFieldChange("live_watchedRecording", e.target.value)} className="h-3 w-3" />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.live_watchedRecording === "Yes" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">E4. If yes, how many recordings have you watched? (0–6)</label>
                  <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_recordingCount} onChange={e => handleFieldChange("live_recordingCount", e.target.value)}>
                    <option value="">Select</option>
                    {["0", "1", "2-4", "5-7", "8-10", "11-13", "14+"].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">E5. How would you rate your Live Session experience overall?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_experienceRating} onChange={e => handleFieldChange("live_experienceRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_EXPERIENCE.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E6. How helpful have the Live Sessions been for you?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_helpfulRating} onChange={e => handleFieldChange("live_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E7. What parts of the Live Sessions have felt most meaningful or powerful?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_mostMeaningful} onChange={e => handleFieldChange("live_mostMeaningful", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E8. What could be improved in future Live Sessions?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_improvements} onChange={e => handleFieldChange("live_improvements", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E9. What would you love to see more of in the Live Sessions?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_moreOf} onChange={e => handleFieldChange("live_moreOf", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E10. What would make the Live Sessions even more significant or supportive for you?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.live_moreMeaningful} onChange={e => handleFieldChange("live_moreMeaningful", e.target.value)} />
              </div>
            </section>
          )}

          {/* F – CUSTOM MEDITATIONS + VISION CALLS */}
          {areaSelected("customMeditations") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">F. Custom Meditations + Vision Calls</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">F1. Have you had a Custom Meditation created for you?</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Yes", "No"].map(val => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input type="radio" name="cm_hadCustom" value={val} checked={formData.cm_hadCustom === val} onChange={e => handleFieldChange("cm_hadCustom", e.target.value)} className="h-3 w-3" />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.cm_hadCustom === "Yes" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">F2. How would you rate your Vision Call experience?</label>
                    <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.cm_visionRating} onChange={e => handleFieldChange("cm_visionRating", e.target.value)}>
                      <option value="">Select</option>
                      {SCALE_EXPERIENCE.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">F3. How meaningful or accurate did your Custom Meditation feel?</label>
                    <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.cm_meditationAccuracy} onChange={e => handleFieldChange("cm_meditationAccuracy", e.target.value)}>
                      <option value="">Select</option>
                      {SCALE_HELPFUL.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">F4. What could make the Custom Meditation process even better for you?</label>
                    <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.cm_processBetter} onChange={e => handleFieldChange("cm_processBetter", e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">F5. What could be improved in future Vision Calls?</label>
                    <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.cm_visionImprove} onChange={e => handleFieldChange("cm_visionImprove", e.target.value)} />
                  </div>
                </>
              )}
            </section>
          )}

          {/* G – TRANSFORMATION CALLS */}
          {areaSelected("transformationCalls") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">G. Transformation Calls</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">G1. Have you had a Transformation Call yet?</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Yes", "No"].map(val => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input type="radio" name="tc_hadCall" value={val} checked={formData.tc_hadCall === val} onChange={e => handleFieldChange("tc_hadCall", e.target.value)} className="h-3 w-3" />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.tc_hadCall === "Yes" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">G2. How would you rate your Transformation Call experience?</label>
                    <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.tc_experienceRating} onChange={e => handleFieldChange("tc_experienceRating", e.target.value)}>
                      <option value="">Select</option>
                      {SCALE_EXPERIENCE.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">G3. What parts of your Transformation Call felt most meaningful or powerful?</label>
                    <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.tc_mostMeaningful} onChange={e => handleFieldChange("tc_mostMeaningful", e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">G4. What could be improved in future Transformation Calls?</label>
                    <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.tc_improve} onChange={e => handleFieldChange("tc_improve", e.target.value)} />
                  </div>
                </>
              )}
            </section>
          )}

          {/* H – MEDITATION LIBRARY */}
          {areaSelected("meditationLibrary") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">H. Meditation Library</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">H1. How helpful has the Meditation Library been for you?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.med_helpfulRating} onChange={e => handleFieldChange("med_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
  <label className="text-sm font-medium">
    H2. Which meditations or themes have been most supportive for you?
  </label>
    <p className="text-[11px] text-[var(--color-cream)]/70">
    For example: motivation &amp; mindset, mental health &amp; stress,
    confidence &amp; self-worth, relationships &amp; connection,
    feeling lost &amp; finding your way, manifestation &amp; intention setting.
  </p>
  <textarea
    className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm"
    value={formData.med_supportiveThemes}
    onChange={e => handleFieldChange("med_supportiveThemes", e.target.value)}
  />
</div>

              <div className="space-y-2">
                <label className="text-sm font-medium">H3. What would you love to see more of in the Meditation Library?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.med_moreOf} onChange={e => handleFieldChange("med_moreOf", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">H4. What could be improved in the Meditation Library to enhance your experience?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.med_improve} onChange={e => handleFieldChange("med_improve", e.target.value)} />
              </div>
            </section>
          )}

          {/* I – WEEKLY WISDOM EMAILS */}
          {areaSelected("weeklyWisdom") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">I. Weekly Wisdom Emails</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">I1. How helpful has the Weekly Wisdom been for you?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ww_helpfulRating} onChange={e => handleFieldChange("ww_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">I2. How often do you read your Weekly Wisdom?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ww_frequency} onChange={e => handleFieldChange("ww_frequency", e.target.value)}>
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="once-per-month">Once per month</option>
                  <option value="twice-per-month">Twice per month</option>
                  <option value="three-times-per-month">Three times per month</option>
                  <option value="four-times-per-month">Four times a month (every week)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">I3. What would you love to see more of in the Weekly Wisdom?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ww_moreOf} onChange={e => handleFieldChange("ww_moreOf", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">I4. What would make the Weekly Wisdom even more meaningful or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.ww_moreMeaningful} onChange={e => handleFieldChange("ww_moreMeaningful", e.target.value)} />
              </div>
            </section>
          )}

          {/* J – SOCIAL MEDIA INSPIRATION SPACE */}
          {areaSelected("socialMediaSpace") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">J. Social Media Inspiration Space</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">J1. How often do you use the Social Media Inspiration Space?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.sm_frequency} onChange={e => handleFieldChange("sm_frequency", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_FREQUENCY.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">J2. How helpful has the Social Media Inspiration Space been for you?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.sm_helpfulRating} onChange={e => handleFieldChange("sm_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">J3. Which themes or topics have been most supportive in the Social Media Inspiration Space?</label>
                  <p className="text-[11px] text-[var(--color-cream)]/70">
    For example: motivation &amp; mindset, mental health &amp; stress,
    confidence &amp; self-worth, relationships &amp; connection,
    feeling lost &amp; finding your way, manifestation &amp; intention setting.
  </p>       <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.sm_supportiveThemes} onChange={e => handleFieldChange("sm_supportiveThemes", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">J4. What would you love to see more of in the Social Media Inspiration Space?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.sm_moreOf} onChange={e => handleFieldChange("sm_moreOf", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">J5. What would make the Social Media Inspiration Space even more meaningful or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.sm_moreMeaningful} onChange={e => handleFieldChange("sm_moreMeaningful", e.target.value)} />
              </div>
            </section>
          )}

          {/* K – MENTAL HEALTH & ALIGNMENT GUIDES */}
          {areaSelected("mhGuides") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">K. Mental Health & Alignment Guides</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">K1. How often do you use the Mental Health & Alignment Guides?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.mh_frequency} onChange={e => handleFieldChange("mh_frequency", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_FREQUENCY.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">K2. How helpful have the Mental Health & Alignment Guides been for you?</label>
                <select className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.mh_helpfulRating} onChange={e => handleFieldChange("mh_helpfulRating", e.target.value)}>
                  <option value="">Select</option>
                  {SCALE_HELPFUL.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">K3. Which themes or topics have been most supportive in the Mental Health & Alignment Guides?</label>
    <p className="text-[11px] text-[var(--color-cream)]/70">
    For example: motivation &amp; mindset, mental health &amp; stress,
    confidence &amp; self-worth, relationships &amp; connection,
    feeling lost &amp; finding your way, manifestation &amp; intention setting.
  </p>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.mh_supportiveThemes} onChange={e => handleFieldChange("mh_supportiveThemes", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">K4. What would you love to see more of in the Mental Health & Alignment Guides?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.mh_moreOf} onChange={e => handleFieldChange("mh_moreOf", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">K5. What would make the Mental Health & Alignment Guides even more meaningful or supportive?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.mh_moreMeaningful} onChange={e => handleFieldChange("mh_moreMeaningful", e.target.value)} />
              </div>
            </section>
          )}

          {/* L – SOMETHING ELSE */}
          {areaSelected("somethingElse") && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">L. Something Else</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">L1. Share anything else you&apos;d like to provide feedback on:</label>
                <textarea className="min-h-[100px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.somethingElse_text} onChange={e => handleFieldChange("somethingElse_text", e.target.value)} />
              </div>
            </section>
          )}

          {/* FINAL SECTION – ONLY SHOWN IF AT LEAST ONE AREA IS SELECTED */}
          {selectedAreas.length > 0 && (
            <section className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)]/80">Final Questions</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium">Final 1. What new tools, services, or features would you love to see added to RISE?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.final_newTools} onChange={e => handleFieldChange("final_newTools", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Final 2. Is there anything else you&apos;d like me to know about your experience?</label>
                <textarea className="min-h-[80px] w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.final_anythingElse} onChange={e => handleFieldChange("final_anythingElse", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Final 3. Would you be open to a follow-up conversation?</label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["Yes", "Not at this time"].map(val => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input type="radio" name="final_followup" value={val} checked={formData.final_followup === val} onChange={e => handleFieldChange("final_followup", e.target.value)} className="h-3 w-3" />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.final_followup === "Yes" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Final 4. If yes, what&apos;s the best email to reach you at? (optional)</label>
                  <input type="email" className="w-full rounded-md bg-black/20 px-3 py-2 text-sm" value={formData.final_email} onChange={e => handleFieldChange("final_email", e.target.value)} />
                </div>
              )}
            </section>
          )}

          {/* STATUS + SUBMIT */}
          {error && <p className="text-xs text-red-300">{error}</p>}
          {submitted && !error && <p className="text-xs text-[var(--color-gold)]">Thank you — your feedback has been submitted.</p>}

          <div className="pt-2">
            <button type="submit" disabled={submitting || selectedAreas.length === 0} className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-2.5 text-sm font-semibold tracking-wide text-black shadow-md hover:bg-[var(--color-gold)]/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Sending..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
