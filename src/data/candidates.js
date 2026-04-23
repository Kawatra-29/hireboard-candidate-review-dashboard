import { computePriorityScore, computePriorityLevel } from "../utils/priority";

const firstNames = ["Arjun","Priya","Rohan","Sneha","Vikram","Ananya","Karan","Divya","Rahul","Meera","Aditya","Pooja","Siddharth","Nisha","Akash","Riya","Nikhil","Kavya","Harsh","Swati","Yash","Ishita","Gaurav","Shruti","Varun","Preeti","Mohit","Anjali","Deepak","Simran","Amit","Tanya","Rajesh","Pallavi","Vishal","Neha","Manish","Komal","Tarun","Bhavna","Sumit","Ritika","Abhishek","Shweta","Vivek","Megha","Sandeep","Alka","Tushar","Juhi"];
const lastNames = ["Sharma","Patel","Singh","Kumar","Verma","Gupta","Mehta","Shah","Joshi","Yadav","Agarwal","Mishra","Tiwari","Pandey","Chauhan","Rao","Nair","Pillai","Reddy","Iyer","Menon","Das","Ghosh","Bose","Roy","Chatterjee","Mukherjee","Bhat","Kaur","Gill","Malhotra","Kapoor","Khanna","Bajaj","Sethi","Arora","Bhatt","Saxena","Srivastava","Chandra"];
const colleges = ["IIT Bombay","IIT Delhi","IIT Madras","IIT Kanpur","IIT Kharagpur","NIT Trichy","NIT Warangal","BITS Pilani","VIT Vellore","DTU Delhi","IIIT Hyderabad","IIIT Bangalore","Jadavpur University","Manipal Institute","SRM University","Amity University","Symbiosis Institute","Thapar Institute","PES University","RV College of Engineering"];
const allSkills = ["React","Node.js","Python","TypeScript","MongoDB","PostgreSQL","Docker","AWS","Git","GraphQL","Redis","Kubernetes","Next.js","Vue.js","Express","FastAPI","TailwindCSS","Figma","Jest","CI/CD"];
const statuses = ["pending","reviewed","shortlisted","rejected"];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max) { return parseFloat((Math.random() * (max - min) + min).toFixed(1)); }

function generateCandidate(id) {
  const firstName = firstNames[rand(0, firstNames.length - 1)];
  const lastName = lastNames[rand(0, lastNames.length - 1)];
  const assignmentScore = randFloat(30, 100);
  const videoScore = randFloat(30, 100);
  const atsScore = randFloat(30, 100);
  const githubScore = randFloat(30, 100);
  const communicationScore = randFloat(30, 100);

  const candidate = {
    id,
    name: `${firstName} ${lastName}`,
    college: colleges[rand(0, colleges.length - 1)],
    assignmentScore,
    videoScore,
    atsScore,
    githubScore,
    communicationScore,
    reviewStatus: statuses[rand(0, 3)],
    appliedDate: new Date(2024, rand(0, 11), rand(1, 28)).toISOString().split("T")[0],
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    phone: `+91 ${rand(70000, 99999)}${rand(10000, 99999)}`,
    experience: rand(0, 4),
    skills: [...allSkills].sort(() => Math.random() - 0.5).slice(0, rand(3, 7)),
    assignmentEval: {
      uiQuality: rand(1, 10),
      componentStructure: rand(1, 10),
      stateHandling: rand(1, 10),
      edgeCaseHandling: rand(1, 10),
      responsiveness: rand(1, 10),
      accessibilityAwareness: rand(1, 10),
    },
    videoEval: {
      clarity: rand(1, 10),
      confidence: rand(1, 10),
      architectureExplanation: rand(1, 10),
      tradeoffReasoning: rand(1, 10),
      communicationStrength: rand(1, 10),
    },
    notes: [],
  };

  const ps = computePriorityScore(candidate);
  candidate.priorityScore = ps;
  candidate.priorityLevel = computePriorityLevel(ps);
  return candidate;
}

let _cache = null;
export function getCandidates() {
  if (!_cache) _cache = Array.from({ length: 100 }, (_, i) => generateCandidate(i + 1));
  return _cache;
}
