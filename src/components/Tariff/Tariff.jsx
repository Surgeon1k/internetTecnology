import React, {memo} from 'react';
import {connect} from 'react-redux';
import {
    addService as addServiceServer,
    editTariffName as editTariffNameServer,
    editTariffPrice as editTariffPriceServer,
    removeTariff as removeTariffServer
} from '../../models/AppModel'
import {
    addServiceAction,
    editTariffNameAction,
    editTariffPriceAction,
    removeTariffAction
} from '../../store/actions';
import Service from '../Service/Service'

const Tariff = ({
    tariffName,
    tariffPrice,
    tariffId,
    services,
    addServiceDispatch,
    editTariffNameDispatch,
    editTariffPriceDispatch,
    removeTariffDispatch
}) => {
    const addService = async () => {
        // let newServiceName = prompt('Введите услугу');
        
        // if(!newServiceName) return;
        
        // newServiceName = newServiceName.trim();
        
        let newServiceName = 'temp';
        let newServiceValue = '0';
        const info = await addServiceServer({ tariffId, newServiceName, newServiceValue });
        console.log(info);
        addServiceDispatch({ tariffId, serviceName: newServiceName, serviceValue: newServiceValue});
    }

    const editTariffName = async () => {
        let newTariffName = prompt('Введите название тарифа', tariffName);

        if(!newTariffName) return;

        newTariffName = newTariffName.trim();

        if(!newTariffName || newTariffName === tariffName) return;

        const info = await editTariffNameServer({tariffId, newTariffName});
        console.log(info);
        editTariffNameDispatch({tariffId,newTariffName});
    };

    const editTariffPrice = async (e) => {
        let newTariffPrice = prompt('Введите новую цену', tariffPrice);

        if (!newTariffPrice) return;

        newTariffPrice = newTariffPrice.trim();

        if (!newTariffPrice || newTariffPrice === tariffPrice || newTariffPrice.match(/[\p{Alpha}]/gu)) return;

        const info = await editTariffPriceServer({tariffId, newTariffPrice});
        console.log(info);
        editTariffPriceDispatch({tariffId, newTariffPrice});
    }

    const removeTariff = async () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Маршрут '${tariffName}' будет удалён. Продолжить?`)){
            const info = await removeTariffServer({tariffId});
            console.log(info);
            removeTariffDispatch({tariffId});
        }
    };


    return(

        <div className="tp-tariff">
        <div className="tp-tariff-block">
            <header className="tp-tariff-header">
               {tariffName}
            </header>
            <div className="tp-tariff-controls-row">
                <div 
                className="tp-tariff-controls-icon edit-icon"
                onClick={editTariffName}
                />
                <div 
                className="tp-tariff-controls-icon delete-icon"
                onClick={removeTariff}
                />
            </div>
        </div>
        <div className="tp-tariff-block">    
                <header className="tp-tariff-price">
                    {tariffPrice}
                </header>
                <div className="tp-tariff-controls-row">
                    <div
                        className="tp-tariff-controls-icon edit-icon"
                        onClick={editTariffPrice}
                    />
                </div>
        </div>

        <div id="tp-tariff-text">
            Услуги:
        </div>
        <div className="tp-tariff-services">
        {services.map((service, index) => (
            <Service
                serviceName={service.serviceName}
                serviceValue={service.serviceValue}
                serviceId={index}
                tariffId={tariffId}
                key={`service${index}-tariff${tariffId}`}
            />
        ))}
        </div>
        <footer 
        className="tp-tariff-add-service"
        onClick={addService}
        >
            Добавить услугу
        </footer>
        </div>
        );
    };

const mapDispatchToProps = dispatch => ({
    addServiceDispatch: ({tariffId, serviceName, serviceValue}) => dispatch(addServiceAction({tariffId, serviceName, serviceValue})),
    editTariffNameDispatch: ({tariffId, newTariffName}) => dispatch(editTariffNameAction({tariffId, newTariffName})),
    editTariffPriceDispatch: ({tariffId, newTariffPrice}) => dispatch(editTariffPriceAction({tariffId, newTariffPrice})),
    removeTariffDispatch: ({tariffId}) => dispatch(removeTariffAction({tariffId}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Tariff));
