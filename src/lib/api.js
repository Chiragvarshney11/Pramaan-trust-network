const seedWorker = {
  id: "worker-demo-001",
  role: "worker",
  name: "Sunita Sharma",
  email: "worker@pramaan.demo",
  mobile: "+91 98765 43210",
  category: "Domestic Worker",
  location: "Delhi, India",
  experience_years: 6.4,
  worker_id: "PRM-W-7F42K9KB",
  skills: ["Cooking","Cleaning","Baby Care","Elder Care","House Keeping"],
  languages: ["Hindi","English"],
  bio: "Experienced domestic professional focused on dependable, respectful household support.",
  identity: { verified: true, masked: "XXXX XXXX 4821" },
  member_since: "2022-01-01",
  rating: 4.9,
  review_count: 28,
  trustScore: 92
};

const seedEmployer = {
  id: "employer-demo-001",
  role: "employer",
  name: "Rajesh Malhotra",
  email: "employer@pramaan.demo",
  mobile: "+91 98111 22334",
  company_name: "Malhotra Household",
  location: "Delhi, India",
  verified: true,
  employees_count: 12,
  active_count: 5,
  completed_count: 7,
  trustScore: 88
};

const seedReviews = [
  { id:"r1", reviewer_name:"Rajesh Malhotra", rating:5, title:"Consistent and dependable", body:"Reliable work, respectful communication and consistent performance.", verified:1, authenticityScore:96, riskLevel:"Low", integrityStatus:"Genuine", created_at:new Date(Date.now()-18*24*60*60*1000).toISOString(), signals:{verifiedEmployment:true,reviewerVerified:true,detailedText:true,accountAge:true,velocityNormal:true,repetitiveLanguage:false} },
  { id:"r2", reviewer_name:"Anita Kapoor", rating:5, title:"Very professional", body:"Punctual, trustworthy and excellent with household responsibilities.", verified:1, authenticityScore:92, riskLevel:"Low", integrityStatus:"Genuine", created_at:new Date(Date.now()-11*24*60*60*1000).toISOString(), signals:{verifiedEmployment:true,reviewerVerified:true,detailedText:true,accountAge:true,velocityNormal:true,repetitiveLanguage:false} },
  { id:"r3", reviewer_name:"Vikram Mehta", rating:4, title:"Good experience overall", body:"The work was positive, but the reviewer has limited history on the network.", verified:1, authenticityScore:74, riskLevel:"Medium", integrityStatus:"Needs Review", created_at:new Date(Date.now()-5*24*60*60*1000).toISOString(), signals:{verifiedEmployment:true,reviewerVerified:false,detailedText:true,accountAge:false,velocityNormal:true,repetitiveLanguage:false} }
];

function storedReviews() {
  try {
    const raw = localStorage.getItem("pramaan_reviews");
    if (raw) { const parsed=JSON.parse(raw); if (Array.isArray(parsed)) return parsed; localStorage.removeItem("pramaan_reviews"); }
  } catch { localStorage.removeItem("pramaan_reviews"); }
  return seedReviews;
}
function saveReviews(reviews) {
  localStorage.setItem("pramaan_reviews", JSON.stringify(reviews));
}

const seedWorkers = [
  seedWorker,
  { id:"worker-002", name:"Rekha Devi", worker_id:"PRM-W-4D81RT62", category:"Cook", location:"Delhi, India", experience_years:4.2, skills:["Cooking","Meal Prep","Kitchen Care"], rating:4.7, review_count:18, identity_verified:true, trustScore:87 },
  { id:"worker-003", name:"Pooja Kumari", worker_id:"PRM-W-2Q91PL47", category:"Baby Care", location:"Noida, India", experience_years:3.8, skills:["Baby Care","Elder Care"], rating:4.6, review_count:14, identity_verified:true, trustScore:82 },
  { id:"worker-004", name:"Meena Verma", worker_id:"PRM-W-9K31AX54", category:"House Keeping", location:"Gurugram, India", experience_years:7.1, skills:["Cleaning","House Keeping","Cooking"], rating:4.8, review_count:22, identity_verified:true, trustScore:90 },
  { id:"worker-005", name:"Sakshi Yadav", worker_id:"PRM-W-6T52BN18", category:"Caregiver", location:"Delhi, India", experience_years:5.5, skills:["Elder Care","Patient Care"], rating:4.5, review_count:11, identity_verified:true, trustScore:84 }
];

const seedRequests = [
  { id:"req1", worker_name:"Sunita Sharma", category:"Domestic Worker", status:"accepted", rating:4.9 },
  { id:"req2", worker_name:"Rekha Devi", category:"Cook", status:"pending", rating:4.7 }
];

const seedMessages = [
  { id:"m1", sender_id:"employer-demo-001", sender_name:"Rajesh Malhotra", body:"Hi Sunita, we'd like to discuss an employment opportunity.", created_at:new Date(Date.now()-45*60*1000).toISOString() },
  { id:"m2", sender_id:"worker-demo-001", sender_name:"Sunita Sharma", body:"Sure, thank you. Please share the details.", created_at:new Date(Date.now()-38*60*1000).toISOString() }
];

function storedMessages() {
  try { const raw = localStorage.getItem("pramaan_messages"); if (raw) { const parsed=JSON.parse(raw); if (Array.isArray(parsed)) return parsed; localStorage.removeItem("pramaan_messages"); } } catch { localStorage.removeItem("pramaan_messages"); }
  return seedMessages;
}
function saveMessages(messages) { localStorage.setItem("pramaan_messages", JSON.stringify(messages)); }

const seedDocuments = [
  { id:"d1", name:"Identity Verification", type:"identity", status:"verified" },
  { id:"d2", name:"PRAMAAN Passport", type:"passport", status:"verified" }
];
function storedDocuments(){
  try{
    const raw=localStorage.getItem("pramaan_documents");
    if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed))return parsed;}
  }catch{}
  const fresh=seedDocuments.map(d=>({...d}));
  localStorage.setItem("pramaan_documents",JSON.stringify(fresh));
  return fresh;
}
function saveDocuments(documents){localStorage.setItem("pramaan_documents",JSON.stringify(documents));}

function currentUser() {
  const raw = localStorage.getItem("pramaan_user");
  return raw ? JSON.parse(raw) : null;
}
function saveUser(user) {
  localStorage.setItem("pramaan_user", JSON.stringify(user));
}
function delay(value) {
  return new Promise(resolve => setTimeout(() => resolve(value), 80));
}

function profileIntegrity(reviews=storedReviews()) {
  const ratings = reviews.map(r=>Number(r.rating)).filter(Number.isFinite);
  const total = ratings.length;
  const average = total ? ratings.reduce((a,b)=>a+b,0)/total : 0;
  const now = Date.now();
  const recent = reviews.filter(r => {
    const t = Date.parse(r.created_at || "");
    return Number.isFinite(t) && now - t <= 7*24*60*60*1000;
  });
  const recentFive = recent.filter(r=>Number(r.rating)===5).length;
  const recentFiveRatio = recent.length ? recentFive/recent.length : 0;
  const hasMixedRatings = new Set(ratings).size >= 3 && ratings.some(r=>r<=3) && ratings.some(r=>r>=4);
  const repetitive = reviews.filter(r=>r.signals?.repetitiveLanguage).length;
  const lowHistory = reviews.filter(r=>r.signals?.accountAge===false || r.signals?.reviewerVerified===false).length;
  const burstFiveStar = average >= 4.9 && recent.length >= 4 && recentFiveRatio >= 0.8;
  const evidenceQuality = Math.max(0, Math.min(100,
    58 + (hasMixedRatings ? 18 : 0) + (average >= 4.2 && average < 4.9 ? 12 : 0)
    + (recentFiveRatio < 0.8 ? 8 : 0) - repetitive*8 - lowHistory*3
  ));
  const fraudRisk = burstFiveStar || evidenceQuality < 45;
  return {
    verdict: fraudRisk ? "FRAUD RISK" : "GENUINE",
    tone: fraudRisk ? "high" : "low",
    confidence: fraudRisk ? Math.max(72, Math.round(100-evidenceQuality/2)) : Math.max(70, evidenceQuality),
    average: Number(average.toFixed(2)),
    total,
    recentCount: recent.length,
    recentFive,
    recentFiveRatio: Math.round(recentFiveRatio*100),
    mixedRatings: hasMixedRatings,
    reasons: fraudRisk
      ? [
          burstFiveStar ? "Near-perfect rating with a concentrated 5-star burst" : "Multiple review-integrity signals need investigation",
          repetitive ? "Repetitive review language detected" : "Review pattern is unusually concentrated",
          lowHistory ? "Some reviewers have limited account history" : "Review evidence should be manually verified"
        ]
      : [
          hasMixedRatings ? "Rating distribution contains varied scores" : "No extreme rating concentration detected",
          recentFiveRatio < 0.8 ? "Recent ratings are not dominated by 5-star reviews" : "Review timing appears normal",
          repetitive === 0 ? "No repetitive-language signal detected" : "Some language signals need review"
        ]
  };
}

function buildReviewInsights(reviews) {
  const rows = Array.isArray(reviews) ? reviews : [];
  const avg = rows.length ? rows.reduce((a,r)=>a+Number(r.rating||0),0)/rows.length : 0;
  const avgAuth = rows.length ? rows.reduce((a,r)=>a+Number(r.authenticityScore||88),0)/rows.length : 88;
  const flagged = rows.filter(r=>String(r.integrityStatus||"").toLowerCase().includes("review") || String(r.riskLevel||"").toLowerCase()==="high").length;
  return { averageRating:Number(avg.toFixed(1)), authenticityScore:Math.round(avgAuth), flagged, total:rows.length, checks:[
    {label:"Employment linkage",score:94,status:"Strong"}, {label:"Reviewer verification",score:91,status:"Strong"},
    {label:"Language consistency",score:86,status:"Stable"}, {label:"Review velocity",score:93,status:"Normal"},
    {label:"Rating distribution",score:89,status:"Healthy"}
  ]};
}
function analyticsFor(user) {
  const reviews=storedReviews(); const ratings=reviews.map(r=>Number(r.rating||0)).filter(Boolean);
  const avg=ratings.length ? ratings.reduce((a,b)=>a+b,0)/ratings.length : 0;
  const integrity=profileIntegrity(reviews);
  return { role:user?.role==="employer"?"Employer":"Worker", trustScore:Number(user?.trustScore||92), reviewAverage:Number(avg.toFixed(1)), reviewCount:ratings.length,
    distribution:[5,4,3,2,1].map(x=>ratings.filter(r=>r===x).length), labels:["5★","4★","3★","2★","1★"],
    trustTrend:[74,78,77,81,84,86,89,Number(user?.trustScore||92)], months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
    signals:[{label:"Identity verification",score:96},{label:"Review authenticity",score:Math.round(integrity.confidence)},{label:"Employment consistency",score:92},{label:"Network health",score:84}] };
}

export const api = {
  me: () => delay({ user: currentUser() }),
  login: async ({email,password}) => {
    const role = email.toLowerCase().includes("employer") ? "employer" : "worker";
    const ok = (role === "worker" && password === "Worker@123") || (role === "employer" && password === "Employer@123");
    if (!ok) throw new Error("Demo login: worker@pramaan.demo / Worker@123 or employer@pramaan.demo / Employer@123");
    const user = role === "worker" ? seedWorker : seedEmployer;
    saveUser(user);
    return delay({user});
  },
  register: async (body) => {
    const user = body.role === "worker"
      ? {...seedWorker, id:"local-worker-"+Date.now(), name:body.name, email:body.email, mobile:body.mobile, location:body.location, category:body.category || "General Worker", experience_years:Number(body.experienceYears||0), skills:body.skills||[], worker_id:"PRM-W-"+Math.random().toString(36).slice(2,10).toUpperCase()}
      : {...seedEmployer, id:"local-employer-"+Date.now(), name:body.name, email:body.email, mobile:body.mobile, location:body.location, company_name:body.companyName || "My Organization"};
    saveUser(user);
    return delay({user});
  },
  logout: async () => { localStorage.removeItem("pramaan_user"); return delay({ok:true}); },
  dashboard: async () => {
    const user = currentUser() || seedWorker;
    if (user.role === "worker") return delay({
      role:"worker", profile:user,
      stats:{experience:user.experience_years, employers:5, reviews:storedReviews().length, trustScore:user.trustScore},
      activeJobs:1, recentReviews:storedReviews(), profileIntegrity:profileIntegrity(storedReviews())
    });
    return delay({role:"employer", profile:user, stats:{hired:user.employees_count,active:user.active_count,completed:user.completed_count,trustScore:user.trustScore}, requests:seedRequests});
  },
  workers: async ({q="",location=""}={}) => {
    const query=(q||"").toLowerCase(), loc=(location||"").toLowerCase();
    const workers=seedWorkers.filter(w =>
      (!query || `${w.name} ${w.worker_id} ${w.category}`.toLowerCase().includes(query)) &&
      (!loc || w.location.toLowerCase().includes(loc))
    );
    return delay({workers});
  },
  passport: async (workerId) => {
    const active=currentUser();
    const activeMatches=active && active.role==="worker" && (!workerId || active.worker_id===workerId);
    const w=activeMatches ? active : (seedWorkers.find(x=>x.worker_id===workerId) || active || seedWorker);
    return delay({passport:{
      workerId:w.worker_id, name:w.name, category:w.category, location:w.location,
      experienceYears:w.experience_years, skills:w.skills, languages:w.languages||["Hindi","English"],
      bio:w.bio || "Experienced verified professional with a PRAMAAN work identity.",
      identity:w.identity || {verified:true,masked:"XXXX XXXX 4821"},
      rating:w.rating||4.8, reviewCount:w.review_count||12, memberSince:w.member_since||"2022-01-01",
      trustScore:w.trustScore||88, photoUrl:w.photoUrl||"",
      integrity:profileIntegrity(storedReviews())
    }});
  },
  verify: async (workerId) => {
    const w=seedWorkers.find(x=>x.worker_id.toUpperCase()===workerId.toUpperCase());
    if(!w) throw new Error("Passport not found");
    return delay({verified:true,passport:{workerId:w.worker_id,name:w.name,category:w.category,location:w.location,rating:w.rating,reviewCount:w.review_count,trustScore:w.trustScore}});
  },
  reviews: () => delay({reviews:storedReviews()}),
  addReview: async (payload) => {
    const reviews = storedReviews();
    const rating = Number(payload.rating || 5);
    const text = String(payload.body || "").trim();
    const suspiciousTerms = ["best ever", "100% genuine", "guaranteed", "no doubt", "perfect"];
    const repeatedPhrase = text.length > 0 && new Set(text.toLowerCase().split(/\s+/)).size < Math.max(4, text.split(/\s+/).length * 0.55);
    const signals = {
      verifiedEmployment: !!payload.verifiedEmployment,
      reviewerVerified: !!payload.reviewerVerified,
      detailedText: text.length >= 60,
      ratingExtreme: rating === 1 || rating === 5,
      repetitiveLanguage: repeatedPhrase || suspiciousTerms.some(t => text.toLowerCase().includes(t)),
      accountAge: Number(payload.accountAgeDays || 180) >= 30,
      velocityNormal: Number(payload.reviewsLast24h || 1) <= 5
    };
    const positive = [signals.verifiedEmployment,signals.reviewerVerified,signals.detailedText,signals.accountAge,signals.velocityNormal].filter(Boolean).length;
    const riskPenalty = [signals.ratingExtreme,signals.repetitiveLanguage].filter(Boolean).length * 12;
    const authenticityScore = Math.max(20, Math.min(99, 58 + positive * 8 - riskPenalty));
    const review = {
      id:"r-"+Date.now(), reviewer_name:payload.reviewerName || "PRAMAAN Member", rating, title:payload.title || "Verified work experience", body:text,
      verified:signals.verifiedEmployment && signals.reviewerVerified ? 1 : 0,
      authenticityScore, riskLevel:authenticityScore >= 80 ? "Low" : authenticityScore >= 60 ? "Medium" : "High",
      signals, created_at:new Date().toISOString()
    };
    reviews.unshift(review); saveReviews(reviews); return delay({review,reviews});
  },
  reviewInsights: async () => delay(buildReviewInsights(storedReviews())),
  updateProfile: async (patch) => {
    const base = currentUser() || seedWorker;
    const user = {...base, ...patch, identity:base.identity || seedWorker.identity};
    if (user.role === "worker") Object.assign(seedWorker, user);
    saveUser(user);
    return delay({user});
  },
  profileIntegrity: async () => delay(profileIntegrity(storedReviews())),
  trust: (userId) => {
    const u=[seedWorker,seedEmployer,...seedWorkers].find(x=>x.id===userId) || currentUser() || seedWorker;
    return delay({score:u.trustScore||88,level:(u.trustScore||88)>=90?"Excellent":"Good",factors:[
      {name:"Review authenticity",score:95,level:"High"},
      {name:"Verification consistency",score:92,level:"High"},
      {name:"Network health",score:78,level:"Good"},
      {name:"Review velocity",score:92,level:"Normal"},
      {name:"Behavioral pattern",score:95,level:"Good"}
    ]});
  },
  sendRequest: () => delay({id:"req-"+Date.now(),status:"pending"}),
  updateRequest: () => delay({ok:true,status:"accepted"}),
  messages: () => delay({messages:storedMessages()}),
  sendMessage: async (payload) => {
    const messages=storedMessages(); const user=currentUser() || seedWorker;
    const message={id:"m-"+Date.now(),sender_id:user.id,sender_name:user.name,body:String(payload?.body||"").trim(),created_at:new Date().toISOString()};
    if(!message.body) throw new Error("Message cannot be empty.");
    messages.push(message); saveMessages(messages); return delay({message,messages});
  },
  analytics: async () => delay(analyticsFor(currentUser() || seedWorker)),
  documents: () => delay({documents:storedDocuments()}),
  addDocument: async (payload={}) => {
    const documents=storedDocuments();
    const document={id:"d-"+Date.now(),name:String(payload.name||payload.fileName||"New document"),type:String(payload.type||"verification"),status:"pending",fileName:String(payload.fileName||"")};
    documents.unshift(document);saveDocuments(documents);return delay({document,documents});
  },
  disputes: () => delay({disputes:[]}),
  addDispute: () => delay({id:"disp-"+Date.now(),status:"open"}),
  audit: () => delay({audit:[
    {id:"a1",created_at:new Date().toISOString(),user_name:"PRAMAAN Demo",action:"LOGIN",entity_type:"user"},
    {id:"a2",created_at:new Date().toISOString(),user_name:"Rajesh Malhotra",action:"EMPLOYMENT_REQUEST_CREATED",entity_type:"employment_request"},
    {id:"a3",created_at:new Date().toISOString(),user_name:"Rajesh Malhotra",action:"VERIFIED_REVIEW_CREATED",entity_type:"review"}
  ]})
};
