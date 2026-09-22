export const colabPromises = [
  { number: "01", title: "Centralized project records", description: "Store tasks, notes, conversations, files, feedback, and decisions in the project where they were created.", proof: "Notes · decisions · files · search" },
  { number: "02", title: "Project status and context", description: "View current work, ownership, discussions, decisions, milestones, and workload from the project.", proof: "Milestones · workload · task context" },
  { number: "03", title: "AI-assisted project execution", description: "Use project-scoped AI agents for approved tasks within defined permissions.", proof: "AI agents · previews · task execution" },
];

export const colabMainFeatures = [
  {
    id: "ai-execution",
    number: "01",
    title: "AI task execution",
    description: "Assign approved tasks to project AI agents, run them in isolated Vercel Sandbox environments, and record the results with the project.",
  },
  {
    id: "research",
    number: "02",
    title: "Academic writing, reproducible and open research",
    description: "Write in LaTeX with Overleaf and keep reproducible research files together.",
  },
  {
    id: "previews",
    number: "03",
    title: "Hosted previews and annotations",
    description: "Host previews and attach reviewer comments to specific interface elements.",
  },
  {
    id: "tasks",
    number: "04",
    title: "Tasks and milestones",
    description: "Create tasks, assign owners, set priorities and due dates, and connect each task to a project milestone.",
  },
  {
    id: "communication",
    number: "05",
    title: "Project communication",
    description: "Use chat, channels, comments, meetings, huddles, and project AI bots.",
  },
  {
    id: "files",
    number: "06",
    title: "Files and media",
    description: "Store and access project documents, images, videos, and other media from one project library.",
  },
  {
    id: "writing",
    number: "07",
    title: "Notes and wikis",
    description: "Write Markdown-supported notes, connect them to related project context, and maintain shared project wikis.",
  },
  {
    id: "git",
    number: "08",
    title: "Git version control",
    description: "Connect project tasks and related work to Git repositories.",
  },
];

export const colabWorkflow = [
  { title: "Open a preview or document", description: "Open the live preview or document associated with the project." },
  { title: "Add contextual feedback", description: "Select an interface element, add a comment, or suggest replacement text." },
  { title: "Discuss the feedback", description: "Keep the discussion attached to the selected element or document section." },
  { title: "Create a task", description: "Convert the feedback into a project task without copying it to another tool." },
  { title: "Assign and complete the task", description: "Set the owner, priority, and due date, then record completion." },
  { title: "Record the decision", description: "Store the final decision with its author, date, and related project context." },
];

export const colabComparison = [
  ["Tasks and milestones", "Included", "Distributed", "Connected to project context"],
  ["Conversations and decisions", "Limited", "Stored separately", "Stored with the project"],
  ["Files, notes, and wikis", "Limited", "Distributed", "Available in one project"],
  ["Hosted previews and annotations", "Not included", "Additional tool required", "Included"],
  ["Academic writing with LaTeX", "Not included", "Additional tool required", "Available through Overleaf"],
  ["Project-specific AI agents", "Limited", "Separate configuration", "Work within project access"],
  ["Guest and reviewer access", "Basic sharing", "Managed separately", "Scoped by role and project"],
];

export const colabTrust = [
  ["Workspace members", "Work across the projects owned by their workspace."],
  ["Project guests", "See only the project they were invited to, as editor or viewer."],
  ["Preview reviewers", "Review one preview without gaining access to the project around it."],
  ["Project AI agents", "Stay confined to their project and the tools made available to them."],
];

export const colabFaqs = [
  { question: "What is coLab?", answer: "coLab is an advanced digital workspace where teams organize projects, coordinate work, communicate with collaborators, store project knowledge, and use AI for project tasks in one place." },
  { question: "Is coLab only for research teams?", answer: "No. It supports research, product, software, creative and operations teams, project managers, startups, and individual professionals." },
  { question: "Can I use coLab by myself?", answer: "Yes. You can organize your own projects and invite clients, reviewers, or collaborators only when you need them." },
  { question: "What can coLab's AI access?", answer: "AI agents operate inside the projects and permissions assigned to them. A project agent cannot use its project scope to reach into another project." },
  { question: "Can outside collaborators join?", answer: "Yes. Invite someone to one project as an editor or viewer without exposing the rest of the workspace." },
  { question: "Does coLab support academic writing?", answer: "Yes. Research configurations can include private Overleaf access alongside project notes, decisions, milestones, and communication." },
  { question: "How is a plan recommended?", answer: "During registration, coLab asks about your work, collaborators, projects, required tools, and expected AI use, then recommends the closest package." },
  { question: "Can the plan change later?", answer: "Yes. Capacity and capabilities can change as the number of projects, collaborators, and AI-assisted workflows grows." },
];

export const colabPlans = [
  { name: "PhD", price: "$12", period: "per month", description: "For doctoral researchers and academics managing research, writing, deadlines, and collaboration.", features: ["Research projects and milestones", "Notes, decisions, and files", "Overleaf access", "AI research assistance"], action: "Select PhD plan" },
  { name: "Professional", price: "$29", period: "per month", description: "For professionals, consultants, and project managers coordinating multiple projects.", features: ["Multiple active projects", "Client and guest collaboration", "Previews and contextual feedback", "Expanded AI and compute"], action: "Select Professional plan" },
  { name: "Corporate", price: "$35", period: "per user / month · 5 user minimum", description: "For organizations that need shared knowledge, greater capacity, identity, and team controls.", features: ["High-capacity projects and previews", "Pooled AI allowance", "Organization identity", "Team onboarding and controls"], action: "Contact sales" },
  { name: "Custom coLab", price: "Configured", period: "according to your requirements", description: "For specialized workflows, infrastructure, integrations, capacity, or support requirements.", features: ["Choose the capabilities you need", "Match users, storage, AI, and compute", "Specialized integrations", "Guided configuration"], action: "Request custom plan", featured: true },
];

export const colabAudienceDetails = {
  research: {
    eyebrow: "coLab for research",
    headline: "Keep the research and the reasoning together",
    lead: "Plan the study, preserve its working knowledge, write together, and carry the complete project from first question to final paper.",
    problem: "Research rarely lives in one place. Tasks sit in one tool, papers in another, and the reason behind a methodological choice may exist only in someone’s memory.",
    features: [
      { icon: "calendar", title: "Plan the study around real dates", description: "Give protocols, data collection, analysis, reviews, and submissions milestones the whole team can see.", scenario: "A review date shows the preparation tasks that must be complete before it arrives." },
      { icon: "doc", title: "Preserve working knowledge", description: "Keep research notes, files, decisions, discussions, and connected tasks inside the project they explain.", scenario: "A new student can see why an earlier method was rejected before repeating it." },
      { icon: "users", title: "Write and review together", description: "Use collaborative Notes for working knowledge and private Overleaf access for LaTeX papers.", scenario: "The paper and the project history stay close without pretending they are the same document." },
      { icon: "neural", title: "Give AI the research context", description: "Project agents can work with the information and permissions already established for the study.", scenario: "Ask what needs attention before the protocol review without explaining the whole project again." },
    ],
    steps: [
      { title: "Create the research project", description: "Name the study, add its important dates, and bring in the people who should see it." },
      { title: "Do the work in one connected context", description: "Link tasks, notes, files, discussions, decisions, and writing to the project they belong to." },
      { title: "Keep the complete history", description: "Archive the finished project without losing how the team reached the result." },
    ],
  },
  "product-teams": {
    eyebrow: "coLab for product & software teams",
    headline: "Turn product feedback into completed work",
    lead: "Connect planning, live-product review, technical decisions, team communication, and AI-assisted work in one project history.",
    problem: "Product context is usually split between tickets, chat, documents, screenshots, review tools, and the people who remember why a decision was made.",
    features: [
      { icon: "calendar", title: "Plan releases around milestones", description: "Connect product and engineering tasks to the dates and outcomes they support.", scenario: "A launch milestone shows the product work still standing between today and release." },
      { icon: "palette", title: "Review the live product", description: "Pin feedback to exact interface elements, suggest copy in place, and keep the original context.", scenario: "A reviewer clicks the onboarding headline and proposes clearer wording where it will actually appear." },
      { icon: "check", title: "Move feedback into delivery", description: "Turn a useful preview thread into an assigned task without copying it into another system.", scenario: "The task keeps a link back to the feedback that created it." },
      { icon: "neural", title: "Use agents and isolated compute", description: "Project-scoped agents and sandbox work support technical workflows without crossing project boundaries.", scenario: "Ask an agent to summarize blockers or carry out approved repository work." },
    ],
    steps: [
      { title: "Plan the outcome", description: "Create the release milestones and connect the work that makes each one possible." },
      { title: "Review what is actually being built", description: "Comment directly on a live preview and keep product discussion beside the interface." },
      { title: "Deliver with the reasoning intact", description: "Complete the task and preserve the technical or product decision behind it." },
    ],
  },
  "creative-teams": {
    eyebrow: "coLab for design & creative teams",
    headline: "Give feedback where the work lives",
    lead: "Review the real experience, suggest changes in place, turn approved feedback into tasks, and keep clients inside a clear project boundary.",
    problem: "Creative feedback loses clarity when it arrives as a screenshot, a message, or a sentence such as ‘change the part near the top.’",
    features: [
      { icon: "palette", title: "Pin feedback to the exact element", description: "Click the interface, place the comment, and keep it attached as the design changes.", scenario: "The team sees the exact headline, button, or layout region the reviewer meant." },
      { icon: "doc", title: "Rewrite copy in place", description: "Suggest replacement text at the size and measure where it will actually be read.", scenario: "Compare the original and suggested sentence inside the experience, not in a detached document." },
      { icon: "check", title: "Convert approval into action", description: "Turn feedback into an owned task with its original discussion still attached.", scenario: "The designer receives a clear task instead of a second-hand interpretation of the review." },
      { icon: "lock", title: "Invite a client to one project", description: "Give a reviewer access to the work they need without opening the rest of the workspace.", scenario: "A client reviews the campaign project and sees nothing about another client." },
    ],
    steps: [
      { title: "Share the work under review", description: "Add a live build or uploaded document to the project’s Previews area." },
      { title: "Review it in context", description: "Pin comments, propose copy, discuss the change, and experience suggested edits." },
      { title: "Turn the decision into work", description: "Create the task and preserve the approval or reasoning that moved it forward." },
    ],
  },
  "project-managers": {
    eyebrow: "coLab for project managers",
    headline: "See what needs attention—and the story behind it",
    lead: "Bring priorities, ownership, workload, milestones, conversations, and decisions into one control room for the project.",
    problem: "A status dashboard can tell you that work is late. It rarely tells you what was discussed, which decision changed it, or what the team needs next.",
    features: [
      { icon: "chart", title: "See attention across projects", description: "Bring overdue, high-priority, soon-due work, and upcoming meetings into a focused view.", scenario: "Open the day with the few items that actually require intervention." },
      { icon: "users", title: "Check workload before assigning", description: "See open and overdue work beside each person instead of asking from memory.", scenario: "Give the next task to the person with capacity, not simply the first available name." },
      { icon: "calendar", title: "Connect tasks to milestones", description: "Make dates meaningful by showing the work planned against each one.", scenario: "A delayed task is visible in the milestone it puts at risk." },
      { icon: "doc", title: "Keep decisions visible", description: "Record what the team settled, who recorded it, and when it became the plan.", scenario: "A returning stakeholder can understand why the project changed direction." },
    ],
    steps: [
      { title: "Start with the important dates", description: "Create the milestones the team is genuinely working toward." },
      { title: "Give every task an owner and context", description: "Set priority and due date, then keep its discussion attached." },
      { title: "Manage attention, not noise", description: "Use the dashboard and project history to intervene where the work actually needs it." },
    ],
  },
  startups: {
    eyebrow: "coLab for startups & growing teams",
    headline: "Move quickly without losing what the company learns",
    lead: "Connect product work, operations, communication, decisions, documents, and AI before growth scatters the company’s knowledge.",
    problem: "Young teams move fast, but their operating knowledge often stays in founders’ heads or becomes divided between a growing collection of tools.",
    features: [
      { icon: "layers", title: "Run many kinds of work together", description: "Keep product, research, operations, and client projects in one workspace without flattening them into one list.", scenario: "Each project has its own people and history while the workspace keeps a shared view." },
      { icon: "users", title: "Bring people in with clear boundaries", description: "Use workspace membership for the core team and project access for clients or specialists.", scenario: "A contractor joins one product project without entering company operations." },
      { icon: "doc", title: "Create organizational memory", description: "Make decisions, notes, discussions, and files searchable after roles and priorities change.", scenario: "A new hire can understand how the company reached its current plan." },
      { icon: "neural", title: "Let AI share the project context", description: "Project agents begin with the project’s permitted knowledge instead of an empty prompt.", scenario: "A team member can ask what is blocked without assembling context from several apps." },
    ],
    steps: [
      { title: "Create one workspace for the organization", description: "Bring the core team into a shared home with separate projects for each stream of work." },
      { title: "Connect action and knowledge", description: "Keep tasks, conversations, files, notes, and decisions together as the work changes." },
      { title: "Grow without reconstructing the past", description: "Use the project history to onboard people and continue earlier work with its reasoning intact." },
    ],
  },
  individuals: {
    eyebrow: "coLab for individual professionals",
    headline: "A workspace that remembers every project",
    lead: "Keep client work, deadlines, notes, decisions, and feedback under control without carrying every detail in your head.",
    problem: "Working independently does not make the project simple. One person may still manage several clients, deadlines, documents, collaborators, and streams of feedback.",
    features: [
      { icon: "layers", title: "Give every client a project", description: "Separate work, notes, files, tasks, and decisions without separating the tools used to manage them.", scenario: "Open one client and see the complete project instead of reconstructing it from folders and messages." },
      { icon: "calendar", title: "Keep deadlines visible", description: "Plan larger outcomes with milestones and give each task an owner, priority, and due date.", scenario: "See what needs attention across clients before the day fills with requests." },
      { icon: "lock", title: "Share only what is relevant", description: "Invite a client or collaborator into one project without exposing anything else.", scenario: "A reviewer sees their work and no other client relationship." },
      { icon: "neural", title: "Use AI that knows the project", description: "Ask for help inside the project instead of explaining the client and history again.", scenario: "Summarize open decisions or turn the current plan into tasks from the existing context." },
    ],
    steps: [
      { title: "Create a project for each stream of work", description: "Give every client or professional goal its own clear boundary." },
      { title: "Keep the complete context", description: "Connect deadlines, knowledge, conversations, feedback, and decisions as the project develops." },
      { title: "Invite people only when needed", description: "Collaborate with a client, reviewer, or specialist without giving up control of the rest of the workspace." },
    ],
  },
};
