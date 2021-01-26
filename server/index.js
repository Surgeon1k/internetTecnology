const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 5321;
const hostname = 'localhost';

let tariffes = [];

//Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Middleware для логгирования запросов
app.use((request, response, next) => {
    console.log(
        new Date().toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

//Middleware для правильного представления request.body
app.use(express.json());

//---------------Tariff-------------------

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/tariffes', async(request, response) => {
    tariffes = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.json(tariffes);
});

app.post('/tariffes', async(request, response) => {
    tariffes.push(request.body);
    tariffes.sort((a, b) => a.tariffName > b.tariffName ? 1 : -1);
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Tariff '${request.body.tariffName}' was successfully added` });
});

app.patch('/tariffes/:tariffId', async(request, response) => {
    const { newTariffName } = request.body;
    const tariffId = Number(request.params.tariffId);

    tariffes[tariffId].tariffName = newTariffName;
    tariffes.sort((a, b) => a.tariffName > b.tariffName ? 1 : -1);
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Tariff '${tariffId}' was successfully edited'` });
});

app.patch('/tariffes/:tariffId/price/:newTariffPrice', async(request, response) => {
    const tariffId = Number(request.params.tariffId);
    const newTariffPrice = Number(request.params.newTariffPrice);
    tariffes[tariffId].tariffPrice = newTariffPrice;
    console.log(newTariffPrice);
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Price '${newTariffPrice}' was successfully edited in tariff '${tariffes[tariffId].tariffName}'` });
});

app.delete('/tariffes/:tariffId', async(request, response) => {
    const tariffId = Number(request.params.tariffId);

    const removedTariff = tariffes[tariffId];
    console.log(tariffes[tariffId]);
    console.log(tariffId);

    tariffes = tariffes.filter(
        (tariff, index) => index !== tariffId
    );
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Tariff '${removedTariff.tariffName}' was successfully deleted` });
});


///////////////////////////////////////
app.patch('/tariffes/:tariffId/services/:serviceId/', async(request, response) => {
    console.log("editService")
    const newServiceName = request.body.serviceName;
    const newServiceValue = request.body.serviceValue;
    const tariffId = Number(request.params.tariffId);
    const serviceId = Number(request.params.serviceId);
    //console.log(tariffes[tariffId].services[serviceId].serviceValue);
    tariffes[tariffId].services[serviceId].serviceValue = newServiceValue;
    tariffes[tariffId].services[serviceId].serviceName = newServiceName;
    //console.log(tariffes[tariffId].services[serviceId]);
    await writeData(tariffes);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Service '${tariffes[tariffId].services[serviceId].serviceName}' was successfully edited in tariff '${tariffId}' in service ${serviceId}` });
});
///////////////////////////////

app.post('/tariffes/:tariffId/services', async(request, response) => {
    const newServiceName = request.body.newServiceName;
    const newServiceValue = request.body.newServiceValue;
    const tariffId = Number(request.params.tariffId);
    tariffes[tariffId].services.push({ serviceName: newServiceName, serviceValue: newServiceValue });
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Service '${newServiceName}' was successfully added in tariff '${tariffes[tariffId].tariffName}'` });
});

app.delete('/tariffes/:tariffId/services/:serviceId', async(request, response) => {
    const tariffId = Number(request.params.tariffId);
    const serviceId = Number(request.params.serviceId);

    //console.log(tariffes);
    const removedService = tariffes[tariffId].services[serviceId];
    //console.log(tariffes[tariffId].services.serviceId);
    //console.log(serviceId);
    //console.log(tariffId);

    tariffes[tariffId].services = tariffes[tariffId].services.filter(
        (service, index) => index !== serviceId
    );
    await writeData(tariffes);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ info: `Service '${removedService}' was successfully deleted` });
});

app.listen(port, hostname, (err) => {
    if (err) {
        console.log('Error', err);
    }

    console.log(`server is working on ${hostname}:${port}`);
});