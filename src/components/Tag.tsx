import styled from 'styled-components';

const TagOranged = styled.div`
  width: 40px;
  height: 15px;
  border-radius: 17px;
  background-color: var(--secondary-orange-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagPurpled = styled.div`
  width: 40px;
  height: 15px;
  border-radius: 17px;
  display: flex;
  justify-content: center;
  background-color: var(--secondary-purple-color);
  align-items: center;
`;

const TagNamed = styled.p`
  color: var(--white-background-color);
  font-size: 8px;
`;

const Tag = () => {
  return (
    <>
      <TagOranged>
        <TagNamed>운동</TagNamed>
      </TagOranged>

      <TagPurpled>
        <TagNamed>매일</TagNamed>
      </TagPurpled>

      <TagOranged>
        <TagNamed>샐러드</TagNamed>
      </TagOranged>

      <TagPurpled>
        <TagNamed>월,수</TagNamed>
      </TagPurpled>

      <TagOranged>
        <TagNamed>오렌지주스</TagNamed>
      </TagOranged>

      <TagPurpled>
        <TagNamed>D-4</TagNamed>
      </TagPurpled>

      <TagOranged>
        <TagNamed>아메리카노</TagNamed>
      </TagOranged>

      <TagPurpled>
        <TagNamed>D-30</TagNamed>
      </TagPurpled>
    </>
  );
};

export default Tag;
