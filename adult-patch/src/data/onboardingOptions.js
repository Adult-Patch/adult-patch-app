export const SITUATION_OPTIONS = [
  {
    id: "living-alone",
    label: "혼자 살고 있거나 자취를 준비하고 있어요.",
    shortLabel: "자취 준비",
  },
  {
    id: "first-job",
    label: "취업 또는 첫 직장을 준비하고 있어요.",
    shortLabel: "첫 직장",
  },
  {
    id: "housing-finance",
    label: "집이나 금융 관련 결정을 앞두고 있어요.",
    shortLabel: "주거·금융",
  },
  {
    id: "general-life",
    label: "생활 전반을 하나씩 배우고 싶어요.",
    shortLabel: "생활 전반",
  },
];

export const INTEREST_OPTIONS = [
  {
    id: "daily-life",
    label: "자취생활",
    description:
      "세탁, 청소, 식재료 보관처럼 혼자 생활할 때 필요한 내용",
  },
  {
    id: "housing-contract",
    label: "주거·계약",
    description:
      "집을 알아보고 계약하며 거주할 때 필요한 내용",
  },
  {
    id: "finance",
    label: "금융생활",
    description:
      "월급, 카드, 저축과 같은 기본적인 돈 관리",
  },
  {
    id: "work",
    label: "직장생활",
    description:
      "첫 직장에서 필요한 질문, 보고, 일정 조율 방법",
  },
  {
    id: "safety",
    label: "생활안전",
    description:
      "분실, 의심 문자 등 갑작스러운 상황에 대응하는 방법",
  },
];

export const EXPERIENCE_OPTIONS = [
  {
    id: "beginner",
    label: "아직 거의 경험해보지 않았어요.",
    shortLabel: "처음 배우는 중",
  },
  {
    id: "some-experience",
    label: "몇 번 해봤지만 혼자 판단하기 어려워요.",
    shortLabel: "조금 경험함",
  },
  {
    id: "experienced",
    label: "기본적인 것은 할 수 있지만 더 배우고 싶어요.",
    shortLabel: "기본 경험 있음",
  },
];

function getOptionById(options, optionId) {
  return options.find(
    (option) => option.id === optionId,
  );
}

export function getSituationOption(optionId) {
  return getOptionById(
    SITUATION_OPTIONS,
    optionId,
  );
}

export function getInterestOption(optionId) {
  return getOptionById(
    INTEREST_OPTIONS,
    optionId,
  );
}

export function getExperienceOption(optionId) {
  return getOptionById(
    EXPERIENCE_OPTIONS,
    optionId,
  );
}