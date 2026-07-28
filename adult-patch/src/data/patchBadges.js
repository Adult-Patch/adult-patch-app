export const PATCH_BADGES = {
  "laundry-basics": {
    id: "laundry-basics",
    symbol: "세",
    name: "세탁 분리 패치",
    description:
      "흰옷과 진한 색상의 옷을 구분할 수 있어요.",
    tone: "blue",
  },

  "microwave-container": {
    id: "microwave-container",
    symbol: "용",
    name: "용기 확인 패치",
    description:
      "전자레인지에 사용할 수 있는 용기를 확인할 수 있어요.",
    tone: "sky",
  },

  "move-in-report": {
    id: "move-in-report",
    symbol: "이",
    name: "이사 준비 패치",
    description:
      "이사 후 필요한 주소 관련 절차를 확인할 수 있어요.",
    tone: "purple",
  },

  "rental-contract-check": {
    id: "rental-contract-check",
    symbol: "계",
    name: "계약 확인 패치",
    description:
      "계약금을 보내기 전에 확인할 항목을 알고 있어요.",
    tone: "indigo",
  },

  "payslip-basics": {
    id: "payslip-basics",
    symbol: "급",
    name: "월급 확인 패치",
    description:
      "월급명세서의 지급 항목과 공제 항목을 구분할 수 있어요.",
    tone: "teal",
  },

  "card-payment-date": {
    id: "card-payment-date",
    symbol: "카",
    name: "카드 관리 패치",
    description:
      "카드 이용기간과 결제 예정 금액을 확인할 수 있어요.",
    tone: "green",
  },

  "work-question": {
    id: "work-question",
    symbol: "문",
    name: "질문 정리 패치",
    description:
      "업무에서 확인할 내용을 정리해 질문할 수 있어요.",
    tone: "slate",
  },

  "mistake-report": {
    id: "mistake-report",
    symbol: "보",
    name: "실수 보고 패치",
    description:
      "업무 오류와 수정 계획을 함께 전달할 수 있어요.",
    tone: "navy",
  },

  "suspicious-message": {
    id: "suspicious-message",
    symbol: "안",
    name: "문자 확인 패치",
    description:
      "의심스러운 링크를 공식 채널과 분리해 확인할 수 있어요.",
    tone: "violet",
  },

  "lost-card": {
    id: "lost-card",
    symbol: "정",
    name: "분실 대응 패치",
    description:
      "카드 분실 시 사용 정지부터 처리할 수 있어요.",
    tone: "rose",
  },
};

const DEFAULT_BADGE = {
  symbol: "어",
  name: "어른 능력 패치",
  description:
    "새로운 생활 능력을 익혔어요.",
  tone: "blue",
};

export function getPatchBadge(patchId) {
  return (
    PATCH_BADGES[patchId] ?? {
      ...DEFAULT_BADGE,
      id: patchId,
    }
  );
}