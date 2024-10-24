import React, { useEffect, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import Preguntas from "../dataset/Asking.json";

function Questions(props) {
  const { language, categoria } = props;
  const [category, setCategory] = categoria
  const totalQuestions = Preguntas[category].questions.length;
  const [initialAsk, setInitialAsk] = useState(0);
  const [question, setQuestion] = useState("");
  const [ask0, setAsk0] = useState("");
  const [ask1, setAsk1] = useState("");
  const [ask2, setAsk2] = useState("");
  const [ask3, setAsk3] = useState("");
  const [hit, setHit] = useState(0);
  const [fail, setFail] = useState(0);

  const NextAsk = () => {
    if (language.prefix === "en") {
      setQuestion(Preguntas[category].questions[initialAsk]?.question_en);
      setAsk0(Preguntas[category].questions[initialAsk].options[0]?.ask_en);
      setAsk1(Preguntas[category].questions[initialAsk].options[1]?.ask_en);
      setAsk2(Preguntas[category].questions[initialAsk].options[2]?.ask_en);
      setAsk3(Preguntas[category].questions[initialAsk].options[3]?.ask_en);
    } else {
      setQuestion(Preguntas[category].questions[initialAsk].question_es);
      setAsk0(Preguntas[category].questions[initialAsk].options[0]?.ask_es);
      setAsk1(Preguntas[category].questions[initialAsk].options[1]?.ask_es);
      setAsk2(Preguntas[category].questions[initialAsk].options[2]?.ask_es);
      setAsk3(Preguntas[category].questions[initialAsk].options[3]?.ask_es);
    }
  };

  useEffect(() => {
    NextAsk();
  });

  return (
    <Container>
      <Card className="mt-4 border-0 bg-transparent rounded-0">
        <Card.Header className="border-0">{question}</Card.Header>
        <Card.Body className="border-0">
          <Form.Check label={ask0} name="group1" type="radio" id={ask0} />
          <Form.Check label={ask1} name="group1" type="radio" id={ask1} />
          <Form.Check label={ask2} name="group1" type="radio" id={ask2} />
          <Form.Check label={ask3} name="group1" type="radio" id={ask3} />
        </Card.Body>
        <Card.Footer className="border-0">
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (initialAsk >= totalQuestions - 1) {
                setCategory(null)
              } else {
                setInitialAsk(initialAsk + 1);
              }
            }}
          >
            {language.btnnext}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Questions;
