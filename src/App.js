import {Container, Row} from "react-bootstrap";
import './App.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {postImages} from './actions'
import FieldFileInput from "./components/FieldFileInput";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            submitted: false
        }
    }

    handleFileInput = (e) => {
        this.setState({
            files: e
        })
    }

    renderFileList() {
        if (this.state.files !== undefined && this.state.files.length > 0) {
            const data = Object.values(this.state.files);
            let files = data.map(data => {
                return `${data.name}, `;
            });
            return (
                <div className="m-lg-5">
                    <p>Вы выбрали следующие файлы: {files}</p>
                </div>
            )
        }
    };

    handleSubmitForm = (event) => {
        this.setState({submitted: true})
        this.props.handleSubmit(onSubmit.bind(null, 'sendImages'))(event)
    };

    renderAnalyzeResult() {
        console.log("PROPS")
        console.log(this.props)
        if (this.state.submitted && this.props.sendImages.length === 0) {
            return (
              <div>
                  <p>Ваши фотографии обрабатываются, пожалуйста подождите</p>
              </div>
            );
        } else if (this.props.sendImages !== undefined && this.props.sendImages.s !== undefined
            && this.props.sendImages.s.length > 1) {
            return (
              <div>

                  <Carousel>
                      {this.renderResultImages(this.props.sendImages.s)}
                  </Carousel>
                  {this.renderDepressResult()}
              </div>
            );
        }
    };

    renderDepressResult() {

            if(this.props.sendImages.depress) {
                return (
                    <div>
                        <p>У вас обнаружена маркеры депрессии. Согласно алгоритму, вероятность депрессии составляет {this.props.sendImages.countdepress}</p>
                        {this.props.sendImages.facePercent && this.props.sendImages.facePercent < 50 && <p>Также на фаших фото редко появляются лица людей, что тоже может являться маркером депрессии</p>}
                        <p>Пожалйста, обратитесь за консультацией к специалисту!</p>
                    </div>
                );
            } else if (!this.props.sendImages.depress) {
                return (
                    <p>В ходе анализа у вас не было выявлено маркеров депрессии. Однако если вы чуствуете себя плохо, обратитесь за консультацией к врачу</p>
                );
            }
    }

    renderResultImages(images) {
        return (
            images.map(image => {
                return (
                    <img className="image" src={`data:image/jpg;base64,${image}`} key={image} />
                    );
            })
        );
    }

    render() {
        return (
            <div className="App">
                <h1>Depress Analyzer App</h1>
                <Container fluid>
                    <Row>
                        <div className="paragraph">
                            <form className={'submitForm'} onSubmit={this.handleSubmitForm}>
                                <p>Это приложение использует алгоритм оценки цветовой гаммы изображений для опредления
                                    депрессии</p>
                                <p>Считается, что люди с депрессией используют более тусклые фильтры, меньше фотографируют
                                    лица</p>
                                <p>Загрузите минимум 5 фотографий, чтобы получить оценку изображений. Но чем больше - тем
                                    более
                                    точную оценку получите </p>

                                <div className="align-end">
                                    <Field
                                        type="select-multi"
                                        name="images"
                                        id="imgid"
                                        component={FieldFileInput}
                                        onChange={this.handleFileInput}/>
                                    <button
                                        type="submit"
                                    >Отправить изображения</button>
                                </div>
                            </form>
                        </div>
                        {this.renderFileList()}
                    </Row>
                    <Row>
                        {this.renderAnalyzeResult()}
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
        const selector = formValueSelector('selectingFormValues');
        return {
            files: state.files,
            images: selector(state, "images"),
            sendImages: state.sendImages
        }
}

const onSubmit = (mode, values, dispatch, props) => {
    if (mode === 'sendImages') {
        props.postImages(values.images);
    }
};

export default connect(mapStateToProps, {postImages})(reduxForm({form: 'selectingFormValues'})(App));
