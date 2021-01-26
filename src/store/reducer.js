import {
    DOWNLOAD_TARIFFES,
    ADD_TARIFF,
    EDIT_TARIFF_NAME,
    EDIT_TARIFF_PRICE,
    REMOVE_TARIFF,
    ADD_SERVICE,
    EDIT_SERVICE_VALUE,
    REMOVE_SERVICE
} from "./actions";

const initialState = {
    tariffes: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {

        case DOWNLOAD_TARIFFES:
            return {
                ...state,
                tariffes: payload
            };

        case ADD_TARIFF:
            const newStateAdd = {
                ...state,
                tariffes: [
                    ...state.tariffes,
                    {
                        tariffName: payload.tariffName,
                        tariffPrice: payload.tariffPrice,
                        services: [],
                        tariffPurp: 0
                    }
                ]
            };
            newStateAdd.tariffes.sort((a, b) => a.tariffName > b.tariffName ? 1 : -1);
            return newStateAdd;

        case EDIT_TARIFF_NAME:
            const newStateEdit = {
                ...state,
                tariffes: state.tariffes.map((tariff, index) =>
                    index !== payload.tariffId ? {...tariff } : {
                        ...tariff,
                        tariffName: payload.newTariffName
                    })
            }
            newStateEdit.tariffes.sort((a, b) => a.tariffName > b.tariffName ? 1 : -1);;
            return newStateEdit;

        case EDIT_TARIFF_PRICE:
            const newStatePrice = {
                ...state,
                tariffes: state.tariffes.map((tariff, index) =>
                    index !== payload.tariffId ? {...tariff } : {
                        ...tariff,
                        tariffPrice: payload.newTariffPrice
                    })
            }
            return newStatePrice;

        case REMOVE_TARIFF:
            const removedTariffe = state.tariffes[payload.tariffId];
            const otherTariffes = state.tariffes.filter(
                tariff => tariff !== removedTariffe
            );
            return {
                ...state,
                tariffes: otherTariffes
            }


        case ADD_SERVICE:
            return {
                ...state,
                tariffes: state.tariffes.map((tariff, index) =>
                    index !== payload.tariffId ? {...tariff } : {...tariff, services: [...state.tariffes[payload.tariffId].services, { serviceName: payload.serviceName, serviceValue: payload.serviceValue }] })
            };


        case EDIT_SERVICE_VALUE:
            return {
                ...state,
                tariffes: state.tariffes.map((tariff, index) =>
                    index !== payload.tariffId ? {...tariff } : {
                        ...tariff,
                        services: tariff.services.map((service, serviceIndex) =>
                            serviceIndex !== payload.serviceId ?
                            service : {
                                serviceName: payload.serviceName,
                                serviceValue: payload.serviceValue
                            }
                        )
                    })
            };

        case REMOVE_SERVICE:
            const removedService = state.tariffes[payload.tariffId].services[payload.serviceId];
            const otherServices = state.tariffes[payload.tariffId].services.filter(
                service => service !== removedService
            );
            return {
                ...state,
                tariffes: state.tariffes.map((tariff, index) => index === payload.tariffId ? {
                        ...tariff,
                        services: otherServices
                    }

                    :
                    {...tariff }
                )
            }
        default:
            return state;
    }
}