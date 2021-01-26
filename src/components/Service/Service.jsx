import React, {memo} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {
    removeService as removeServiceServer,
    editServiceValue as editServiceValueServer
} from '../../models/AppModel'
import {
    removeServiceAction,
    editServiceValueAction
} from '../../store/actions';

const services_opt = [
    { value: '0', label: 'Введите услугу'},
    { value: '1', label: 'Главная' },
    { value: '2', label: 'Дополнительная' },
    { value: '3', label: 'Побочная' }
]

const Service = ({
    tariffId,
    serviceId,
    serviceName,
    serviceValue,
    editServiceValueDispatch,
    removeServiceDispatch
}) => {


    const removeService = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Услуга ${serviceName} будет удалена. Продолжить?`)){
            const info = await removeServiceServer({tariffId, serviceId});
            console.log(info);
            removeServiceDispatch({tariffId, serviceId});
        }
    };

    const editServiceValue = async (e) => {
        let change = e.value;
        serviceValue = change;
        serviceName = services_opt[serviceValue].label;
        console.log(serviceValue, serviceName);
        console.log(typeof change, change);
        const info = await editServiceValueServer({ tariffId, serviceId, serviceValue, serviceName });
        console.log(info);
        editServiceValueDispatch({ tariffId, serviceId, serviceValue, serviceName });
    }


    return (
        <div className="tp-tariff-service">
            <div className="tp-service-choose">
                <Select
                    placeholder="Выберите услугу"
                    options={services_opt.slice(1)}
                    value={services_opt[serviceValue]}
                    onChange={editServiceValue}             
                />
            </div>
            <div className="tp-tariff-service-controls">
                <div className="tp-tariff-service-controls-row">
                    <div
                        className="tp-tariff-service-controls-icon delete-icon"
                        onClick={removeService}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removeServiceDispatch: ({tariffId, serviceId}) => dispatch(removeServiceAction({tariffId, serviceId})),
    editServiceValueDispatch: ({ tariffId, serviceId, serviceValue, serviceName }) => dispatch(editServiceValueAction({ tariffId, serviceId, serviceValue, serviceName}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Service))