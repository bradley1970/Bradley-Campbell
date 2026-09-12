const models = {
  content: {
    name: "Niche content",
    headline: "Build a useful corner of the internet.",
    description: "Choose a narrow audience, map the questions they repeatedly ask, and publish original answers strengthened by firsthand experience, examples and evidence.",
    strengths: ["Compounds as your useful content library grows", "Multiple monetisation routes", "Can start without building software"],
    risk: "Publishing generic AI text is not a strategy. Distribution, original insight and trust are the work."
  },
  saas: {
    name: "Micro-SaaS",
    headline: "Remove one expensive annoyance.",
    description: "Start with a repeated workflow for one type of customer. Validate the pain manually, then turn the smallest valuable part into software.",
    strengths: ["Recurring revenue can improve predictability", "Clear value when tied to time or money saved", "A small customer base can validate demand"],
    risk: "Code is rarely the hardest part. Customer access, onboarding, support and retention decide whether it survives."
  },
  products: {
    name: "Digital products",
    headline: "Package a shortcut to a real outcome.",
    description: "Turn a repeatable method into a template, toolkit, guide or system for one buyer and one urgent job—not a vague bundle for everyone.",
    strengths: ["Fast and inexpensive to test", "No physical stock or fulfilment", "Useful bridge from service work to scalable revenue"],
    risk: "Low production cost also means low barriers. Specificity, proof and distribution create the defensibility."
  }
};

const quiz = [
  { q: "Which kind of work gives you energy?", answers: [
    ["Researching and explaining a subject", "content"], ["Fixing a repeated workflow", "saas"], ["Packaging a method into something useful", "products"]
  ]},
  { q: "How quickly do you need market feedback?", answers: [
    ["I can wait while traffic compounds", "content"], ["A few weeks is fine", "saas"], ["As quickly as possible", "products"]
  ]},
  { q: "What sounds most sustainable to you?", answers: [
    ["Publishing consistently", "content"], ["Talking to users and improving a tool", "saas"], ["Launching and promoting new offers", "products"]
  ]}
];

let quizStep = 0;
const scores = { content: 0, saas: 0, products: 0 };
const quizContent = document.querySelector("#quizContent");

function renderQuiz() {
  document.querySelectorAll(".step-dots span").forEach((dot, i) => dot.classList.toggle("active", i === quizStep));
  if (quizStep >= quiz.length) return renderResult();
  const item = quiz[quizStep];
  quizContent.innerHTML = `<span class="quiz-progress">QUESTION ${quizStep + 1} OF ${quiz.length}</span><h3>${item.q}</h3><div class="answer-list">${item.answers.map(([label, model]) => `<button class="answer" data-answer="${model}">${label}</button>`).join("")}</div>`;
  quizContent.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => { scores[button.dataset.answer]++; quizStep++; renderQuiz(); }));
}

function renderResult() {
  const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  const model = models[winner];
  quizContent.innerHTML = `<span class="quiz-result-badge">Your strongest starting fit</span><h3>${model.name}</h3><p class="result-copy">${model.description}</p><button class="button button-primary" data-result="${winner}">Open the playbook <span>↗</span></button><button class="answer" id="restartQuiz">Restart finder</button>`;
  quizContent.querySelector("[data-result]").addEventListener("click", () => openModel(winner));
  document.querySelector("#restartQuiz").addEventListener("click", () => { quizStep = 0; Object.keys(scores).forEach(k => scores[k] = 0); renderQuiz(); });
}

const calcConfigs = {
  content: {
    inputs: [{id:"visits",label:"Monthly page views",min:1000,max:250000,step:1000,value:25000},{id:"rpm",label:"Blended revenue per 1,000 views (£)",min:1,max:50,step:1,value:14}],
    calculate: v => v.visits / 1000 * v.rpm,
    formula: v => `${v.visits.toLocaleString()} views ÷ 1,000 × £${v.rpm} blended RPM`,
    reality: "Traffic has to be earned and revenue per thousand views varies sharply by niche, country, season and monetisation mix."
  },
  saas: {
    inputs: [{id:"customers",label:"Paying customers",min:1,max:1000,step:1,value:40},{id:"price",label:"Monthly price (£)",min:5,max:500,step:5,value:49},{id:"churn",label:"Monthly customer churn (%)",min:0,max:20,step:1,value:5}],
    calculate: v => v.customers * v.price,
    formula: v => `${v.customers} customers × £${v.price}/month (before fees and ${v.churn}% churn)`,
    reality: "Recurring revenue is not passive: acquisition, support, infrastructure and replacement of churned customers continue every month."
  },
  products: {
    inputs: [{id:"visitors",label:"Monthly offer-page visitors",min:100,max:100000,step:100,value:2500},{id:"conversion",label:"Purchase conversion (%)",min:.1,max:10,step:.1,value:2},{id:"aov",label:"Average order value (£)",min:5,max:500,step:5,value:39}],
    calculate: v => v.visitors * (v.conversion / 100) * v.aov,
    formula: v => `${v.visitors.toLocaleString()} visitors × ${v.conversion}% × £${v.aov} average order`,
    reality: "Gross sales exclude platform fees, refunds, taxes and the time or cost required to consistently attract qualified visitors."
  }
};

const dynamicInputs = document.querySelector("#dynamicInputs");
const calcModel = document.querySelector("#calcModel");
function renderCalculator() {
  const config = calcConfigs[calcModel.value];
  dynamicInputs.innerHTML = config.inputs.map(i => `<label>${i.label}<div class="range-wrap"><input type="range" id="${i.id}" min="${i.min}" max="${i.max}" step="${i.step}" value="${i.value}"><output class="range-value" for="${i.id}">${i.value}</output></div></label>`).join("");
  dynamicInputs.querySelectorAll("input").forEach(input => input.addEventListener("input", () => { input.nextElementSibling.value = Number(input.value).toLocaleString(); calculate(); }));
  calculate();
}
function calculate() {
  const config = calcConfigs[calcModel.value];
  const values = Object.fromEntries(config.inputs.map(i => [i.id, Number(document.querySelector(`#${i.id}`).value)]));
  const revenue = config.calculate(values);
  document.querySelector("#revenueResult").textContent = revenue.toLocaleString("en-GB", {style:"currency",currency:"GBP",maximumFractionDigits:0});
  document.querySelector("#resultFormula").textContent = config.formula(values);
  document.querySelector("#realityText").textContent = config.reality;
  document.querySelector("#resultBar").style.width = `${Math.min(100, 8 + Math.log10(Math.max(revenue, 1)) * 20)}%`;
}

const roadmaps = {
  content: [["Week 1","Find the gap","Pick one audience and analyse 30 questions, existing results and missing firsthand value.","Deliverable: niche brief"],["Week 2","Build the map","Cluster questions into five useful topic groups and outline ten genuinely distinct pieces.","Deliverable: editorial map"],["Week 3","Publish proof","Create three excellent pages with examples, sources, clear authorship and useful structure.","Deliverable: 3 live articles"],["Week 4","Start distribution","Share where the audience already gathers, collect feedback and improve the pages.","Deliverable: first search + referral data"]],
  saas: [["Week 1","Interview the pain","Speak to ten target users about the last time the workflow failed or cost them time.","Deliverable: interview notes"],["Week 2","Sell it manually","Offer the result as a concierge service before building the full product.","Deliverable: first paid or committed pilot"],["Week 3","Build the wedge","Automate only the most repetitive, valuable step in the workflow.","Deliverable: working narrow MVP"],["Week 4","Measure retention","Onboard pilots, observe usage and ask what would make the tool indispensable.","Deliverable: activation baseline"]],
  products: [["Week 1","Choose one job","Define one buyer, one urgent task and the measurable result your product helps create.","Deliverable: offer statement"],["Week 2","Pre-sell the outcome","Create a clear sales page and show the concept to twenty qualified potential buyers.","Deliverable: demand evidence"],["Week 3","Build the minimum","Produce the smallest polished kit that fully delivers the promised outcome.","Deliverable: version one"],["Week 4","Launch and learn","Run a focused launch, watch objections and revise positioning before adding more products.","Deliverable: sales + objection log"]]
};
function renderRoadmap(type="content") {
  document.querySelector("#roadmapGrid").innerHTML = roadmaps[type].map(w => `<article class="week"><small>${w[0]}</small><h3>${w[1]}</h3><p>${w[2]}</p><span class="deliverable">${w[3]}</span></article>`).join("");
}

const dialog = document.querySelector("#modelDialog");
function openModel(type) {
  const m = models[type];
  document.querySelector("#dialogContent").innerHTML = `<div class="dialog-body"><span class="kicker">${m.name}</span><h2>${m.headline}</h2><p>${m.description}</p><ul>${m.strengths.map(s => `<li>${s}</li>`).join("")}</ul><p class="warning"><strong>Watch-out:</strong> ${m.risk}</p><a class="button button-primary" href="#roadmap" data-dialog-roadmap="${type}">View 30-day roadmap <span>↗</span></a></div>`;
  dialog.showModal();
  dialog.querySelector("[data-dialog-roadmap]").addEventListener("click", () => { setRoadmap(type); dialog.close(); });
}
function setRoadmap(type) {
  document.querySelectorAll("[data-roadmap]").forEach(b => b.classList.toggle("active", b.dataset.roadmap === type)); renderRoadmap(type);
}

document.querySelectorAll("[data-open-model]").forEach(b => b.addEventListener("click", () => openModel(b.dataset.openModel)));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
document.querySelectorAll("[data-roadmap]").forEach(b => b.addEventListener("click", () => setRoadmap(b.dataset.roadmap)));
calcModel.addEventListener("change", renderCalculator);
document.querySelector("#recalculate").addEventListener("click", calculate);
document.querySelector("#year").textContent = new Date().getFullYear();
renderQuiz(); renderCalculator(); renderRoadmap();
