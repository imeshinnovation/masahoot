import React, { useEffect, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import Preguntas from "../dataset/Asking.json";

function Questions(props) {
  const { language, categoria } = props;
  const [category, setCategory] = categoria;
  const totalQuestions = Preguntas[category].questions.length;
  const [initialAsk, setInitialAsk] = useState(0);
  const [question, setQuestion] = useState("");
  const [ask0, setAsk0] = useState("");
  const [ask1, setAsk1] = useState("");
  const [ask2, setAsk2] = useState("");
  const [ask3, setAsk3] = useState("");
  const [hit, setHit] = useState(0);
  const [fail, setFail] = useState(0);
  const [askCorrect, setAskCorrect] = useState(null);
  const [userAsk, setUserAsk] = useState(null);
  const [final, setFinal] = useState(false);

  const NextAsk = () => {
    const PreData = Object.assign([
      Preguntas[category].questions[initialAsk].options,
    ]);
    PreData.map((object) =>
      object[0].iscorrect === true
        ? setAskCorrect(0)
        : object[1].iscorrect === true
        ? setAskCorrect(1)
        : object[2].iscorrect === true
        ? setAskCorrect(2)
        : object[3].iscorrect === true
        ? setAskCorrect(3)
        : null
    );

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

  const onOptionChange = (e) => {
    setUserAsk(e.target.id);
  };

  return (
    <Container>
      {final ? (
        <Card className="mt-4 border-0 bg-transparent rounded-0">
          <Card.Header className="border-0 bg-transparent">
            {language.final}
          </Card.Header>
          <Card.Body className="border-0 bg-transparent">
            {language.correct} {parseInt(hit)}
            <br />
            {language.failed} {parseInt(fail)}
          </Card.Body>
          <Card.Footer className="border-0 bg-transparent">
            <Button onClick={(e) => setCategory(null)}>{language.btnfwd}</Button>
          </Card.Footer>
        </Card>
      ) : (
        <Card className="mt-4 border-0 bg-transparent rounded-0">
          <Card.Header className="border-0 bg-transparent">
            {question}
          </Card.Header>
          <Card.Body className="border-0 bg-transparent">
            <Form>
              <Form.Check
                label={ask0}
                name="group1"
                type="radio"
                id="0"
                checked={parseInt(userAsk) === 0}
                onChange={onOptionChange}
              />
              <Form.Check
                label={ask1}
                name="group1"
                type="radio"
                id="1"
                checked={parseInt(userAsk) === 1}
                onChange={onOptionChange}
              />
              <Form.Check
                label={ask2}
                name="group1"
                type="radio"
                id="2"
                checked={parseInt(userAsk) === 2}
                onChange={onOptionChange}
              />
              <Form.Check
                label={ask3}
                name="group1"
                type="radio"
                id="3"
                checked={parseInt(userAsk) === 3}
                onChange={onOptionChange}
              />
            </Form>
          </Card.Body>
          <Card.Footer className="border-0 bg-transparent">
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (initialAsk >= totalQuestions - 1) {
                  if (userAsk.toString() === askCorrect.toString()) {
                    setHit(parseInt(hit) + 1);
                  } else {
                    setFail(fail + 1);
                  }
                  setFinal(true);
                } else {
                  const off_payment_method =
                    document.getElementsByName("group1");
                  let ischecked_method = false;
                  for (let i = 0; i < off_payment_method.length; i++) {
                    if (off_payment_method[i].checked) {
                      ischecked_method = true;
                      break;
                    }
                  }
                  if (!ischecked_method) {
                    alert("Seleccione una Respuesta");
                  } else {
                    if (userAsk.toString() === askCorrect.toString()) {
                      setHit(parseInt(hit) + 1);
                    } else {
                      setFail(fail + 1);
                    }
                    setInitialAsk(initialAsk + 1);
                    setUserAsk(null);
                  }
                }
              }}
            >
              {language.btnnext}
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default Questions;
