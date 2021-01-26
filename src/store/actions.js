const DOWNLOAD_TARIFFES = 'DOWNLOAD_TARIFFES';
const ADD_TARIFF = 'ADD_TARIFF';
const EDIT_TARIFF_NAME = 'EDIT_TARIFF_NAME';
const EDIT_TARIFF_PRICE = 'EDIT_TARIFF_PRICE';
const REMOVE_TARIFF = 'REMOVE_TARIFF';
const ADD_SERVICE = 'ADD_SERVICE';
const EDIT_SERVICE_VALUE = 'EDIT_SERVICE_VALUE';
const REMOVE_SERVICE = 'REMOVE_SERVICE';

const downloadTariffesAction = (tariffes) => ({
    type: DOWNLOAD_TARIFFES,
    payload: tariffes
});

const addTariffAction = ({ tariffName, tariffPrice }) => ({
    type: ADD_TARIFF,
    payload: {
        tariffName,
        tariffPrice
    }
});

const editTariffNameAction = ({ tariffId, newTariffName }) => ({
    type: EDIT_TARIFF_NAME,
    payload: {
        tariffId,
        newTariffName,
    }
});

const editTariffPriceAction = ({ tariffId, newTariffPrice }) => ({
    type: EDIT_TARIFF_PRICE,
    payload: {
        tariffId,
        newTariffPrice
    }
});

const removeTariffAction = ({ tariffId }) => ({
    type: REMOVE_TARIFF,
    payload: {
        tariffId
    }
});

const addServiceAction = ({ tariffId, serviceName, serviceValue }) => ({
    type: ADD_SERVICE,
    payload: {
        tariffId,
        serviceName,
        serviceValue
    }
});

const editServiceValueAction = ({ tariffId, serviceId, serviceValue, serviceName }) => ({
    type: EDIT_SERVICE_VALUE,
    payload: {
        tariffId,
        serviceId,
        serviceValue,
        serviceName
    }
});


const removeServiceAction = ({ tariffId, serviceId }) => ({
    type: REMOVE_SERVICE,
    payload: {
        tariffId,
        serviceId
    }
});

export {
    DOWNLOAD_TARIFFES,
    ADD_TARIFF,
    EDIT_TARIFF_NAME,
    EDIT_TARIFF_PRICE,
    REMOVE_TARIFF,
    ADD_SERVICE,
    EDIT_SERVICE_VALUE,
    REMOVE_SERVICE,
    downloadTariffesAction,
    addTariffAction,
    editTariffNameAction,
    editTariffPriceAction,
    removeTariffAction,
    addServiceAction,
    editServiceValueAction,
    removeServiceAction
}