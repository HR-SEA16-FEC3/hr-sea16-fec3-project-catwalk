import React from 'react';
import styled from 'styled-components';
import Answer from './Answer';

const AnswersList = (props) => {
  const sortAnswers = (objs) => {
    const answersList = Object.values(objs);
    answersList.sort((a, b) => {
      if (a.answerer_name === 'Seller') {
        return -1;
      }
      if (b.answerer_name === 'Seller') {
        return 1;
      }
      return b.helpfulness - a.helpfulness;
    });
    return answersList;
  };

  const sortedAnswers = sortAnswers(props.list);
  const twoAnswers = sortedAnswers.slice(0, 2);

  return (
    <Wrapper>
      {twoAnswers.map((item) => <Answer answer={item} key={item.id} />)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default AnswersList;
