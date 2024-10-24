import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagUsa, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import BackgroundMusic from '../assets/music/background.mp3'
import { Modal, Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import languages from '../assets/idioma.json'



function Main() {
    const audioRef = useRef()
    const [mute, setMute] = React.useState(true)
    const sound = useRef()

    const [colorShadow, setColorShadow] = React.useState('5px 5px rgba(250,100,0,1)')

    function generateColor() {

        const randomColor0 = Math.floor(Math.random() * 16777215).toString(16);
        setColorShadow('5px 5px #' + randomColor0);

    }

    const [selLanguage, setSelLanguage] = useState(languages[0])
    const [showLanguage, setShowLanguage] = useState(false);
    const handleClose = (e, lang) => {
        e.preventDefault();
        setSelLanguage(languages[lang])
        setShowLanguage(false)
    };
    const handleShow = () => setShowLanguage(true);

    useEffect(() => {
        setInterval(() => {
            generateColor();
        }, 2000)
        audioRef.current.volume = 0.2
    }, [])



    return (
        <div>
            <Modal className='vw-100 vh-100' show={showLanguage} onHide={() => setShowLanguage(false)} backdrop="static"
                keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Switch Language / Cambiar Idioma</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <ButtonGroup className='w-100'>
                        <Button variant='success' onClick={(e) => handleClose(e, 0)}>English</Button>
                        <Button variant='warning' onClick={(e) => handleClose(e, 1)}>Español</Button>
                    </ButtonGroup>
                </Modal.Body>
            </Modal>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#405060',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <audio src={BackgroundMusic} autoPlay playsInline ref={audioRef} muted={mute} width="300" height="60" loop
                    webkit-playsinline="true"
                    onCanPlay={() => {
                        setMute(true)
                    }} />
                <div
                    style={{
                        display: 'flex',
                        position: 'relative',
                        width: 600,
                        height: 500,
                        backgroundColor: '#9cf',
                        borderRadius: 30,
                        paddingTop: 20,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingBottom: 0
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '60px',
                        padding: 0                       
                    }}>
                        <div className='row'>
                            <div className='col-md-2 text-center'>
                                <button style={{
                                    width: 50,
                                    height: 50,
                                    padding: 0,
                                    borderRadius: 100
                                }}
                                    onClick={(e) => handleShow()}>
                                    <FontAwesomeIcon icon={faFlagUsa} className='fa-fw fa-2x' />
                                </button>
                            </div>
                            <div className='col-md-8'>
                                <div style={{ textAlign: 'center', textShadow: colorShadow, width: '100%', fontSize: 50, color: 'white' }}>MasaHoot</div>
                                <br />{selLanguage.tags.idioma}: {selLanguage.name}
                                <br />{selLanguage.tags.prueba}
                                <br /><br />
                                <Row style={{ height: 100 }}>
                                    <Col sm={4} className='mb-2 p-1'>
                                        <Button variant='primary' className='w-100 h-100 shadow'>{selLanguage.materia.idiomas}</Button>
                                    </Col>
                                    <Col sm={4} className='mb-2 p-1'>
                                        <Button variant='warning' className='w-100 h-100 shadow'>{selLanguage.materia.matematica}</Button>
                                    </Col>
                                    <Col sm={4} className='mb-2 p-1'>
                                        <Button variant='success' className='w-100 h-100 shadow'>{selLanguage.materia.literatura}</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className='col-md-2 text-center'>
                                <button ref={sound} onClick={(e) => {
                                    e.preventDefault();
                                    setMute(!mute);
                                    audioRef.current.play();
                                }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        padding: 0,
                                        borderRadius: 100
                                    }}
                                >
                                    {mute ?
                                        <FontAwesomeIcon icon={faVolumeXmark} className='fa-fw fa-2x' />
                                        :
                                        <FontAwesomeIcon icon={faVolumeHigh} className='fa-fw fa-2x' />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ display:'flex', position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', backgroundColor: '#102030', color: '#fff', height: 40, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                        <div style={{display:'flex'}}>
                            George Washington School, Curso: 801, Sede Cota, 2024
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default Main
