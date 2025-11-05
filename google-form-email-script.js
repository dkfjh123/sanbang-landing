/**
 * 구글 폼 제출 시 자동 이메일 전송 스크립트
 * 
 * 설정 방법:
 * 1. 구글 폼을 엽니다
 * 2. 우측 상단의 "응답" 탭을 클릭합니다
 * 3. "스프레드시트 연결" 또는 "응답" 옆의 "⋯" 메뉴를 클릭합니다
 * 4. "스크립트 편집기"를 선택합니다 (없으면 Apps Script로 이동)
 * 5. 아래 코드를 복사하여 붙여넣습니다
 * 6. "프로젝트 저장"을 클릭합니다
 * 7. "트리거" 탭을 클릭하고 "트리거 추가"를 클릭합니다
 *    - 이벤트 소스: "양식에서 제출"
 *    - 이벤트 유형: "양식 제출 시"
 *    - 함수: "onFormSubmit"
 * 8. 저장 후 권한을 승인합니다
 */

// 이메일 주소 설정
const RECIPIENT_EMAIL = 'contact@jejusanbang.com';

/**
 * 구글 폼 제출 시 자동으로 실행되는 함수
 */
function onFormSubmit(e) {
  try {
    // 폼 응답 데이터 가져오기
    const formResponse = e.response;
    const itemResponses = formResponse.getItemResponses();
    
    // 폼 데이터를 객체로 변환
    const formData = {};
    itemResponses.forEach(response => {
      const question = response.getItem().getTitle();
      const answer = response.getResponse();
      formData[question] = answer;
    });
    
    // 이메일 제목 생성
    const subject = '산방식당 파트너십 문의 - ' + new Date().toLocaleString('ko-KR');
    
    // 이메일 본문 생성
    let body = '새로운 파트너십 문의가 접수되었습니다.\n\n';
    body += '제출 시간: ' + new Date().toLocaleString('ko-KR') + '\n\n';
    body += '--- 문의 내용 ---\n\n';
    
    // 각 질문과 답변을 본문에 추가
    for (const [question, answer] of Object.entries(formData)) {
      body += question + ':\n';
      if (Array.isArray(answer)) {
        body += answer.join(', ') + '\n\n';
      } else {
        body += answer + '\n\n';
      }
    }
    
    body += '\n---\n';
    body += '이 이메일은 구글 폼에서 자동으로 전송되었습니다.';
    
    // 이메일 전송
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      body: body
    });
    
    Logger.log('이메일이 성공적으로 전송되었습니다.');
    
  } catch (error) {
    Logger.log('이메일 전송 중 오류 발생: ' + error.toString());
  }
}

/**
 * 테스트용 함수 (수동 실행)
 */
function testEmail() {
  const testEvent = {
    response: {
      getItemResponses: function() {
        return [
          {
            getItem: function() {
              return { getTitle: function() { return '성함'; } };
            },
            getResponse: function() { return '테스트 사용자'; }
          },
          {
            getItem: function() {
              return { getTitle: function() { return '이메일주소'; } };
            },
            getResponse: function() { return 'test@example.com'; }
          },
          {
            getItem: function() {
              return { getTitle: function() { return '연락처'; } };
            },
            getResponse: function() { return '010-1234-5678'; }
          },
          {
            getItem: function() {
              return { getTitle: function() { return '문의유형'; } };
            },
            getResponse: function() { return '메뉴솔루션 문의'; }
          }
        ];
      }
    }
  };
  
  onFormSubmit(testEvent);
}

