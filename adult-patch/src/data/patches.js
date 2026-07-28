export const patches = [
  {
    id: "laundry-basics",
    category: "자취생활",
    level: "첫 자취 기본편",
    title: "흰옷과 검은옷, 정말 같이 빨아도 될까?",
    description:
      "세탁물을 색상에 따라 구분해야 하는 이유를 알아봅니다.",
    estimatedMinutes: 3,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "이번 주말에 입을 흰 셔츠와 새 검은 티셔츠가 세탁 바구니에 있습니다. 세탁기는 한 번만 돌리고 싶은 상황입니다.",
    question:
      "이럴 때 어떻게 세탁하는 것이 좋을까요?",
    choices: [
      {
        id: "wash-together",
        label: "흰옷과 검은옷을 모두 함께 세탁한다.",
        resultTitle: "색이 옮을 가능성이 있어요.",
        feedback:
          "새 검은색 옷에서는 염료가 빠질 수 있습니다. 흰 셔츠와 함께 세탁하면 흰옷의 색이 변할 가능성이 있습니다.",
        recommended: false,
      },
      {
        id: "wash-separately",
        label: "흰옷과 검은옷을 나누어 세탁한다.",
        resultTitle: "안전하게 세탁할 수 있는 선택이에요.",
        feedback:
          "흰옷과 진한 색상의 옷을 나누어 세탁하면 이염 위험을 줄일 수 있습니다. 특히 새 옷은 처음 몇 번 따로 세탁하는 편이 안전합니다.",
        recommended: true,
      },
      {
        id: "turn-inside-out",
        label: "검은옷을 뒤집은 뒤 흰옷과 함께 세탁한다.",
        resultTitle: "마찰은 줄지만 이염은 막기 어려워요.",
        feedback:
          "옷을 뒤집으면 표면의 마찰과 손상은 줄일 수 있지만, 물에 빠지는 염료까지 막을 수는 없습니다.",
        recommended: false,
      },
    ],
    checklist: [
      "새 검은옷은 처음 몇 번 따로 세탁하기",
      "흰옷과 진한 색상의 옷 구분하기",
      "세탁 전 주머니와 세탁 라벨 확인하기",
    ],
    mission:
      "세탁 바구니를 흰옷, 색상 옷, 수건으로 나누어보세요.",
  },
];

export function getPatchById(patchId) {
  return patches.find(
    (patch) => patch.id === patchId,
  );
}