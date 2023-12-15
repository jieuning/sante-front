import styled from "styled-components";

export interface ModalCardProps {
    todoType: boolean;
}

const TodoModal = ({ todoType }: ModalCardProps) => {

    const DayOfTheWeek = ["월", "화", "수", "목", "금", "토", "일"];

    return (
        <ModalCardContainer>
            <ModalTitle>{todoType ? "🏃운동" : "🍚식단"}</ModalTitle>
            {
                todoType ?
                    <>
                        <TodoContainer>
                            <ExerciseTitleInput type="text" placeholder="운동 이름을 입력하세요." />
                        </TodoContainer>
                        <ModalLine />
                        <ExerciseContentWrap>
                            반복
                            {
                                DayOfTheWeek.map(week => (
                                    <DayRadioLabel>
                                        <input type="checkbox" />
                                        {week}
                                    </DayRadioLabel>
                                ))
                            }
                            <button>매일</button>
                        </ExerciseContentWrap>
                        <ExerciseContentWrap>
                            <div>기간</div>
                            <input
                                style={{
                                    width: "88%",
                                    borderRadius: "6px",
                                    border: "1px solid #bebebe",
                                    padding: "12px 0"
                                }}
                                type="text"
                            />
                        </ExerciseContentWrap>
                        <ExerciseContentWrap style={{marginBottom: "30px"}}>
                            시간
                            {
                                DayOfTheWeek.map(week => (
                                    <DayRadioLabel>
                                        <input type="checkbox" />
                                        {week}
                                    </DayRadioLabel>
                                ))
                            }
                            <button>매일</button>
                        </ExerciseContentWrap>
                    </>
                    :
                    <>
                        <TodoContainer>
                            <TodayCalory>하루 권장 칼로리 1800kcal</TodayCalory>
                        </TodoContainer>
                        <ModalLine />
                    </>
            }
            <ModalLine />
            <ButtonContainer>
                <Button>등록하기</Button>
            </ButtonContainer>
        </ModalCardContainer>
    )
}

export default TodoModal;

const ModalCardContainer = styled.section`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    height: auto;
    border: 1px solid #ababab;
    border-radius: 6px;
    font-color: #0f0f0f;
`

const ModalTitle = styled.h2`
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    padding: 20px 20px 40px 20px;
`

const TodoContainer = styled.div`
    padding: 0 40px;
`

const ExerciseTitleInput = styled.input`
    width: 100%;
    padding: 12px 0;
    border: 1px solid #bebebe;
    border-radius: 6px;
    text-align: center;
    margin-bottom: 30px;
`

const ExerciseContentWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-weight: 600;
    margin-bottom: 20px;
`

const DayRadioLabel = styled.label`
    font-weight: 400;
`

const TodayCalory = styled.p`
    font-weight: 600;
    margin-bottom: 30px;
`

const ModalLine = styled.div`
    margin-bottom: 30px;
    border-top: 1px solid #ababab;
`

const ButtonContainer = styled.div`
    display: flex;
    padding: 0 40px;
    margin-bottom: 20px;
`

const Button = styled.button`
    width: 100%;
    padding: 12px 0;
    border-radius: 6px;
    border: none;
    background-color: #81D8D0;
    color: #fff;
    font-weight: 600;
`