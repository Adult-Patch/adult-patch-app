import {
  getExperienceOption,
  getInterestOption,
} from "./onboardingOptions";

export const patches = [
  {
    id: "laundry-basics",
    categoryId: "daily-life",
    category: "자취생활",
    difficulty: "beginner",
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
        label:
          "흰옷과 검은옷을 모두 함께 세탁한다.",
        resultTitle:
          "색이 옮을 가능성이 있어요.",
        feedback:
          "새 검은색 옷에서는 염료가 빠질 수 있습니다. 흰 셔츠와 함께 세탁하면 흰옷의 색이 변할 가능성이 있습니다.",
        recommended: false,
      },
      {
        id: "wash-separately",
        label:
          "흰옷과 검은옷을 나누어 세탁한다.",
        resultTitle:
          "안전하게 세탁할 수 있는 선택이에요.",
        feedback:
          "흰옷과 진한 색상의 옷을 나누어 세탁하면 이염 위험을 줄일 수 있습니다. 특히 새 옷은 처음 몇 번 따로 세탁하는 편이 안전합니다.",
        recommended: true,
      },
      {
        id: "turn-inside-out",
        label:
          "검은옷을 뒤집은 뒤 흰옷과 함께 세탁한다.",
        resultTitle:
          "마찰은 줄지만 이염은 막기 어려워요.",
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
  {
    id: "microwave-container",
    categoryId: "daily-life",
    category: "자취생활",
    difficulty: "intermediate",
    level: "자취생활 실전편",
    title: "이 용기, 전자레인지에 넣어도 될까?",
    description:
      "전자레인지에 사용할 수 있는 용기를 구별하는 기준을 익힙니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "배달 음식을 보관했던 플라스틱 용기째로 데우려고 합니다. 용기에는 전자레인지 사용 가능 표시가 보이지 않습니다.",
    question:
      "가장 안전한 방법은 무엇일까요?",
    choices: [
      {
        id: "heat-directly",
        label:
          "짧은 시간이므로 그대로 데운다.",
        resultTitle:
          "사용 가능 여부를 먼저 확인해야 해요.",
        feedback:
          "플라스틱 용기마다 사용 가능한 온도와 용도가 다릅니다. 표시가 없다면 전자레인지용 용기로 옮기는 편이 안전합니다.",
        recommended: false,
      },
      {
        id: "move-container",
        label:
          "전자레인지 사용 표시가 있는 용기로 옮긴다.",
        resultTitle:
          "사용 가능한 용기를 확인한 선택이에요.",
        feedback:
          "전자레인지 사용 가능 표시가 있는 유리나 전용 용기로 옮기면 용기 변형과 불필요한 위험을 줄일 수 있습니다.",
        recommended: true,
      },
      {
        id: "remove-lid",
        label:
          "뚜껑만 제거한 뒤 그대로 데운다.",
        resultTitle:
          "뚜껑을 열어도 용기 재질은 그대로예요.",
        feedback:
          "뚜껑을 여는 것은 내부 압력을 줄이는 데 도움이 되지만, 용기 자체가 전자레인지용인지 확인하는 과정은 별도로 필요합니다.",
        recommended: false,
      },
    ],
    checklist: [
      "전자레인지 사용 가능 표시 확인하기",
      "금속 장식이나 알루미늄이 있는 용기는 피하기",
      "밀폐된 뚜껑은 완전히 닫지 않기",
    ],
    mission:
      "집에 있는 보관 용기에서 전자레인지 사용 가능 표시를 찾아보세요.",
  },
  {
    id: "move-in-report",
    categoryId: "housing-contract",
    category: "주거·계약",
    difficulty: "beginner",
    level: "첫 독립 기본편",
    title: "이사 후 가장 먼저 처리할 것은 무엇일까?",
    description:
      "이사 후 주소 변경과 관련해 확인할 기본 절차를 알아봅니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "월세 계약을 마치고 새로운 집으로 이사했습니다. 짐 정리는 끝났지만 주소와 관련된 행정 절차는 아직 처리하지 않았습니다.",
    question:
      "다음 행동으로 가장 적절한 것은 무엇일까요?",
    choices: [
      {
        id: "wait-until-later",
        label:
          "계약이 끝날 때까지 별도로 처리하지 않는다.",
        resultTitle:
          "이사 직후 확인할 절차가 있어요.",
        feedback:
          "실제 거주지와 등록된 주소가 달라지면 우편물과 행정 처리에서 불편이 생길 수 있습니다.",
        recommended: false,
      },
      {
        id: "check-move-in-process",
        label:
          "전입신고 방법과 필요한 준비물을 확인한다.",
        resultTitle:
          "이사 직후 필요한 절차를 확인했어요.",
        feedback:
          "전입신고 가능 시기와 방법을 확인하고 계약서 등 필요한 자료를 준비하는 것이 좋습니다.",
        recommended: true,
      },
      {
        id: "tell-landlord-only",
        label:
          "집주인에게 이사했다고 알리는 것으로 끝낸다.",
        resultTitle:
          "집주인 연락과 행정 처리는 달라요.",
        feedback:
          "집주인에게 입주 사실을 알리는 것과 주소 관련 행정 절차를 처리하는 것은 서로 다른 일입니다.",
        recommended: false,
      },
    ],
    checklist: [
      "전입신고 처리 방법 확인하기",
      "임대차계약서와 신분증 준비하기",
      "주소를 사용하는 주요 서비스 변경하기",
    ],
    mission:
      "현재 등록된 주소와 실제 거주지가 일치하는지 확인해보세요.",
  },
  {
    id: "rental-contract-check",
    categoryId: "housing-contract",
    category: "주거·계약",
    difficulty: "intermediate",
    level: "주거계약 실전편",
    title: "계약금을 보내기 전에 무엇을 확인해야 할까?",
    description:
      "집 계약 전 상대방과 계약 조건을 확인하는 순서를 익힙니다.",
    estimatedMinutes: 5,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "마음에 드는 집을 발견했습니다. 중개인은 다른 사람이 계약할 수 있으니 계약금을 먼저 보내는 것이 좋다고 말합니다.",
    question:
      "계약금을 보내기 전에 어떤 행동을 해야 할까요?",
    choices: [
      {
        id: "send-immediately",
        label:
          "기회를 놓치지 않도록 바로 송금한다.",
        resultTitle:
          "송금 전에 확인할 정보가 있어요.",
        feedback:
          "서두르더라도 계약 상대방, 계좌 명의, 집의 기본 정보와 계약 조건을 먼저 확인해야 합니다.",
        recommended: false,
      },
      {
        id: "verify-first",
        label:
          "소유자와 계약 조건, 송금 계좌를 먼저 확인한다.",
        resultTitle:
          "계약의 기본 정보를 먼저 확인했어요.",
        feedback:
          "계약 상대방과 집의 소유 관계, 계약 조건, 송금 계좌가 일치하는지 확인한 뒤 결정하는 편이 안전합니다.",
        recommended: true,
      },
      {
        id: "trust-message",
        label:
          "메신저로 받은 계좌이므로 그대로 송금한다.",
        resultTitle:
          "메시지만으로는 확인이 부족해요.",
        feedback:
          "메신저에 적힌 계좌만 보고 송금하지 말고 계약 상대방 및 계좌 명의를 별도로 확인해야 합니다.",
        recommended: false,
      },
    ],
    checklist: [
      "계약 상대방과 소유자 관계 확인하기",
      "계약금과 반환 조건 확인하기",
      "송금 계좌 명의 확인하기",
    ],
    mission:
      "집 계약 전 확인해야 할 항목을 메모장에 세 가지 이상 정리해보세요.",
  },
  {
    id: "payslip-basics",
    categoryId: "finance",
    category: "금융생활",
    difficulty: "beginner",
    level: "첫 월급 기본편",
    title: "월급이 예상보다 적게 들어온 이유는 무엇일까?",
    description:
      "월급명세서에서 지급액과 공제액을 구분해봅니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "근로계약서에서 본 월급보다 실제 통장에 입금된 금액이 적습니다. 월급명세서에는 여러 지급 항목과 공제 항목이 적혀 있습니다.",
    question:
      "가장 먼저 무엇을 확인해야 할까요?",
    choices: [
      {
        id: "check-bank-only",
        label:
          "통장 입금 금액만 다시 확인한다.",
        resultTitle:
          "입금액만으로는 이유를 알기 어려워요.",
        feedback:
          "실제 입금액은 지급액에서 공제액이 빠진 결과이므로 월급명세서의 세부 항목을 함께 확인해야 합니다.",
        recommended: false,
      },
      {
        id: "check-payslip",
        label:
          "월급명세서의 지급액과 공제액을 나누어 확인한다.",
        resultTitle:
          "월급이 계산된 구조를 확인했어요.",
        feedback:
          "기본급과 수당 등 지급 항목, 보험료와 세금 등 공제 항목을 나누어 보면 실제 입금액이 계산된 이유를 확인할 수 있습니다.",
        recommended: true,
      },
      {
        id: "ignore-difference",
        label:
          "처음에는 원래 다른 것으로 생각하고 넘어간다.",
        resultTitle:
          "모르는 항목은 확인하는 편이 좋아요.",
        feedback:
          "항목의 의미를 모른다면 회사 담당자에게 월급명세서 기준으로 문의하는 것이 좋습니다.",
        recommended: false,
      },
    ],
    checklist: [
      "지급 항목과 공제 항목 구분하기",
      "근로계약서의 급여 조건과 비교하기",
      "모르는 항목은 명세서 기준으로 문의하기",
    ],
    mission:
      "최근 월급명세서에서 지급 항목과 공제 항목을 각각 하나씩 찾아보세요.",
  },
  {
    id: "card-payment-date",
    categoryId: "finance",
    category: "금융생활",
    difficulty: "intermediate",
    level: "카드관리 실전편",
    title: "카드 결제일만 알면 충분할까?",
    description:
      "카드 사용 금액이 어느 기간에 청구되는지 확인하는 방법을 익힙니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "이번 달 카드값이 생각보다 많이 청구되었습니다. 결제일은 알고 있지만 어떤 기간의 사용 금액이 포함됐는지는 모르고 있습니다.",
    question:
      "다음 달 지출을 관리하려면 무엇을 확인해야 할까요?",
    choices: [
      {
        id: "payment-date-only",
        label:
          "매달 돈이 빠지는 결제일만 기억한다.",
        resultTitle:
          "청구되는 사용 기간도 확인해야 해요.",
        feedback:
          "결제일뿐 아니라 해당 결제일에 어떤 기간의 이용 금액이 청구되는지 함께 확인해야 지출 흐름을 이해할 수 있습니다.",
        recommended: false,
      },
      {
        id: "check-billing-period",
        label:
          "결제일과 이용기간, 다음 청구 예정 금액을 확인한다.",
        resultTitle:
          "카드 지출 흐름을 함께 확인했어요.",
        feedback:
          "결제일, 이용기간과 다음 청구 예정 금액을 함께 보면 월별 지출 계획을 세우기 쉬워집니다.",
        recommended: true,
      },
      {
        id: "wait-for-message",
        label:
          "결제 안내 문자가 올 때까지 기다린다.",
        resultTitle:
          "청구 전에 미리 확인할 수 있어요.",
        feedback:
          "카드사 앱이나 이용대금명세서에서 다음 결제 예정 금액을 미리 확인하는 편이 좋습니다.",
        recommended: false,
      },
    ],
    checklist: [
      "카드 결제일 확인하기",
      "결제일별 이용기간 확인하기",
      "다음 결제 예정 금액 미리 확인하기",
    ],
    mission:
      "사용 중인 카드의 결제일과 다음 결제 예정 금액을 확인해보세요.",
  },
  {
    id: "work-question",
    categoryId: "work",
    category: "직장생활",
    difficulty: "beginner",
    level: "첫 직장 기본편",
    title: "업무 지시를 이해하지 못했을 때 어떻게 질문할까?",
    description:
      "모르는 내용을 정리해서 질문하는 기본 방법을 익힙니다.",
    estimatedMinutes: 3,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "상사에게 새로운 업무를 전달받았지만 결과물의 형식과 제출 시점이 명확하지 않습니다.",
    question:
      "업무를 시작하기 전에 어떻게 행동하는 것이 좋을까요?",
    choices: [
      {
        id: "guess-task",
        label:
          "대략 이해한 내용대로 먼저 작업한다.",
        resultTitle:
          "기준이 다르면 다시 작업할 수 있어요.",
        feedback:
          "결과물의 형식과 일정이 명확하지 않다면 작업 전에 핵심 조건을 확인하는 편이 효율적입니다.",
        recommended: false,
      },
      {
        id: "organize-question",
        label:
          "이해한 내용을 정리한 뒤 형식과 일정을 질문한다.",
        resultTitle:
          "확인할 내용을 정리해서 질문했어요.",
        feedback:
          "현재 이해한 내용과 확인이 필요한 부분을 나누어 질문하면 상대방도 구체적으로 답하기 쉽습니다.",
        recommended: true,
      },
      {
        id: "ask-everything-again",
        label:
          "처음부터 전부 다시 설명해달라고 요청한다.",
        resultTitle:
          "모르는 부분을 구체적으로 말하는 편이 좋아요.",
        feedback:
          "전체 설명을 반복해서 요청하기보다 이해한 내용과 헷갈리는 지점을 구분해서 전달하는 편이 좋습니다.",
        recommended: false,
      },
    ],
    checklist: [
      "현재 이해한 업무 내용 정리하기",
      "결과물의 형식 확인하기",
      "제출 시점과 우선순위 확인하기",
    ],
    mission:
      "최근 받은 업무나 과제에서 확인이 필요한 조건을 세 가지로 정리해보세요.",
  },
  {
    id: "mistake-report",
    categoryId: "work",
    category: "직장생활",
    difficulty: "intermediate",
    level: "직장생활 실전편",
    title: "업무 실수를 발견했다면 언제 보고해야 할까?",
    description:
      "실수를 숨기지 않고 상황과 대응안을 함께 공유하는 방법을 익힙니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "이미 전달한 자료에서 잘못된 숫자를 발견했습니다. 아직 상대방에게 별도 연락은 오지 않았습니다.",
    question:
      "가장 적절한 대응은 무엇일까요?",
    choices: [
      {
        id: "wait-feedback",
        label:
          "상대방이 오류를 발견할 때까지 기다린다.",
        resultTitle:
          "문제가 커지기 전에 공유하는 편이 좋아요.",
        feedback:
          "오류를 확인했다면 영향을 받는 범위와 수정 방법을 정리해 가능한 한 빠르게 공유하는 것이 좋습니다.",
        recommended: false,
      },
      {
        id: "report-with-plan",
        label:
          "오류 내용과 영향, 수정 계획을 정리해 바로 공유한다.",
        resultTitle:
          "문제와 대응안을 함께 전달했어요.",
        feedback:
          "무엇이 잘못됐는지, 어디까지 영향을 주는지, 어떻게 수정할지를 함께 전달하면 빠르게 대응할 수 있습니다.",
        recommended: true,
      },
      {
        id: "replace-secretly",
        label:
          "아무 말 없이 파일만 수정해서 다시 올린다.",
        resultTitle:
          "수정 사실을 알리지 않으면 혼선이 생길 수 있어요.",
        feedback:
          "이미 자료를 본 사람이 있을 수 있으므로 파일만 교체하기보다 오류와 수정 사실을 함께 알려야 합니다.",
        recommended: false,
      },
    ],
    checklist: [
      "발생한 오류를 한 문장으로 정리하기",
      "영향을 받는 범위 확인하기",
      "수정 방법과 예상 시간을 함께 공유하기",
    ],
    mission:
      "실수가 발생했을 때 사용할 보고 문장을 한 번 작성해보세요.",
  },
  {
    id: "suspicious-message",
    categoryId: "safety",
    category: "생활안전",
    difficulty: "beginner",
    level: "생활안전 기본편",
    title: "택배 문자의 링크를 바로 눌러도 될까?",
    description:
      "의심스러운 문자에서 링크를 누르기 전에 확인할 내용을 익힙니다.",
    estimatedMinutes: 3,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "주문한 기억이 없는 택배가 주소 오류로 반송될 예정이라며 링크를 누르라는 문자를 받았습니다.",
    question:
      "가장 먼저 어떻게 확인해야 할까요?",
    choices: [
      {
        id: "open-link",
        label:
          "배송 상태를 확인하기 위해 링크를 누른다.",
        resultTitle:
          "문자 속 링크는 바로 누르지 않는 편이 좋아요.",
        feedback:
          "출처가 불분명한 링크는 열지 말고 실제 주문 내역이나 공식 택배사 채널을 통해 별도로 확인해야 합니다.",
        recommended: false,
      },
      {
        id: "verify-separately",
        label:
          "링크를 누르지 않고 주문 내역과 공식 채널을 확인한다.",
        resultTitle:
          "문자와 분리된 경로로 확인했어요.",
        feedback:
          "문자에 포함된 링크 대신 평소 사용하던 쇼핑 앱이나 공식 택배사 채널에서 배송 정보를 확인하는 것이 좋습니다.",
        recommended: true,
      },
      {
        id: "reply-message",
        label:
          "문자를 보낸 번호로 주문 정보를 물어본다.",
        resultTitle:
          "문자를 보낸 상대와 직접 대화하지 않는 편이 좋아요.",
        feedback:
          "의심스러운 발신자에게 답장하기보다 공식 주문 내역과 고객센터를 통해 확인하는 편이 안전합니다.",
        recommended: false,
      },
    ],
    checklist: [
      "출처가 불분명한 링크 누르지 않기",
      "실제 주문 내역 별도로 확인하기",
      "공식 앱이나 고객센터 이용하기",
    ],
    mission:
      "휴대전화에서 최근 받은 의심스러운 문자가 있는지 확인해보세요.",
  },
  {
    id: "lost-card",
    categoryId: "safety",
    category: "생활안전",
    difficulty: "intermediate",
    level: "분실대응 실전편",
    title: "카드를 잃어버렸다면 무엇부터 해야 할까?",
    description:
      "카드 분실을 확인한 직후의 대응 순서를 익힙니다.",
    estimatedMinutes: 4,
    progress: {
      current: 1,
      total: 3,
    },
    situation:
      "지갑을 확인했지만 사용하던 카드가 보이지 않습니다. 마지막으로 사용한 장소도 정확히 기억나지 않습니다.",
    question:
      "가장 먼저 해야 할 행동은 무엇일까요?",
    choices: [
      {
        id: "search-only",
        label:
          "우선 주변을 충분히 찾아본 뒤 신고한다.",
        resultTitle:
          "찾는 동안 카드가 사용될 가능성이 있어요.",
        feedback:
          "카드를 찾는 것과 별개로 카드사 앱이나 고객센터를 통해 사용을 정지하거나 분실 신고하는 것이 우선입니다.",
        recommended: false,
      },
      {
        id: "suspend-card",
        label:
          "카드 사용을 정지하고 최근 결제 내역을 확인한다.",
        resultTitle:
          "추가 사용을 막는 행동부터 했어요.",
        feedback:
          "카드 사용을 먼저 정지한 뒤 최근 승인 내역을 확인하고 필요한 경우 카드사에 추가 조치를 문의하는 것이 좋습니다.",
        recommended: true,
      },
      {
        id: "wait-one-day",
        label:
          "다음 날까지 기다린 뒤 카드가 없으면 신고한다.",
        resultTitle:
          "분실을 확인했다면 바로 대응하는 편이 좋아요.",
        feedback:
          "분실 가능성을 확인한 시점에 바로 사용을 정지해야 추가 결제를 예방할 수 있습니다.",
        recommended: false,
      },
    ],
    checklist: [
      "카드 사용 정지 또는 분실 신고하기",
      "최근 승인 내역 확인하기",
      "필요한 경우 재발급 신청하기",
    ],
    mission:
      "사용 중인 카드사의 분실 신고 메뉴 위치를 확인해보세요.",
  },
];

const SITUATION_CATEGORY_PRIORITY = {
  "living-alone": [
    "daily-life",
    "housing-contract",
    "safety",
  ],
  "first-job": [
    "work",
    "finance",
    "safety",
  ],
  "housing-finance": [
    "housing-contract",
    "finance",
    "safety",
  ],
  "general-life": [
    "daily-life",
    "safety",
    "finance",
    "work",
  ],
};

const DEFAULT_CATEGORY_PRIORITY = [
  "daily-life",
  "housing-contract",
  "finance",
  "work",
  "safety",
];

const EXPERIENCE_DIFFICULTY = {
  beginner: "beginner",
  "some-experience": "intermediate",
  experienced: "intermediate",
};

function removeDuplicates(items) {
  return [...new Set(items)];
}

function getRecommendationReason(
  patch,
  appState,
) {
  const selectedInterest =
    appState.selectedInterests.includes(
      patch.categoryId,
    );

  const interestOption = getInterestOption(
    patch.categoryId,
  );

  const experienceOption = getExperienceOption(
    appState.experienceLevel,
  );

  if (selectedInterest && experienceOption) {
    return `${interestOption?.label ?? patch.category}에 관심이 있고, ${experienceOption.shortLabel} 단계에 맞춘 패치예요.`;
  }

  if (selectedInterest) {
    return `${interestOption?.label ?? patch.category}을 어려운 분야로 선택해 추천했어요.`;
  }

  return "현재 생활 상황에서 먼저 알아두면 좋은 내용이에요.";
}

export function getPatchById(patchId) {
  return patches.find(
    (patch) => patch.id === patchId,
  );
}

export function getRecommendedPatches(
  appState,
  limit = 2,
) {
  const completedPatchIds =
    Array.isArray(appState.completedPatchIds)
      ? appState.completedPatchIds
      : [];

  const completedPatchIdSet = new Set(
    completedPatchIds,
  );

  const selectedInterests =
    Array.isArray(appState.selectedInterests)
      ? appState.selectedInterests
      : [];

  const situationPriority =
    SITUATION_CATEGORY_PRIORITY[
      appState.selectedSituation
    ] ?? [];

  const categoryPriority = removeDuplicates([
    ...selectedInterests,
    ...situationPriority,
    ...DEFAULT_CATEGORY_PRIORITY,
  ]);

  const preferredDifficulty =
    EXPERIENCE_DIFFICULTY[
      appState.experienceLevel
    ] ?? "beginner";

  const recommendations = [];

  categoryPriority.forEach((categoryId) => {
    if (recommendations.length >= limit) {
      return;
    }

    const candidates = patches
      .filter(
        (patch) =>
          patch.categoryId === categoryId,
      )
      .sort((firstPatch, secondPatch) => {
        const firstCompleted =
          completedPatchIdSet.has(firstPatch.id);

        const secondCompleted =
          completedPatchIdSet.has(secondPatch.id);

        if (firstCompleted !== secondCompleted) {
          return firstCompleted ? 1 : -1;
        }

        const firstDifficultyMatch =
          firstPatch.difficulty ===
          preferredDifficulty;

        const secondDifficultyMatch =
          secondPatch.difficulty ===
          preferredDifficulty;

        if (
          firstDifficultyMatch !==
          secondDifficultyMatch
        ) {
          return firstDifficultyMatch ? -1 : 1;
        }

        return 0;
      });

    const selectedPatch = candidates[0];

    if (
      selectedPatch &&
      !recommendations.some(
        (patch) => patch.id === selectedPatch.id,
      )
    ) {
      recommendations.push(selectedPatch);
    }
  });

  if (recommendations.length < limit) {
    patches.forEach((patch) => {
      if (recommendations.length >= limit) {
        return;
      }

      const alreadyRecommended =
        recommendations.some(
          (recommendedPatch) =>
            recommendedPatch.id === patch.id,
        );

      if (!alreadyRecommended) {
        recommendations.push(patch);
      }
    });
  }

  return recommendations.map((patch) => ({
    ...patch,
    recommendationReason:
      getRecommendationReason(
        patch,
        appState,
      ),
  }));
}