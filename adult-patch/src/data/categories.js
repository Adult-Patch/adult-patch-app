export const PATCH_CATEGORIES = [
  {
    id: "all",
    label: "전체",
    description:
      "어른패치의 모든 생활 콘텐츠",
  },
  {
    id: "daily-life",
    label: "자취생활",
    description:
      "세탁, 청소, 음식 보관 등 혼자 생활하는 데 필요한 내용",
  },
  {
    id: "housing-contract",
    label: "주거·계약",
    description:
      "집을 알아보고 계약하고 거주할 때 필요한 내용",
  },
  {
    id: "finance",
    label: "금융생활",
    description:
      "월급, 카드, 저축 등 돈을 관리할 때 필요한 내용",
  },
  {
    id: "work",
    label: "직장생활",
    description:
      "질문, 보고, 일정 조율 등 첫 직장에서 필요한 내용",
  },
  {
    id: "safety",
    label: "생활안전",
    description:
      "분실이나 의심 문자 등 갑작스러운 상황에 대응하는 내용",
  },
];

export function getCategoryById(categoryId) {
  return PATCH_CATEGORIES.find(
    (category) => category.id === categoryId,
  );
}