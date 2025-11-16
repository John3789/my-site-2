// app/members/weekly-wisdom/weeklyWisdomData.js

// Newest goes FIRST. Keep max 11 total (1 featured + 10 recent).
export const weeklyWisdomEmails = [
  {
    slug: "reset-and-recharge",
    title: "Reset and recharge: Meditative practices to elevate your day",
    teaser:
      "Ever had one of those days where your brain feels like a browser with 27 open tabs—none of them working? This week’s email shares simple, science-backed practices to help you reset your mind and body in just a few minutes.",
    displayDate: "November 15, 2025",
    body: (
      <>
        <p>
          Ever had one of those days where your brain feels like a browser with
          27 open tabs—none of them working? Yeah, me too.
        </p>
        <p>
          But here&apos;s the good news: you{" "}
          <span className="italic">don&apos;t</span> need a Himalayan retreat or
          a three-hour break to reset your mind (although, if you have a secret
          mountain hideout, please invite me).
        </p>
        <p>You just need a few minutes—and the right, science-backed tools.</p>

        <figure className="mt-6 space-y-3">
          <img
            src="https://images.pexels.com/photos/32298479/pexels-photo-32298479/free-photo-of-peaceful-reflection-at-sunrise-by-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Peaceful person practicing meditation at sunrise"
            className="w-full rounded-xl object-cover"
          />
          <figcaption className="text-center text-[13px] text-[var(--color-gold)]">
            Peaceful person practicing meditation at sunrise
          </figcaption>
        </figure>

        <hr className="my-10 h-px w-full border-0 bg-[var(--color-teal-600)]/60" />

        <h2 className="font-serif text-xl text-[var(--color-cream)]">
          The science: Why short meditations actually work
        </h2>
        <p>Let&apos;s get nerdy for a second (I promise, no lab coats required):</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">
              Research shows even brief mindfulness practices can lower cortisol
              levels—
            </span>{" "}
            the stress hormone that turns you into a frazzled squirrel.
          </li>
          <li>
            Quick meditative resets improve both focus{" "}
            <span className="italic">and</span> productivity. A 2-minute
            breathing exercise can increase your working memory and help you
            tackle that to-do list like a ninja.
          </li>
          <li>
            Regular practice builds mental resilience. Think of it as tiny brain
            push-ups. The more you do, the stronger—and calmer—you get.
          </li>
        </ul>

        <hr className="my-10 h-px w-full border-0 bg-[var(--color-teal-600)]/60" />

        <h2 className="font-serif text-xl text-[var(--color-cream)]">
          Practical tools: Your quick-start meditative toolkit
        </h2>
        <p>Here are my go-to resets—no incense, no chanting required:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">The 60-Second Breath:</span> Close
            your eyes. Breathe in for four counts, out for six. Repeat for one
            minute. Notice your shoulders drop.
          </li>
          <li>
            <span className="font-semibold">Micro Mindful Walk:</span> Step
            outside (or just stand up). Feel your feet on the ground. Take five
            slow breaths as you observe your surroundings.
          </li>
          <li>
            <span className="font-semibold">The “Box Breath”:</span> Inhale for
            4 seconds, hold for 4, exhale for 4, hold for 4. Repeat. It&apos;s
            like a reset button for your brain.
          </li>
        </ul>
        <p className="mt-4">
          Want guided support? My{" "}
          <a
            href="/members/meditations"
            className="underline decoration-[var(--color-gold)] underline-offset-4 hover:opacity-80"
          >
            Meditation Library
          </a>{" "}
          has short 5-minute quick resets, grounding practices, and deeper
          sessions—all built for real life.
        </p>

        <figure className="mt-6 space-y-3">
          <img
            src="https://images.pexels.com/photos/8436495/pexels-photo-8436495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Person sitting cross-legged practicing guided meditation indoors"
            className="w-full rounded-xl object-cover"
          />
          <figcaption className="text-center text-[13px] text-[var(--color-gold)]">
            Person sitting cross-legged practicing guided meditation indoors
          </figcaption>
        </figure>

        <hr className="my-10 h-px w-full border-0 bg-[var(--color-teal-600)]/60" />

        <h2 className="font-serif text-xl text-[var(--color-cream)]">
          A dash of humor, a drop of wisdom
        </h2>
        <p>
          Some days, my meditation is just staring at the ceiling, breathing,
          and hoping my coffee kicks in. That{" "}
          <span className="italic">counts</span>, by the way.
        </p>
        <p>
          The real breakthrough? Giving yourself permission to pause, reset, and
          return to the day with a little more clarity (and maybe a small,
          secret smile).
        </p>
        <p>
          So the next time your brain feels like a glitchy Wi-Fi signal, try one
          of these micro-meditations. Science says your mind—and your day—will
          thank you.
        </p>
        <p>
          Ready to rise higher? Explore deeper self-elevation, live events, and
          meditative support in your{" "}
          <a
            href="/membership"
            className="underline decoration-[var(--color-gold)] underline-offset-4 hover:opacity-80"
          >
            RISE Membership
          </a>
          .
        </p>
        <p>Stay bold. Stay grounded. And never underestimate the power of a mindful minute.</p>
        <p>— Dr. Juan Pablo Salerno</p>
      </>
    ),
  },

  // ====== TEST / SAMPLE PAST EMAILS (for the GRID) ======

  {
    slug: "more-resilient-than-you-think",
    title: "You’re more resilient than you think",
    teaser:
      "When your mind keeps replaying everything you haven’t done, this is how you gently remind it of everything you’ve survived.",
    displayDate: "November 8, 2025",
    body: (
      <>
        <p>
          This week, I want to remind you of something your brain conveniently
          forgets: you&apos;re still here. That alone is proof of your
          resilience.
        </p>
        <p>
          We&apos;ll walk through a simple reflection practice to help you see
          the strength that&apos;s already there, instead of only noticing what
          hasn&apos;t happened yet.
        </p>
      </>
    ),
  },

  {
    slug: "tiny-alignments",
    title: "Tiny alignments that quietly change everything",
    teaser:
      "You don’t need a total life overhaul. You just need a few degrees of adjustment in the right direction.",
    displayDate: "November 1, 2025",
    body: (
      <>
        <p>
          Big change is usually the result of tiny, unglamorous, repeated
          shifts. In this email, we talk about micro-alignments you can make in
          your day that actually stick.
        </p>
      </>
    ),
  },

  {
    slug: "on-low-energy-days",
    title: "How to reset on low-energy days",
    teaser:
      "On the days when you’re not at 100%, you’re not failing—you’re human. Here’s how to move gently instead of forcing yourself.",
    displayDate: "October 25, 2025",
    body: (
      <>
        <p>
          Not every day is meant to be optimized. Some days are meant to be
          softened. This email gives you three realistic options for caring for
          yourself when your tank is low.
        </p>
      </>
    ),
  },

  {
    slug: "permission-to-slow-down",
    title: "Permission to slow down (without losing momentum)",
    teaser:
      "Slowing down doesn’t mean you’re falling behind. It often means you’re finally moving at a human pace.",
    displayDate: "October 18, 2025",
    body: (
      <>
        <p>
          We explore how to slow down in a way that protects your nervous system
          while still honoring your goals. Spoiler: rest and growth are on the
          same team.
        </p>
      </>
    ),
  },
];
