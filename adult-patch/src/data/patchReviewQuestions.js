const patchReviewQuestions = {
  "laundry-basics": {
    question:
      "새 검은색 옷과 흰 셔츠를 세탁해야 할 때 가장 안전한 방법은 무엇일까요?",
    choices: [
      {
        id: "wash-all",
        label:
          "세탁 횟수를 줄이기 위해 모두 함께 세탁한다.",
        correct: false,
        feedback:
          "새 검은색 옷에서는 염료가 빠질 수 있어 흰옷과 함께 세탁하면 이염될 가능성이 있습니다.",
      },
      {
        id: "separate-colors",
        label:
          "흰옷과 진한 색상의 옷을 나누어 세탁한다.",
        correct: true,
        feedback:
          "흰옷과 진한 색상의 옷을 구분하면 이염 위험을 줄일 수 있습니다.",
      },
      {
        id: "short-cycle",
        label:
          "짧은 세탁 코스를 사용해 모두 함께 세탁한다.",
        correct: false,
        feedback:
          "세탁 시간이 짧더라도 옷에서 빠진 염료가 다른 옷으로 옮을 수 있습니다.",
      },
    ],
  },

  "microwave-container": {
    question:
      "전자레인지 사용 가능 표시가 없는 플라스틱 용기는 어떻게 해야 할까요?",
    choices: [
      {
        id: "heat-short",
        label:
          "짧은 시간만 데우면 괜찮으므로 그대로 사용한다.",
        correct: false,
        feedback:
          "사용 시간이 짧아도 용기의 재질과 내열성을 확인하지 않았다면 사용하지 않는 편이 안전합니다.",
      },
      {
        id: "move-safe-container",
        label:
          "전자레인지 사용 표시가 있는 용기로 옮긴다.",
        correct: true,
        feedback:
          "전자레인지용 표시가 있는 유리 또는 전용 용기로 옮기는 것이 안전합니다.",
      },
      {
        id: "remove-lid-only",
        label:
          "뚜껑만 제거하고 기존 용기를 사용한다.",
        correct: false,
        feedback:
          "뚜껑을 제거해도 용기 자체가 전자레인지에 적합한 재질인지는 확인되지 않습니다.",
      },
    ],
  },

  "move-in-report": {
    question:
      "새로운 집으로 이사한 뒤 주소와 관련해 먼저 확인할 것은 무엇일까요?",
    choices: [
      {
        id: "check-report",
        label:
          "전입신고 방법과 필요한 준비물을 확인한다.",
        correct: true,
        feedback:
          "이사 후에는 전입신고 가능 시기와 처리 방법, 필요한 서류를 확인해야 합니다.",
      },
      {
        id: "contact-landlord",
        label:
          "집주인에게 입주 사실만 알리면 된다.",
        correct: false,
        feedback:
          "집주인에게 알리는 것과 주소 관련 행정 절차를 처리하는 것은 서로 다른 일입니다.",
      },
      {
        id: "wait-contract-end",
        label:
          "계약이 끝날 때까지 별도의 주소 변경을 하지 않는다.",
        correct: false,
        feedback:
          "실제 거주지와 등록 주소가 다르면 우편물과 행정 처리에서 불편이 생길 수 있습니다.",
      },
    ],
  },

  "rental-contract-check": {
    question:
      "집 계약금을 송금하기 전에 확인해야 하는 항목은 무엇일까요?",
    choices: [
      {
        id: "account-only",
        label:
          "중개인이 전달한 계좌번호만 확인한다.",
        correct: false,
        feedback:
          "계좌번호뿐 아니라 계약 상대방과 소유 관계, 계좌 명의를 함께 확인해야 합니다.",
      },
      {
        id: "verify-contract",
        label:
          "소유자, 계약 조건, 송금 계좌 명의를 확인한다.",
        correct: true,
        feedback:
          "계약 상대방과 집의 소유 관계, 계약 조건, 송금 계좌가 일치하는지 확인해야 합니다.",
      },
      {
        id: "send-first",
        label:
          "다른 사람이 계약하기 전에 우선 계약금부터 보낸다.",
        correct: false,
        feedback:
          "서두르더라도 계약의 기본 정보가 확인되지 않은 상태에서 먼저 송금하는 것은 위험합니다.",
      },
    ],
  },

  "payslip-basics": {
    question:
      "월급이 예상보다 적게 입금됐다면 가장 먼저 확인할 것은 무엇일까요?",
    choices: [
      {
        id: "bank-balance",
        label:
          "통장에 입금된 최종 금액만 확인한다.",
        correct: false,
        feedback:
          "입금액만으로는 월급이 어떻게 계산됐는지 알기 어렵습니다.",
      },
      {
        id: "payslip-items",
        label:
          "월급명세서의 지급 항목과 공제 항목을 확인한다.",
        correct: true,
        feedback:
          "기본급과 수당 등 지급 항목, 보험료와 세금 등 공제 항목을 나누어 확인해야 합니다.",
      },
      {
        id: "wait-next-month",
        label:
          "다음 달 월급까지 기다린 뒤 비교한다.",
        correct: false,
        feedback:
          "월급명세서에서 모르는 항목이 있다면 현재 명세서를 기준으로 바로 확인하는 편이 좋습니다.",
      },
    ],
  },

  "card-payment-date": {
    question:
      "카드 지출 흐름을 관리하려면 결제일과 함께 무엇을 확인해야 할까요?",
    choices: [
      {
        id: "card-limit",
        label:
          "카드의 전체 이용 한도만 확인한다.",
        correct: false,
        feedback:
          "이용 한도만으로는 이번 달과 다음 달에 청구될 금액을 파악하기 어렵습니다.",
      },
      {
        id: "billing-period",
        label:
          "결제일별 이용기간과 다음 결제 예정 금액을 확인한다.",
        correct: true,
        feedback:
          "결제일, 이용기간과 다음 결제 예정 금액을 함께 확인하면 지출 계획을 세우기 쉬워집니다.",
      },
      {
        id: "payment-message",
        label:
          "결제 안내 문자가 올 때까지 기다린다.",
        correct: false,
        feedback:
          "카드사 앱이나 이용대금명세서에서 청구 예정 금액을 미리 확인할 수 있습니다.",
      },
    ],
  },

  "work-question": {
    question:
      "업무 지시가 명확하지 않을 때 가장 적절한 질문 방법은 무엇일까요?",
    choices: [
      {
        id: "guess-first",
        label:
          "일단 예상한 방식으로 작업한 뒤 결과를 보여준다.",
        correct: false,
        feedback:
          "형식이나 일정이 다르면 작업을 다시 해야 할 수 있으므로 시작 전에 핵심 조건을 확인하는 편이 좋습니다.",
      },
      {
        id: "organize-and-ask",
        label:
          "이해한 내용과 확인할 내용을 구분해 질문한다.",
        correct: true,
        feedback:
          "현재 이해한 내용과 결과물 형식, 제출 시점 등 확인할 내용을 구분하면 구체적인 답변을 받을 수 있습니다.",
      },
      {
        id: "ask-all-again",
        label:
          "처음부터 모든 내용을 다시 설명해달라고 한다.",
        correct: false,
        feedback:
          "전체 설명을 반복해서 요청하기보다 이해한 부분과 헷갈리는 지점을 구체적으로 전달하는 편이 좋습니다.",
      },
    ],
  },

  "mistake-report": {
    question:
      "이미 전달한 자료에서 오류를 발견했다면 어떻게 보고해야 할까요?",
    choices: [
      {
        id: "wait",
        label:
          "상대방이 오류를 발견할 때까지 기다린다.",
        correct: false,
        feedback:
          "오류를 확인했다면 문제가 커지기 전에 먼저 공유해야 합니다.",
      },
      {
        id: "report-plan",
        label:
          "오류 내용, 영향 범위, 수정 계획을 함께 전달한다.",
        correct: true,
        feedback:
          "무엇이 잘못됐는지와 함께 영향 범위와 수정 방법을 전달하면 빠르게 대응할 수 있습니다.",
      },
      {
        id: "replace-file",
        label:
          "아무 설명 없이 수정된 파일로 교체한다.",
        correct: false,
        feedback:
          "이미 기존 자료를 확인한 사람이 있을 수 있으므로 수정 사실을 별도로 알려야 합니다.",
      },
    ],
  },

  "suspicious-message": {
    question:
      "출처가 불분명한 택배 문자에 링크가 포함되어 있다면 어떻게 해야 할까요?",
    choices: [
      {
        id: "open-link",
        label:
          "배송 정보를 확인하기 위해 문자 속 링크를 누른다.",
        correct: false,
        feedback:
          "출처가 불분명한 링크는 열지 않는 편이 안전합니다.",
      },
      {
        id: "official-channel",
        label:
          "링크를 누르지 않고 주문 내역과 공식 채널에서 확인한다.",
        correct: true,
        feedback:
          "문자와 분리된 공식 쇼핑 앱이나 택배사 채널을 통해 확인하는 것이 좋습니다.",
      },
      {
        id: "reply-message",
        label:
          "문자를 보낸 번호로 주문 정보를 물어본다.",
        correct: false,
        feedback:
          "의심스러운 발신자와 직접 대화하기보다 공식 고객센터나 앱을 이용해야 합니다.",
      },
    ],
  },

  "lost-card": {
    question:
      "카드 분실 가능성을 확인했다면 가장 먼저 해야 할 행동은 무엇일까요?",
    choices: [
      {
        id: "search-first",
        label:
          "주변을 충분히 찾아본 뒤 분실 신고한다.",
        correct: false,
        feedback:
          "카드를 찾는 동안 다른 사람이 사용할 수 있으므로 사용 정지를 먼저 처리해야 합니다.",
      },
      {
        id: "suspend-first",
        label:
          "카드 사용을 정지하고 최근 결제 내역을 확인한다.",
        correct: true,
        feedback:
          "추가 결제를 막기 위해 카드를 먼저 정지한 뒤 최근 승인 내역을 확인해야 합니다.",
      },
      {
        id: "wait-day",
        label:
          "하루 정도 기다린 뒤 찾지 못하면 신고한다.",
        correct: false,
        feedback:
          "분실 가능성을 확인한 시점에 바로 대응해야 추가 피해를 줄일 수 있습니다.",
      },
    ],
  },
};

export function getPatchReviewQuestion(patchId) {
  return patchReviewQuestions[patchId] ?? null;
}