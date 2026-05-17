I want you to build a local-first MVP for a Georgian language learning platform focused on ACTIVE RECALL and WRITING-BASED learning.

This is NOT a Duolingo clone.

The philosophy is:
- users learn by PRODUCING the language
- typing and writing are the core learning mechanics
- the app should feel like a modern interactive workbook
- minimal gamification
- calm, premium, editorial UI
- memory retention > engagement tricks

The project stack:
- React
- TypeScript
- Vite
- CSS Modules
- localStorage for persistence
- no backend for now

The design system MUST follow the attached “damla-group” reference system exactly:
- Urbanist typography
- navy + bronze + gold palette
- fluid clamp() typography
- generous spacing
- elegant institutional feel
- fade-up animations
- slide-in sections
- soft shadows
- beige/light-gray alternating sections
- premium editorial style
- smooth scroll reveal animations
- mobile-first responsive behavior
- fixed navy header
- animated hero
- decorative gold borders
- calm motion language

IMPORTANT:
Do NOT make the UI childish, cartoonish, over-gamified, or SaaS-like.
Avoid:
- bright gradients
- neon colors
- excessive badges
- mobile-game aesthetics
- Duolingo-like mascots

The app should feel like:
- modern language academy
- premium notebook
- interactive writing studio
- calm cognitive learning environment

====================================================
PRODUCT IDEA
====================================================

The app teaches Georgian primarily through:
1. active recall
2. typing
3. dictation
4. sentence production
5. mistake repetition
6. writing exercises

The user should constantly reconstruct language from memory instead of selecting answers from buttons.

====================================================
MVP FEATURES
====================================================

Build these pages/components:

====================================================
1. LANDING PAGE
====================================================

Hero section:
- fullscreen
- background image related to Georgia/Tbilisi/alphabet/writing
- dark overlay
- editorial headline

Suggested headline:
“Learn Georgian by Writing, Not Guessing.”

Subheadline:
“An immersive Georgian learning system focused on memory, recall, and real language production.”

Buttons:
- Start Learning
- Explore Method

Include:
- animated fadeInUp stagger
- bouncing scroll cue
- blur-to-sharp hero image loading pattern

Additional sections:
- Why writing works
- Active recall explanation
- Georgian alphabet section
- Features grid
- Daily writing practice section
- Mistake repetition explanation
- Footer CTA

====================================================
2. AUTH / PROFILE MOCK
====================================================

No real auth needed.

Create:
- local profile system
- username stored in localStorage
- progress tracking locally

Profile tracks:
- completed lessons
- weak words
- streak
- reviewed exercises

====================================================
3. DASHBOARD
====================================================

Dashboard sections:
- Continue Learning
- Today's Writing Exercises
- Weak Letters
- Weak Words
- Daily Streak
- Recently Practiced
- Alphabet Progress

Cards should follow Damla design language.

====================================================
4. ALPHABET TRAINER
====================================================

This is one of the core MVP systems.

Teach Georgian letters progressively.

Features:
- letter card
- pronunciation audio placeholder
- transliteration
- typing practice
- recognition drills
- “type what you hear”
- confusion pair drills

Example:
User hears:
“ვ”

User types:
“ვ”

Track mistakes.

Store weak letters in localStorage.

Include:
- animated flashcards
- writing-focused interactions
- progress indicators

====================================================
5. WORD RECALL EXERCISES
====================================================

Core mechanic:
User sees English word.

Example:
“Water”

User types:
“წყალი”

System checks:
- correctness
- similarity
- transliteration mistakes

Add:
- success animation
- elegant feedback
- correction hints

DO NOT use multiple choice.

====================================================
6. SENTENCE BUILDER
====================================================

User translates full sentences.

Example:
“I am going home.”

User types Georgian sentence.

After submit:
- show correction
- show breakdown
- explain structure
- highlight mistakes

====================================================
7. DICTATION MODE
====================================================

One of the key differentiators.

Flow:
- audio plays
- user types what they hear
- answer checked
- mistakes highlighted

Use placeholder audio architecture for now.

====================================================
8. SPACED REPETITION / REVIEW SYSTEM
====================================================

Implement simple review logic locally.

Track:
- incorrect answers
- difficult letters
- repeated failures

Generate:
- review queue
- weak-item drills

====================================================
9. DATA STRUCTURE
====================================================

Create scalable TypeScript models:

Lesson
Exercise
AlphabetLetter
Word
Sentence
ReviewItem
MistakePattern
UserProgress

Use mock Georgian learning data.

====================================================
10. DESIGN + UX REQUIREMENTS
====================================================

VERY IMPORTANT:
The UI should feel:
- elegant
- calm
- intelligent
- academic
- immersive

NOT:
- childish
- noisy
- dopamine-driven

Use:
- large editorial headings
- whitespace
- bronze accent sparingly
- smooth motion
- card hover lift
- section alternation
- soft shadows
- fluid typography

Animations:
- IntersectionObserver reveal
- staggered children
- fadeInUp
- slideInFromLeft/Right
- reduced motion support

====================================================
11. ARCHITECTURE
====================================================

Structure the project cleanly:

src/
  components/
  sections/
  hooks/
  pages/
  data/
  styles/
  utils/
  types/
  features/

Create reusable:
- Section component
- Button system
- Card system
- Hero
- Animated wrappers
- Progress widgets

====================================================
12. IMPORTANT LEARNING PRINCIPLES
====================================================

The app should reinforce:
- active recall
- memory retrieval
- productive output
- writing familiarity
- error-driven learning

Avoid passive recognition mechanics.

Typing should be the primary interaction method.

====================================================
13. IMPLEMENTATION PRIORITY
====================================================

Focus first on:
1. beautiful UX
2. architecture
3. writing exercises
4. review system
5. alphabet learning

AI integration can come later.

====================================================
14. OUTPUT REQUIREMENTS
====================================================

Generate:
- complete project structure
- reusable components
- mock data
- routing
- responsive layout
- localStorage persistence
- CSS Modules
- animations
- TypeScript types

The code should be production-quality, scalable, and visually polished.

Do NOT generate pseudo-code.
Generate real implementation-ready React + TypeScript code.