    const localhost = 'localhost';

    const getTariffes = async() => {
        const response = await fetch(`http://${localhost}:5321/tariffes`, {
            method: 'GET',
        });
        const tariffes = await response.json();
        return tariffes;
    };

    const addTariff = async(tariff) => {
        const response = await fetch(`http://${localhost}:5321/tariffes`, {
            method: 'POST',
            body: JSON.stringify(tariff),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { info } = await response.json();

        return info;
    };


    const removeTariff = async({ tariffId }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}`, {
            method: 'DELETE'
        });

        const { info } = await response.json();

        return info;
    };

    const editTariffName = async({ tariffId, newTariffName }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}`, {
            method: 'PATCH',
            body: JSON.stringify({ newTariffName }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { info } = await response.json();

        return info;
    };

    const editTariffPrice = async({ tariffId, newTariffPrice }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}`, {
            method: 'PATCH',
            body: JSON.stringify({ newTariffPrice }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { info } = await response.json();

        return info;
    };

    const addService = async({ tariffId, newServiceName, newServiceValue }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}/services`, {
            method: 'POST',
            body: JSON.stringify({ newServiceName, newServiceValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { info } = await response.json();

        return info;
    };

    ////////
    const editServiceValue = async({ tariffId, serviceId, serviceValue, serviceName }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}/services/${serviceId}`, {
            method: 'PATCH',
            body: JSON.stringify({ serviceName, serviceValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { info } = await response.json();
        return info;
    };
    //////////

    const removeService = async({ tariffId, serviceId }) => {
        const response = await fetch(`http://${localhost}:5321/tariffes/${tariffId}/services/${serviceId}`, {
            method: 'DELETE'
        });

        const { info } = await response.json();

        return info;
    };


    export {
        getTariffes,
        addTariff,
        editTariffName,
        editTariffPrice,
        removeTariff,
        addService,
        editServiceValue,
        removeService
    };