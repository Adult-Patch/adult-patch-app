<div align="center">

<img src="./logo.png" width="180" alt="어른패치 로고" />

# 어른패치

### 처음 겪는 어른의 순간을, 하나씩 패치합니다.

자취, 계약, 금융, 직장, 디지털 안전처럼  
어른이 된 뒤 갑자기 마주하게 되는 생활 문제를  
짧은 상황형 학습과 실천 미션으로 익히는 서비스입니다.

<br />

[서비스 바로가기](https://adult-patch.vercel.app) ·
[백엔드 저장소](https://github.com/Adult-Patch/adult-patch-server)

<br />

<img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Capacitor-8-119EFF?style=flat-square&logo=capacitor&logoColor=white" alt="Capacitor" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />

</div>

---

## 서비스 소개

학교에서는 시험을 준비하는 방법을 배우지만, 어른이 된 뒤 실제로 필요한 생활 지식은 충분히 배우기 어렵습니다.

처음 월급명세서를 받았을 때, 집을 계약할 때, 업무 실수를 보고해야 할 때처럼 누구나 겪을 수 있지만 막상 닥치면 당황하게 되는 순간이 있습니다.

어른패치는 이러한 상황을 단순한 정보 모음이 아니라, 사용자가 직접 판단하고 확인하며 실천하는 짧은 학습 경험으로 제공합니다.

> 생활 속 부족한 부분을 실패가 아니라, 아직 설치하지 않은 패치로 바라봅니다.

---

## 해결하고자 하는 문제

- 생활에 필요한 정보가 여러 기관과 서비스에 흩어져 있습니다.
- 검색 결과는 많지만 현재 상황에서 무엇부터 해야 하는지 판단하기 어렵습니다.
- 글을 읽는 것만으로는 실제 행동까지 이어지기 어렵습니다.
- 모르는 것을 물어보기 어렵거나, 무엇을 모르는지조차 알기 어려운 경우가 있습니다.

어른패치는 사용자가 처한 상황을 중심으로 필요한 판단 기준과 행동 순서를 짧게 제공합니다.

---

## 학습 구조

각 패치는 세 단계로 진행됩니다.

| 단계 | 설명 |
| --- | --- |
| 상황 판단 | 실제로 겪을 수 있는 상황에서 먼저 자신의 선택을 고릅니다. |
| 핵심 확인 | 선택 결과와 함께 꼭 확인해야 하는 기준을 익힙니다. |
| 실천 미션 | 배운 내용을 자신의 생활에서 직접 확인하거나 행동으로 옮깁니다. |

학습이 끝난 뒤에는 완료한 패치와 진행 상태를 `나의 패치`에서 다시 확인할 수 있습니다.

---

## 주요 기능

### 맞춤 온보딩

사용자의 현재 상황, 관심 분야와 경험 수준을 바탕으로 먼저 학습하기 좋은 패치를 추천합니다.

### 상황형 패치 학습

설명부터 보여주는 대신 실제 상황과 선택지를 먼저 제시합니다. 사용자가 직접 판단한 뒤 선택에 따른 결과와 이유를 확인합니다.

### 단계별 진행 상태

각 패치의 상황 판단, 핵심 확인, 최종 확인과 실천 미션 진행 상태를 저장합니다.

### 패치 탐색

분야와 난이도에 따라 전체 패치를 확인하고 필요한 주제를 직접 선택할 수 있습니다.

### 나의 패치

완료한 패치, 진행 중인 패치와 실천 기록을 한곳에서 확인합니다.

### 모바일 중심 화면

스마트폰 사용을 기준으로 화면을 구성했으며, Capacitor를 통한 Android 앱 확장을 고려하고 있습니다.

---

## 제공 중인 패치

현재 5개 분야에서 총 10개의 패치를 제공합니다.

| 분야 | 패치 |
| --- | --- |
| 자취생활 | 흰옷과 검은옷 세탁, 전자레인지 용기 확인 |
| 주거·계약 | 이사 후 전입 절차, 계약금 송금 전 확인 |
| 금융생활 | 월급명세서 확인, 카드 결제일과 이용기간 |
| 직장생활 | 업무 지시 질문하기, 업무 실수 보고하기 |
| 디지털 안전 | 의심스러운 메시지 대응, 카드 분실 대응 |

현재 등록된 패치 ID는 다음과 같습니다.

```text
laundry-basics
microwave-container
move-in-report
rental-contract-check
payslip-basics
card-payment-date
work-question
mistake-report
suspicious-message
lost-card
