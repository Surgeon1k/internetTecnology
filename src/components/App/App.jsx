import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {getTariffes, addTariff} from '../../models/AppModel'
import {
    downloadTariffesAction,
    addTariffAction,
} from '../../store/actions';
import Tariff from '../Tariff/Tariff';
import './App.css';



class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: '',
        isSecond: false,
        inputPrice: '',
    };

    async componentDidMount() {
        const tariffes = await getTariffes();
        this.props.downloadTariffesDispatch(tariffes);
    }

    showInput = () => this.setState({isInputShown: true});

    onInputChange = ({target: {value}}) => this.setState({inputValue: value});

    onKeyDown = async (event) => {

        if(event.key === 'Escape') {
            this.setState({
                isInputShown: false,
                inputValue: '',
                isSecond: false,
                inputPrice: ''
            })
        }

        if(event.key === 'Enter') {

            if (!this.state.isSecond) {
                if (this.state.inputValue !== '') { //Эта обработка неверная
                    this.setState({
                        inputPrice: this.state.inputValue,
                        inputValue: '',
                        isInputShown: true,
                        isSecond: true
                    })
                }
                else {
                    this.setState({
                        isInputShown: true,
                        inputValue: '',
                        isSecond: false,
                        inputPrice: ''
                    })
                }
            }
            if (this.state.isSecond) {
                if (this.state.inputValue !== '') { //Эта обработка неверная
                    const info = await addTariff({
                        tariffName: this.state.inputPrice,
                        tariffPrice: this.state.inputValue,
                        services: []
                    }).then(info => console.log(info));
                    console.log(info);
                    this.props.addTariffDispatch({ tariffName: this.state.inputPrice, tariffPrice: this.state.inputValue });
                    this.setState({
                        isInputShown: false,
                        inputValue: '',
                        isSecond: false,
                        inputPrice: ''
                    })
                }
                else {
                    this.setState({
                        isInputShown: true,
                        inputValue: '',
                        isSecond: true,
                    })
                }
            }
        }
    }

    render() {
        const { isInputShown, inputValue, isSecond, inputPrice } = this.state;
        const {tariffes} = this.props;

        return (
            <Fragment>
                <header id="main-header">
                    Тарифные планы
                </header>
                <hr id="line" />
                <header id="second-header">
                    Тарифы
                </header>

                <main id="tp-container"> 
                    {tariffes.map((tariff, index) => (
                        <Tariff
                            tariffName={tariff.tariffName}
                            tariffPrice={tariff.tariffPrice}
                            tariffId={index}
                            tariffPurp={tariff.tariffPurp}
                            services={tariff.services}
                            key={`tariff${index}`}
                        />
                    ))}
                    <div className="tp-tariff">
                    {!isInputShown && (
                        <header className="tp-tariff-header"
                        onClick={this.showInput}
                        >
                        Добавить тариф
                        </header>
                    )}
                        {isInputShown && isSecond && (
                            <header
                                className="tp-tariff-header"
                            >
                                {inputPrice}
                            </header>
                        )}
                        {isInputShown && isSecond && (
                            <input
                                type="text"
                                id="add-tariff-input"
                                placeholder="Цена тарифа"
                                value={inputValue}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyDown}
                            />
                        )}
                        {isInputShown && !isSecond && (
                            <input
                                type="text"
                                id="add-tariff-input"
                                placeholder="Название тарифа"
                                value={inputValue}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyDown}
                            />
                        )}
                    </div>
                </main>
                <footer>
                    <div id="author">
                        by Konovalov
                    </div>
                </footer>
            </Fragment>
        )
    }
}

const mapStateToProps = ({tariffes}) => ({tariffes});

const mapDispatchToProps = dispatch => ({
    addTariffDispatch: ({tariffName, tariffPrice}) => dispatch(addTariffAction({tariffName, tariffPrice})),
    downloadTariffesDispatch: (tariffes) => dispatch(downloadTariffesAction(tariffes))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);